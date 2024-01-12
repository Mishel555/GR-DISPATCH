import { Fragment, useEffect } from 'react';
import dayjs from 'dayjs';
import { APP_CONFIG_INTERVAL, APP_DRIVERS_INTERVAL, APP_ORDERS_INTERVAL, APP_ROUTES_INTERVAL } from '@constants/config';
import { IGetOrdersParams } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { cacheService } from '@services/cache';
import { getOrders } from '@thunks/ordersThunk';
import { getAppConfig } from '@thunks/configThunk';
import { getSelectedTeams, getTeams } from '@thunks/teamsThunk';
import { getRoutes } from '@thunks/routesThunk';
import { getPickups } from '@thunks/pickupThunk';
import { getDrivers, getMapDrivers } from '@thunks/driversThunk';
import { selectAppTimeZone } from '@selectors/configSelector';
import { DispatcherMap, DispatcherSidebar } from '@components/widgets';
import { ModalContainer } from '@components/modals';
import { Wrapper } from './styled-components';

const DEFAULT_ORDERS_PARAMS = {
  dateRange: 'CUSTOM',
  atRiskOnly: false,
  dateFrom: dayjs().subtract(1, 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
  dateTo: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
};

const HomePage = () => {
  const dispatch = useAppDispatch();
  const appTimeZone = useAppSelector(selectAppTimeZone);

  useEffect(() => {
    if (appTimeZone) {
      // todo => move to top level...
      dayjs.tz.setDefault(appTimeZone.id);
    }
  }, [appTimeZone]);

  useEffect(() => {
    dispatch(getAppConfig());
    dispatch(getTeams({}));
    dispatch(getSelectedTeams());
    dispatch(getRoutes({}));
    dispatch(getPickups({}));
    dispatch(getDrivers({ withShiftsOnly: false }));
    dispatch(getMapDrivers({ withShiftsOnly: false }));

    const configInterval = setInterval(async () => {
      dispatch(getAppConfig());
    }, APP_CONFIG_INTERVAL);

    const ordersInterval = setInterval(() => {
      const sessionOrderParams = cacheService.getSessionState<IGetOrdersParams>('ORDERS_FILTERS');

      dispatch(getOrders(sessionOrderParams ?? DEFAULT_ORDERS_PARAMS));
    }, APP_ORDERS_INTERVAL);

    const routesInterval = setInterval(() => {
      dispatch(getRoutes({}));
    }, APP_ROUTES_INTERVAL);

    const driversInterval = setInterval(() => {
      dispatch(getDrivers({ withShiftsOnly: false }));
    }, APP_DRIVERS_INTERVAL);

    return () => {
      clearInterval(configInterval);
      clearInterval(ordersInterval);
      clearInterval(routesInterval);
      clearInterval(driversInterval);
    };
  }, [dispatch]);

  return (
    <Fragment>
      <Wrapper>
        <DispatcherSidebar />
        <DispatcherMap />
      </Wrapper>
      <ModalContainer />
    </Fragment>
  );
};

export default HomePage;
