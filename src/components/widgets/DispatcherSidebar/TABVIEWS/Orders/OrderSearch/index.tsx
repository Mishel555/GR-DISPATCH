import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IGetOrdersParams } from '@types';
import { APP_ORDERS_INTERVAL } from '@constants/config';
import { useAppDispatch, useAppSelector } from '@hooks';
import { cacheService } from '@services/cache';
import { getOrders } from '@thunks/ordersThunk';
import { selectPickUp } from '@slices/pickupSlice';
import { selectOrderForceLoad } from '@selectors/ordersSelector';
import { selectActivePickup } from '@selectors/pickupsSelector';
import { SearchIcon } from '@components/icons';
import FilterGroup from './FilterGroup';
import SearchLog from './SearchLog';
import ActiveFilters from './ActiveFilters';
import { FiltersWrapper, RootWrapper, SearchIconWrapper, StyledCol, StyledInput } from './styled-components';

interface IDateParams {
  dateTo: string;
  dateFrom: string;
  dateRange: string;
}

const SESSION_KEY = 'ORDERS_FILTERS';

const DEFAULT_SEARCH_TAGS = [
  { id: 'ASAP', label: 'ASAP' },
  { id: 'LATER_TODAY', label: 'Later Today' },
  { id: 'TOMORROW', label: 'Tomorrow' },
  { id: 'CUSTOM', label: 'Custom Range' },
];

const DEFAULT_SEARCH_STATUSES = [
  { id: 'orderAtRiskOnly', label: 'Order at Risk Only' },
  { id: 'assignedButNotAccepted', label: 'Assigned but not Accepted' },
];

const generateDateParams = (config: IGetOrderConfig): IDateParams => {
  const TODAY = dayjs();

  if (config.filters?.some(item => item.id === 'LATER_TODAY')) {
    return {
      dateTo: TODAY.endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
      dateFrom: TODAY.add(50, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]'),
      dateRange: 'CUSTOM',
    };
  }

  if (config.filters?.some(item => item.id === 'TOMORROW')) {
    return {
      dateTo: TODAY.add(2, 'day').startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
      dateFrom: TODAY.add(1, 'day').startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
      dateRange: 'CUSTOM',
    };
  }

  return {
    dateTo: config.dates?.[1] ? dayjs(config.dates[1]).endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]') : TODAY.endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
    dateFrom: config.dates?.[0] ? dayjs(config.dates[0]).startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]') : TODAY.startOf('day').subtract(1, 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
    dateRange: config.filters?.some(item => item.id === 'ASAP') ? 'ASAP' : 'CUSTOM',
  };
};

const generateParams = (config: IGetOrderConfig): IGetOrdersParams => ({
  ...generateDateParams(config),
  query: config.filters?.find(({ id }) => id === 'query')?.label,
  atRiskOnly: !!config.filters?.find(({ id }) => id === 'orderAtRiskOnly'),
});

interface IGetOrderConfig {
  filters: { id: string; label: string }[] | null;
  dates: dayjs.Dayjs[] | null;
}

const INITIAL_CONFIG: IGetOrderConfig = {
  dates: null,
  filters: [DEFAULT_SEARCH_TAGS[0]],
};

