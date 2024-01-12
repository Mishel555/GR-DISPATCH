import { ILocation } from './common';
import { MapLegendsType, MapPolygonsType, MapViewType } from './map';

export type DistanceUnitTypes = 'MILE' | 'KILOMETRE';
export type CurrencyUnitTypes = 'US_DOLLAR' | 'CANADIAN_DOLLAR' | 'EURO' | 'JAPANESE_YEN';

export enum EDateFormats {
  ISO_INTERNATIONAL_SLASH = 'ISO_INTERNATIONAL_SLASH',
  ISO_INTERNATIONAL_HYPHEN = 'ISO_INTERNATIONAL_HYPHEN',
  ISO_INTERNATIONAL_PERIOD = 'ISO_INTERNATIONAL_PERIOD',
  ISO_US_SLASH = 'ISO_US_SLASH',
  ISO_US_HYPHEN = 'ISO_US_HYPHEN',
  ISO_US_PERIOD = 'ISO_US_PERIOD',
  ISO_JAPAN_SLASH = 'ISO_JAPAN_SLASH',
  ISO_JAPAN_HYPHEN = 'ISO_JAPAN_HYPHEN',
  ISO_JAPAN_PERIOD = 'ISO_JAPAN_PERIOD',
}

export enum ETimeFormats {
  ISO_INTERNATIONAL_COLON = 'ISO_INTERNATIONAL_COLON',
  ISO_US_COLON = 'ISO_US_COLON',
}

export enum EDateTimeFormats {
  ISO_INTERNATIONAL_SLASH_COLON = 'ISO_INTERNATIONAL_SLASH_COLON',
  ISO_INTERNATIONAL_HYPHEN_COLON = 'ISO_INTERNATIONAL_HYPHEN_COLON',
  ISO_INTERNATIONAL_PERIOD_COLON = 'ISO_INTERNATIONAL_PERIOD_COLON',
  ISO_US_SLASH_COLON = 'ISO_US_SLASH_COLON',
  ISO_US_HYPHEN_COLON = 'ISO_US_HYPHEN_COLON',
  ISO_US_PERIOD_COLON = 'ISO_US_PERIOD_COLON',
  ISO_JAPAN_SLASH_COLON = 'ISO_JAPAN_SLASH_COLON',
  ISO_JAPAN_HYPHEN_COLON = 'ISO_JAPAN_HYPHEN_COLON',
  ISO_JAPAN_PERIOD_COLON = 'ISO_JAPAN_PERIOD_COLON',
}

export interface IAppConfig {
  distanceUnit: DistanceUnitTypes;
  dateFormat: EDateFormats;
  timeFormat: ETimeFormats;
  dateTimeFormat: EDateTimeFormats;
  timeZoneSettings: { id: string; offset: number };
  chatAppId: string;
  googleMapId: string;
  googleMapApiKey: string;
  mapDisplaySettings: string;
  currencyUnit: CurrencyUnitTypes;
  chooseDropOffFromTheList?: boolean;
  maxTeamsSelection?: number;
  showCompletedOrdersOnTheMap?: boolean;
}

export interface ILayoutSettings {
  minWidth: number;
  maxWidth: number;
  initialWidth: number;
  currentWidth: number;
}

export interface IGoogleMapSettings {
  key: string; // API key
  mapId: string; // Styled Map ID
  position: {
    zoom: number; // default zoom state
    center: ILocation; // default center location
  };
}

export interface IMapViewSettings {
  legend: MapLegendsType;
  view: MapViewType;
  polygons?: MapPolygonsType[];
  hideDropOff?: boolean;
  showDriversName?: boolean;
}

export interface IConfigState {
  mapViewSettings: IMapViewSettings;
  appLayoutSettings: ILayoutSettings;
  mapSettings?: IGoogleMapSettings;
  appConfig?: IAppConfig;
}
