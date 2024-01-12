import { ReactNode } from 'react';

export type WithPrefixStringType<T extends string> = `${T}${string}`;

// Default is not declared...
export interface IDndDragEvent {
  // eslint-disable-next-line
  [key: string]: any;
}

export interface IValueLabel<T = string> {
  value: T;
  label: string;
}

export interface IAddress {
  address?: string;
  location: ILocation;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IVertexes {
  x: number;
  y: number;
}

export interface IRgb {
  r: number;
  g: number;
  b: number;
}

export interface ISidebarTab {
  value: string;
  label: ReactNode | ReactNode[];
}

export interface IStoreState<T> {
  data: T;
  loading: boolean;
  error: unknown | null;
}

export interface IIconDefaultProps {
  color?: string;
  onClick?: () => void;
}

export interface IBeError {
  code: number;
  details: string;
  error_code: string;
  message: string;
}
