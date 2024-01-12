import { EDateFormats, EDateTimeFormats, ETimeFormats, ILayoutSettings } from '@types';

export const APP_CONFIG_INTERVAL = 600000; // 10 minutes
export const APP_ORDERS_INTERVAL = 10000; // 10 seconds
export const APP_ROUTES_INTERVAL = 10000; // 10 seconds
export const APP_DRIVERS_INTERVAL = 10000; // 10 seconds

export const SESSION_KEYS = {
  ACTIVE_ORDER: 'ACTIVE_ORDER_STATE',
  ACTIVE_PICKUP: 'ACTIVE_PICKUP_STATE',
  ACTIVE_DRIVER: 'ACTIVE_DRIVER_STATE',
  ACTIVE_ROUTE: 'ACTIVE_ROUTE_STATE',
};

export const APP_LAYOUT_SETTINGS: ILayoutSettings = {
  minWidth: 480,
  maxWidth: 610,
  initialWidth: 480,
  currentWidth: 480,
};

export const DATE_FORMAT_MAPPINGS: Record<EDateFormats, string> = {
  [EDateFormats.ISO_INTERNATIONAL_SLASH]: 'dd/MM/YYYY',
  [EDateFormats.ISO_INTERNATIONAL_HYPHEN]: 'dd-MM-YYYY',
  [EDateFormats.ISO_INTERNATIONAL_PERIOD]: 'dd.MM.YYYY',
  [EDateFormats.ISO_US_SLASH]: 'MM/dd/YYYY',
  [EDateFormats.ISO_US_HYPHEN]: 'MM-dd-YYYY',
  [EDateFormats.ISO_US_PERIOD]: 'MM.dd.YYYY',
  [EDateFormats.ISO_JAPAN_SLASH]: 'YYYY/MM/dd',
  [EDateFormats.ISO_JAPAN_HYPHEN]: 'YYYY-MM-dd',
  [EDateFormats.ISO_JAPAN_PERIOD]: 'YYYY.MM.dd',
};

export const TIME_FORMAT_MAPPINGS: Record<ETimeFormats, string> = {
  [ETimeFormats.ISO_INTERNATIONAL_COLON]: 'HH:mm',
  [ETimeFormats.ISO_US_COLON]: 'hh:mm a',
};

export const DATE_TIME_FORMATS_MAPPING: Record<EDateTimeFormats, string> = {
  [EDateTimeFormats.ISO_INTERNATIONAL_SLASH_COLON]: 'dd/MM/YYYY HH:mm',
  [EDateTimeFormats.ISO_INTERNATIONAL_HYPHEN_COLON]: 'dd-MM-YYYY HH:mm',
  [EDateTimeFormats.ISO_INTERNATIONAL_PERIOD_COLON]: 'dd.MM.YYYY HH:mm',
  [EDateTimeFormats.ISO_US_SLASH_COLON]: 'MM/dd/YYYY hh:mm a',
  [EDateTimeFormats.ISO_US_HYPHEN_COLON]: 'MM-dd-YYYY hh:mm a',
  [EDateTimeFormats.ISO_US_PERIOD_COLON]: 'MM.dd.YYYY hh:mm a',
  [EDateTimeFormats.ISO_JAPAN_SLASH_COLON]: 'YYYY/MM/dd HH:mm',
  [EDateTimeFormats.ISO_JAPAN_HYPHEN_COLON]: 'YYYY-MM-dd HH:mm',
  [EDateTimeFormats.ISO_JAPAN_PERIOD_COLON]: 'YYYY.MM.dd HH:mm',
};
