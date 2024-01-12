import { Fragment, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { APP_DRIVERS_INTERVAL } from '@constants/config';
import { useAppDispatch, useAppSelector } from '@hooks';
import { hexToRgbString } from '@utils';
import { selectDriversState } from '@selectors/driversSelector';
import { getDrivers } from '@thunks/driversThunk';
import Search from '../../Search';
import DriversResizableTable from './ResizableTable';

const MainWrapper = styled.div`
  padding-bottom: 20px;
  border-radius: 26px;
  box-shadow: 0 4px 30px rgba(${hexToRgbString(COLORS.BLACK)}, 0.08);
`;

const DriversView = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectDriversState);

  const onSearch = useCallback((search: string | null) => {
    if (search !== null && search.length > 3) {
      return dispatch(getDrivers({ query: search, withShiftsOnly: false }));
    }

    dispatch(getDrivers({ withShiftsOnly: false }));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => dispatch(getDrivers({ withShiftsOnly: false })), APP_DRIVERS_INTERVAL);

    dispatch(getDrivers({ withShiftsOnly: false }));

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Fragment>
      <Search onSearch={onSearch} />
      <MainWrapper>
        {data.drivers && (
          <DriversResizableTable data={data.drivers} />
        )}
      </MainWrapper>
    </Fragment>
  );
};

export default DriversView;
