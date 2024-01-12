export type MapLegendsType = 'orders' | 'drivers';
export type MapViewType = 'default' | 'focused';
export type MapPolygonsType = 'pick-ups' | 'teams';

export type PolygonPathsType = ILatLng[][];

export interface IPolygon {
  color: string;
  paths: ILatLng[];
  label: string;
}

export interface ILatLng {
  lat: number;
  lng: number;
}

export interface IMapSettingsLegend {
  icon: JSX.Element;
  label: string;
}

export interface IMapSettingsLegendGroup {
  title: string;
  legends: IMapSettingsLegend[];
}
