import { IGetRoutesParams, IUpdateRouteParams } from '@types';
import client from './client';

const BASE_PATH = '/app-portal/rest/web/v1/driver-routes';

const endpoints = {
  getAll: (params: IGetRoutesParams) => client.post(`${BASE_PATH}/search`, params),
  updateRoute: (params: IUpdateRouteParams) => client.post(`${BASE_PATH}/${params.id}/send`, params.data),
};

export default endpoints;
