import { ILocation } from './common';
import { ITeam } from './teams';
import { OrderApiStatusType, OrderStatusType } from './order';

export type DriverStatusType = 'online' | 'offline';
export type DriverStateType = 'AVAILABLE' | 'ASSIGNED' | 'ACCEPTED' | 'PICKED_UP' | 'DROP_OFF';
export type DriverVisibleType = 'VISIBLE' | 'INVISIBLE' | 'UNAVAILABLE' | 'OFF';

// DATA types
export interface IDriver {
  id: string;
  team: ITeam;
  name: string;
  visibility: DriverVisibleType;
  orders: IDriverOrder[];
  location: ILocation;
  lastCoordinatesTime: string;
}

export interface IDriverOrder {
  id: string;
  status: OrderStatusType;
  apiStatus: OrderApiStatusType;
}

export interface IDriverIncome {
  id: string;
  driver: IDriver;
  visibleMinutes: number;
  dollarsPerHour: number;
  completedOrdersCount: number;
  dollarsPerHourForThePeriod: number;
}

// STORE types
export interface IDriversState {
  activeDriver: string | null;
  mapDrivers: IDriver[] | null;
  drivers: IDriverIncome[] | null;
}

// API types
export interface IGetDriversParams {
  query?: string | null;
  withShiftsOnly?: boolean;
}
