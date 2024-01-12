import dayjs from 'dayjs';
import { IAddress, ILocation } from './common';
import { DriverVisibleType } from './driver';

export type OrderCardType = 'danger' | 'warning';

export type OrderPaymentType =
  'CASH' |
  'ORDER_PAID_TIPS_CASH' |
  'ORDER_PAID_TIPS_PAID' |
  'ORDER_PAID_TIPS_CC_CLIP' |
  'PHOTO' |
  'EXTRA' |
  'UNKNOWN';

export type OrderStatusType =
  'ASSIGNED' |
  'ACCEPTED' |
  'PICKED_UP' |
  'COMPLETED' |
  'DELIVERED' |
  'UNASSIGNED' |
  'CANCELLED' |
  'COMP_FOR_ARRIVING';

export type OrderApiStatusType =
  'SUBMITTED' |
  'TRANSIT_TO_PICKUP' |
  'READY_FOR_PICKUP' |
  'AT_PICKUP' |
  'AT_DROPOFF' |
  'FOOD_NOT_READY' |
  'TRANSIT_TO_DROPOFF' |
  'OTW_ACTIVEAT_DROPOFF' |
  'DONE_DELIVERED' |
  'DONE_CANNOT_DELIVER' |
  'RETURNED';

export type OrderLabelType = 'New' |
  'Not accept' |
  'No address' |
  'Pickup addr' |
  'NOT READY' |
  'Ready' |
  'ID check' |
  'Catering' |
  'Large order' |
  'Fraud' |
  'Check CC' |
  'DoorDash' |
  '-> DoorDash' |
  'UberDirect' |
  '-> UberDirect';

export type OrderFrequencyType =
  'DOES_NOT_REPEAT' |
  'DAILY' |
  'WEEKLY' |
  'MONTHLY' |
  'ANNUALY' |
  'EVERY_WEEKDAY' |
  'CUSTOM';

export interface IOrderDriver {
  id: string;
  name: string;
  visibility: DriverVisibleType;
  lastCoordinatesTime: string;
  location: ILocation;
}

export interface IOrderTimeStamps {
  createdTime: string | null;
  pickupBy: string | null;
  deliverBy?: string | null;
  pickupEta?: string | null;
  dropOffEta?: string | null;
}

export interface IOrderPickup {
  id: string;
  name: string;
  address: IAddress;
}

export interface IOrderDropOff {
  id: string;
  name?: string;
  address: IAddress;
  phone?: string;
  email?: string | null;
  create?: string;
}

export interface IOrderPayments {
  paymentType: OrderPaymentType;
  cash?: number;
  tip?: number;
  deliveryFee?: number;
  tax?: number;
  sum?: number;
  total?: number;
  driverExtraPay?: number;
  driverPay?: number;
  deliveryCharge?: number;
  restaurantTip?: number;
  dspTip?: number;
}

export interface IOrderNotes {
  adminNotes?: string | null;
  pickupNotes?: string | null;
  dropOffNotes?: string | null;
  driverNotes?: string | null;
}

export interface IOrderDistances {
  distance?: number;
  drivingDistance?: number;
}

export interface IOrderFlags {
  future?: boolean | null;
  calculateDriverPay?: boolean | null;
  photo?: boolean | null;
  farCharge?: boolean | null;
  extra?: boolean | null;
  extraOnUs?: boolean | null;
  catering?: boolean | null;
  alcohol?: boolean | null;
  contactlessDelivery?: boolean | null;
}

export interface IOrderDetail {
  id?: string;
  title: string;
  quantity?: number;
  description: string;
  imageUrl: string;
}

export interface IOrder {
  id: string;
  number: string;
  status: OrderStatusType;
  apiStatus: OrderApiStatusType;
  labels: OrderLabelType[];
  driver: IOrderDriver;
  pickup: IOrderPickup;
  dropOff?: IOrderDropOff;
  timestamps: IOrderTimeStamps;
  payments: IOrderPayments;
  notes: IOrderNotes;
  distances: IOrderDistances;
  flags: IOrderFlags;
  orderDetails: IOrderDetail[];
}

export interface IAssignedOrderGroup {
  orders: IOrder[];
  driver: IOrderDriver;
}

// STORE types
export interface IOrderState {
  orders: IOrder[] | null;
  activeOrder: string | null;
  forceLoad: boolean;
}

export interface IAssignOrderParams {
  orderId: string;
  data: object;
}

export interface IUnAssignOrderParams {
  orderId: string;
}

export interface IUpdateOrderParams {
  orderId: string;
  data: object;
}

export interface ICancelOrderParams {
  orderId: string;
}

// API types
export interface IGetOrdersParams {
  dateRange: string;
  atRiskOnly: boolean;
  query?: string | null;
  dateFrom?: string;
  dateTo?: string;
}

export type FormDateAndTimeType = {
  date: dayjs.Dayjs;
  time: dayjs.Dayjs;
  AM?: boolean;
}

export interface ICheckDriverWarning {
  order: string;
  driver: { id: string };
}

interface IFormPickup {
  id?: string | null;
  address?: string | null;
}

interface IFormDropOff {
  address?: string | null;
}

interface IFormTimeStamps {
  createdTime: FormDateAndTimeType | null;
  pickupBy: FormDateAndTimeType | null;
  deliverBy?: FormDateAndTimeType | null;
  pickupEta?: FormDateAndTimeType | null;
  dropOffEta?: FormDateAndTimeType | null;
}

interface IFormDriver {
  id?: string | null;
}

export interface IFullOrderCreateForm {
  id: string;
  number: string;
  flags: IOrderFlags;
  notes: IOrderNotes;
  timestamps: IFormTimeStamps;
  status: OrderStatusType;
  apiStatus: OrderApiStatusType;
  distances: IOrderDistances;
  payments: IOrderPayments;
  pickup: IFormPickup | IOrderPickup;
  dropOff: IOrderDropOff | IFormDropOff;
  driver?: IFormDriver;
  orderDetails: IOrderDetail[];

  dropOffETA?: unknown;
  pickupETA?: unknown;

  // data for converting...
  FLAGS1?: string[];
  FLAGS2?: string[];
  signerName?: string;
}

export interface IOrderBusinessLog {
  id: string;
  date: string;
  status?: string;
  source?: string;
  apiStatus?: string;
  log: string;
  details?: string;
  user: IOrderBusinessLogUser;
}

export interface IOrderBusinessLogUser {
  id: string;
  login: string;
  name?: string;
}

export interface ISearchDriversForOrders {
  order: IOrder;
  query?: string | null;
  withShiftsOnly: boolean;
}