const OrderSearch = () => {
  const dispatch = useAppDispatch();
  const activePickup = useAppSelector(selectActivePickup);
  const forceLoad = useAppSelector(selectOrderForceLoad);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [show, setShow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [config, setConfig] = useState<IGetOrderConfig>(INITIAL_CONFIG);
  const [activeConfig, setActiveConfig] = useState<IGetOrderConfig>(INITIAL_CONFIG);

  const toggleFilter = (id: string, label: string, sync?: boolean) => {
    setConfig(prevState => {
      const state = {
        filters: (() => {
          const prevFilters = prevState.filters;

          if (!prevFilters) {
            return [];
          }

          if (prevFilters.findIndex(filter => filter.id === id) > -1) {
            const newData = prevFilters.length > 1 ? prevFilters.filter(filter => filter.id !== id) : [];

            return id === 'query' ? [...newData, { id, label }] : newData;
          }

          return [...prevFilters, { id, label }];
        })(),
        dates: id === 'CUSTOM' ? null : prevState.dates,
      };

      if (sync) {
        setActiveConfig(state);

        cacheService.saveSessionState(SESSION_KEY, generateParams(state));
        cacheService.saveSessionState('ORDERS_FILTERS_CONFIG', state);
      }

      return state;
    });
  };

  const deleteFilter = (id: string) => {
    setConfig(prevState => {
      const state = {
        dates: !DEFAULT_SEARCH_STATUSES.find((item) => item.id === id) ? null : prevState.dates,
        filters: prevState.filters ? prevState.filters.filter(filter => filter.id !== id) : null,
      };

      cacheService.saveSessionState(SESSION_KEY, generateParams(state));
      cacheService.saveSessionState('ORDERS_FILTERS_CONFIG', state);

      setActiveConfig(state);

      return state;
    });
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.value) {
      return setSearchValue(target.value);
    }

    setSearchValue(null);
  };

  const onSearchClean = (e: ReactMouseEvent<HTMLSpanElement>, id: string) => {
    e.stopPropagation();

    deleteFilter(id);
    setSearchValue(null);
  };

  const onInputFocus = () => {
    if (!show) {
      setShow(true);
    }
  };

  const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (show) {
      e.currentTarget.focus();
    }
  };

  const onDateChange = (dates: dayjs.Dayjs[] | null) => {
    setConfig(prevState => ({
      filters: prevState.filters && prevState.filters.map(filter => {
        if (filter.id === 'CUSTOM') {
          filter.label = dates ? `${dates[0].format('MM/DD/YYYY')} - ${dates[1].format('MM/DD/YYYY')}` : '';
        }

        return filter;
      }),
      dates,
    }));
  };

  const onKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const params = generateParams(config);

      cacheService.saveSessionState(SESSION_KEY, params);
      cacheService.saveSessionState('ORDERS_FILTERS_CONFIG', config);

      setShow(false);

      if (searchValue) {
        toggleFilter('query', searchValue ?? '', true);
      } else {
        deleteFilter('query');
      }
    }
  };

  useEffect(() => {
    const params = generateParams(activeConfig);

    const interval = setInterval(() => dispatch(getOrders(params)), APP_ORDERS_INTERVAL);

    dispatch(getOrders(params));

    return () => {
      clearInterval(interval);
    };
  }, [activeConfig, dispatch]);

  useEffect(() => {
    if (!show) {
      inputRef.current?.blur();
    }
  }, [show]);

  useEffect(() => {
    if (forceLoad) {
      dispatch(getOrders(generateParams(activeConfig)));
    }
  }, [activeConfig, dispatch, forceLoad]);

  useEffect(() => {
    if (activePickup) {
      dispatch(selectPickUp(null));

      setSearchValue(activePickup.name);

      toggleFilter('query', activePickup.name);
    }
  }, [activePickup, dispatch]);

  useEffect(() => {
    const sessionConfig = cacheService.getSessionState<IGetOrderConfig | null>('ORDERS_FILTERS_CONFIG');

    if (sessionConfig) {
      setConfig(sessionConfig);
      setActiveConfig(sessionConfig);
    }

    const listener = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Element) && typeof (e.target as Element)?.className?.startsWith === 'function' && !(e.target as Element).className.startsWith('ant-picker')) {
        setShow(false);
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

  return (
    <RootWrapper onKeyDown={onKeyPress}>
      <StyledCol ref={rootRef}>
        <StyledInput
          // eslint-disable-next-line
          // @ts-ignore
          ref={inputRef}
          value={searchValue ?? ''}
          placeholder="Search"
          addonAfter={<div></div>}
          addonBefore={<SearchIconWrapper><SearchIcon /></SearchIconWrapper>}
          allowClear={{ clearIcon: <CloseOutlined onClick={(e) => onSearchClean(e, 'query')} /> }}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onSearchChange}
          className="searchBar"
        />
        {show && (
          <FiltersWrapper>
            <FilterGroup
              dates={config.dates ? [dayjs(config.dates[0]), dayjs(config.dates[1])] : null}
              data={DEFAULT_SEARCH_TAGS}
              currentFilters={config.filters}
              onDatesChange={onDateChange}
              toggleFilter={toggleFilter}
            />
            <FilterGroup data={DEFAULT_SEARCH_STATUSES} currentFilters={config.filters} toggleFilter={toggleFilter} />
            {(!!searchValue || !!config.filters?.length) && (
              <SearchLog
                search={searchValue}
                filterCount={config.filters?.filter(filter => filter.id !== 'query')?.length || 0}
              />
            )}
          </FiltersWrapper>
        )}
      </StyledCol>
      {activeConfig.filters && <ActiveFilters filters={activeConfig.filters} deleteFilter={deleteFilter} />}
    </RootWrapper>
  );
};

export default OrderSearch;
