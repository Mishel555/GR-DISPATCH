import { IGetTeamsParams, ISelectedTeamsParams } from '@types';
import client from './client';

const BASE_PATH = '/app-portal/rest/web/v1/teams';

const endpoints = {
  getAll: (params?: IGetTeamsParams) => client.post(`${BASE_PATH}/search`, params),
  getSelectedTeams: () => client.get(`${BASE_PATH}/selected`),
  setSelectedTeams: (params: ISelectedTeamsParams) => client.post(`${BASE_PATH}/select`, params),
};

export default endpoints;
