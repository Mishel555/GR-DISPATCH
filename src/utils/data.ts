import { CurrencyUnitTypes, DriverStatusType, IAssignedOrderGroup, IOrder } from '@types';
import { wasOnlineMinutes } from './date';

export const getDriverStatus = (lastCoordinatesTime: string): DriverStatusType => {
  if (wasOnlineMinutes(lastCoordinatesTime) < 0.5) return 'online';

  return 'offline';
};

export const formatAssignedOrders = (orders: IOrder[]): IAssignedOrderGroup[] => {
  const data: IAssignedOrderGroup[] = [];
  const orderMap = new Map();

  orders.forEach((order) => {
    const key = order.driver.id;

    if (orderMap.has(key)) {
      return orderMap.set(key, [...orderMap.get(key), order]);
    }

    orderMap.set(key, [order]);
  });

  Array.from(orderMap.keys()).forEach(mapKey => {
    const driverOrders = orderMap.get(mapKey);

    data.push({
      orders: driverOrders,
      driver: driverOrders[0].driver,
    });
  });

  return data;
};

export const getCurrencySymbol = (unit: CurrencyUnitTypes) => {
  const UNIT_SYMBOL_MAP: { [key in CurrencyUnitTypes]: string } = {
    EURO: '€',
    US_DOLLAR: '$',
    JAPANESE_YEN: '¥',
    CANADIAN_DOLLAR: 'C$',
  };

  return UNIT_SYMBOL_MAP[unit];
};
