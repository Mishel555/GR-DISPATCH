import { IVertexes } from './common';

// DATA types
export interface ITeam {
  id: string;
  alias: string;
  polygons?: ITeamPolygon;
}

export interface ITeamPolygon {
  quoteDeliveryPolygons: IQuoteDeliveryPolygon[];
  showQuoteDeliveryOnDispatcherMap: boolean;
}

export interface IQuoteDeliveryPolygon {
  color?: string;
  vertexes?: IVertexes[];
}

// STORE types
export interface ITeamState {
  list: ITeam[];
  checkedTeams: string[];
}

export interface IUpdateDriverPayload {
  driverId: string;
  data: IUpdateDriverData;
}

// API types
export interface IGetTeamsParams {
  query?: string | null;
}

export interface ISelectedTeamsParams {
  teams: { id: string }[];
}

export interface IUpdateDriverData {

}
