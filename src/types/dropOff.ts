import { IAddress } from './common';

export interface IDropOff {
  id: string;
  name: string;
  address: IAddress;
  email: string;
  phone: string;
}

// API TYPES
export interface IGetDropOffsParams {
  query?: string | null;
}
