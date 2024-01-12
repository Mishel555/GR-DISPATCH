import { IOrder } from './order';
import { ILatLng } from './map';

export type RouteItemType = 'PICKUP' | 'DROPOFF';

export interface IRouteDriver {
  id: string;
  name: string;
  lastCoordinatesTime: string;
}

export interface IRouteItem {
  id: string; // generated in front-end
  type: RouteItemType;
  order: IOrder;
}

export interface IGroupedRouteItem {
  id: string; // generated in front-end
  type: RouteItemType;
  orders: IOrder[];
}

export interface IRoute {
  id: string;
  driver: IRouteDriver;
  items: IRouteItem[];
}

export interface IGroupedRoute {
  id: string;
  driver: IRouteDriver;
  items: IGroupedRouteItem[];
}

// STORE types
export interface IRoutesState {
  routes: IRoute[];
  activeRoute: string | null;
  activeRoutePaths: ILatLng[][] | null;
}

// API types
export interface IGetRoutesParams {
  query?: string | null;
}

interface IUpdateRouteData {
  driver: { id: string };
  items: {
    type: RouteItemType;
    order: { id: string };
  }[];
}

export interface IUpdateRouteParams {
  id: string;
  data: IUpdateRouteData;
}

export interface IGetRoutePaths {
  route: IRoute;
}
