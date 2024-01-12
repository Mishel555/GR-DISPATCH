import { IGetPickUpsParams } from '@types';
import client from './client';

const BASE_PATH = '/app-portal/rest/web/v1';

const endpoints = {
  getAll: (params: IGetPickUpsParams) => client.post(`${BASE_PATH}/quick-create/pickups/search`, params),
  getWithPolygons: (params: IGetPickUpsParams) => client.post(`${BASE_PATH}/pickups/search`, params),
};

export default endpoints;
