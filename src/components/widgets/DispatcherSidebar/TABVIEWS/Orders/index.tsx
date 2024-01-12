import { useEffect, useMemo } from 'react';
import { IAssignedOrderGroup, IDriver } from '@types';
import { SESSION_KEYS } from '@constants/config';
import { cacheService } from '@services/cache';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectOnlineDrivers } from '@selectors/driversSelector';
import { selectGroupedOrders } from '@selectors/ordersSelector';
import { selectOrder } from '@slices/ordersSlice';
import OrderSearch from './OrderSearch';
import { RootWrapper, OrderWrapper, StyledOrderGroup } from './styled-components';

const createAssignedOrder = (driver: IDriver): IAssignedOrderGroup => ({ driver, orders: [] });

const OrdersView = () => {
  const dispatch = useAppDispatch();

  const { unAssignedOrders, assignedOrders } = useAppSelector(selectGroupedOrders);
  const onlineDrivers = useAppSelector(selectOnlineDrivers);

  const assignedOrdersData = useMemo<IAssignedOrderGroup[]>(() => {
    const data = [...assignedOrders];
    const driversInData = data.map(item => item.driver.id);

    if (onlineDrivers) {
      onlineDrivers.forEach(driver => {
        if (!driversInData.includes(driver.driver.id)) {
          data.push(createAssignedOrder(driver.driver));
        }
      });
    }

    return data;
  }, [assignedOrders, onlineDrivers]);

  useEffect(() => {
    const sessionActiveOrder = cacheService.getSessionState<string | null>(SESSION_KEYS.ACTIVE_ORDER);

    if (sessionActiveOrder) {
      dispatch(selectOrder(sessionActiveOrder));
    }

    return () => {
      dispatch(selectOrder(null));
    };
  }, [dispatch]);

  return (
    <RootWrapper>
      <OrderSearch />
      <OrderWrapper>
        {unAssignedOrders && <StyledOrderGroup title="Unassigned orders" orders={unAssignedOrders} cacheState />}
        {assignedOrders && <StyledOrderGroup title="Assigned orders" assignedOrders={assignedOrdersData} cacheState />}
      </OrderWrapper>
    </RootWrapper>
  );
};

export default OrdersView;
