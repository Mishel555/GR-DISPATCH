import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { IOrder } from '@types';
import { APP_ORDERS_INTERVAL } from '@constants/config';
import api from '@services/api';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getDrivers } from '@thunks/driversThunk';
import { selectMapViewSettings, selectShowCompleted } from '@selectors/configSelector';
import { selectActiveOrder, selectGroupedOrders } from '@selectors/ordersSelector';
import { selectMapDrivers, selectOnlineDrivers } from '@selectors/driversSelector';
import { selectAllPickups } from '@selectors/pickupsSelector';
import { DriverMarker, OrderMarker, PickupMarker } from '@components/map';

const getCompletedOrders = async (setState: Dispatch<SetStateAction<IOrder[] | null>>) => {
  const { data } = await api.orders.getCompletedOrders();

  setState(data.result);
};

const MapMarkers = () => {
  const dispatch = useAppDispatch();

  const pickups = useAppSelector(selectAllPickups);
  const activeOrder = useAppSelector(selectActiveOrder);
  const showCompletedOrders = useAppSelector(selectShowCompleted);
  const onlineDrivers = useAppSelector(selectOnlineDrivers);
  const mapDrivers = useAppSelector(selectMapDrivers);
  const { hideDropOff } = useAppSelector(selectMapViewSettings);
  const { unAssignedOrders, assignedOrders } = useAppSelector(selectGroupedOrders);

  const [completedOrders, setCompletedOrders] = useState<IOrder[] | null>(null);

  const orders = [
    ...completedOrders || [],
    ...unAssignedOrders || [],
    ...(assignedOrders && assignedOrders.map(assignedOrder => assignedOrder.orders)),
  ].flat();

  const drivers = [
    ...mapDrivers || [],
    ...onlineDrivers?.map(driverIncome => driverIncome.driver) || [],
  ];

  useEffect(() => {
    dispatch(getDrivers({ query: null, withShiftsOnly: false }));
  }, [dispatch]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (showCompletedOrders) {
      interval = setInterval(() => getCompletedOrders(setCompletedOrders), APP_ORDERS_INTERVAL);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showCompletedOrders]);

  return (
    <Fragment>
      {orders.map((order) => (
        <Fragment key={order.id}>
          {(!hideDropOff || activeOrder?.id === order.id) && <OrderMarker order={order} />}

          {/* {order.driver && ( */}
          {/*   <DriverMarker driver={order.driver} /> */}
          {/* )} */}
        </Fragment>
      ))}

      {pickups?.map((pickup) => (
        <PickupMarker key={pickup.id} data={pickup} />
      ))}

      {drivers?.map(driver => (
        <DriverMarker key={driver.id} driver={driver} />
      ))}
    </Fragment>
  );
};

export default MapMarkers;
