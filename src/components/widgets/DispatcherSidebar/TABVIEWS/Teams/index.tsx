import { useCallback, useEffect, useState } from 'react';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';
import { EModalTypes, IGetOrdersParams } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { cacheService } from '@services/cache';
import { getSelectedTeams, getTeams, setSelectedTeams } from '@thunks/teamsThunk';
import { getOrders } from '@thunks/ordersThunk';
import { getAppConfig } from '@thunks/configThunk';
import { getRoutes } from '@thunks/routesThunk';
import { getPickups } from '@thunks/pickupThunk';
import { selectCheckedTeams, selectTeams } from '@selectors/teamsSelector';
import { selectMaxTeamsSelection } from '@selectors/configSelector';
import { openModal } from '@slices/modalSlice';
import Search from '../../Search';
import Footer from './Footer';
import AlertMessage from './AlertMessage';
import { Root, RootWrapper, StyledCheckboxList } from './styled-components';

const DEFAULT_ORDERS_PARAMS = {
  dateRange: 'CUSTOM',
  atRiskOnly: false,
  dateFrom: dayjs().subtract(1, 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
  dateTo: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
};

const TeamsView = () => {
  const dispatch = useAppDispatch();

  const maxTeamsSelection = useAppSelector(selectMaxTeamsSelection);
  const teamList = useAppSelector(selectTeams);
  const checkedTeams = useAppSelector(selectCheckedTeams);
  const checkboxOptions = teamList?.map(team => ({ value: team.id, label: team.alias })).sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;

    return 0;
  }) || [];

  const [checkedValues, setCheckedValues] = useState<string[]>(checkedTeams || []);

  const isAllSelected = checkedValues?.length === checkboxOptions.length;
  const isAllAvailableSelected = !!maxTeamsSelection && checkedValues.length === maxTeamsSelection;

  const onChange = (data: CheckboxValueType[]) => {
    if (maxTeamsSelection && data.length > maxTeamsSelection) return;

    setCheckedValues(data as string[]);
  };

  const onSearch = useCallback((value: string | null) => {
    if ((value?.length && value?.length > 2) || !value) {
      dispatch(getTeams({ query: value }));
    }
  }, [dispatch]);

  const onSave = async () => {
    const sessionOrderParams = cacheService.getSessionState<IGetOrdersParams>('ORDERS_FILTERS');

    await dispatch(setSelectedTeams({ teams: checkedValues.map(id => ({ id })) })).unwrap();

    dispatch(getAppConfig());
    dispatch(getRoutes({}));
    dispatch(getPickups({}));
    dispatch(getOrders(sessionOrderParams ?? DEFAULT_ORDERS_PARAMS));

    dispatch(openModal({
      type: EModalTypes.SUCCESS_MESSAGE,
      props: {
        timeout: 2000,
        autoHide: true,
        messages: ['Your changes have been saved'],
      },
      settings: { centered: true },
    }));
  };

  const onSelect = () => {
    if (!isAllSelected) {
      setCheckedValues(checkboxOptions.map(option => option.value));
    } else {
      setCheckedValues([]);
    }
  };

  useEffect(() => {
    if (checkedTeams) {
      setCheckedValues(checkedTeams);
    }
  }, [checkedTeams]);

  useEffect(() => {
    dispatch(getSelectedTeams());
    dispatch(getTeams({}));
  }, [dispatch]);

  return (
    <Root>
      <Search onSearch={onSearch} />
      {isAllAvailableSelected && <AlertMessage count={maxTeamsSelection} />}
      <RootWrapper>
        <StyledCheckboxList
          bordered
          options={checkboxOptions}
          values={checkedValues || []}
          onChange={onChange}
        />
        <Footer isAllSelected={isAllSelected} hideSelectAll={!!maxTeamsSelection} onSave={onSave} onSelect={onSelect} />
      </RootWrapper>
    </Root>
  );
};

export default TeamsView;
