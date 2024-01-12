import { IGroupedRoute, IGroupedRouteItem, ILatLng, ILocation, IOrder, IRoute, IRouteItem, RouteItemType } from '@types';
import { locationToLatLng } from './map';

export const groupRoute = (data: IRoute): IGroupedRoute => {
  const items: Map<string, IGroupedRouteItem> = new Map();

  data.items.forEach(item => {
    const id = item.type === 'PICKUP' ? `PICKUP-${item.order.pickup.id}` : `DROPOFF-${item.order.dropOff?.id}`;

    const mapItem = items.get(id);
    if (mapItem) {
      mapItem.orders.push(item.order);
      return items.set(id, mapItem);
    }

    items.set(id, { ...item, orders: [item.order] });
  });

  return { ...data, items: Array.from(items.values()) };
};

export const unGroupRoute = (data: IGroupedRoute): IRoute => {
  const items: IRouteItem[] = [];

  data.items.forEach((route) => {
    items.push(...route.orders.map(order => ({
      ...route,
      order,
    })));
  });

  return {
    ...data,
    items,
  };
};

export const getRoutePath = (type: RouteItemType, order: IOrder): ILatLng => {
  if (type === 'PICKUP') {
    return locationToLatLng(order.pickup.address.location);
  }

  return locationToLatLng(order.dropOff?.address.location as ILocation);
};

export const filterRoutePaths = (data: ILatLng[]): ILatLng[][] => {
  const map = new Map<string, ILatLng>();
  const result: ILatLng[][] = [];

  // let keyIndex = 0;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const key = `${item.lng}-${item.lng}-${i}`;

    // if (!map.has(key)) {
    map.set(key, item);
    // }
  }

  Array.from(map.values()).forEach((item, index, arr) => {
    const temp: ILatLng[] = [];
    const nextItem = arr[index + 1];

    temp.push(item);

    if (nextItem) {
      temp.push(nextItem);
    }

    result.push(temp);
  });

  return result;
};
