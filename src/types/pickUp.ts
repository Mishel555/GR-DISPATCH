import { IAddress } from './common';
import { IQuoteDeliveryPolygon } from './teams';

export interface IPickUp {
  id: string;
  name: string;
  address: IAddress;
  polygons?: IPickUpPolygon;
}

export interface IPickUpPolygon {
  quoteDeliveryPolygons?: IQuoteDeliveryPolygon[];
  selfDeliveryPolygons?: IQuoteDeliveryPolygon[];
}

// API TYPES
export interface IGetPickUpsParams {
  query?: string | null;
}

// STORE TYPES

export interface IPickupState {
  pickups: IPickUp[] | null;
  activePickup: string | null;
}
