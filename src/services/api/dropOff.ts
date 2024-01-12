import { IGetDropOffsParams } from '@types';
import client from './client';

const BASE_PATH = '/app-portal/rest/web/v1';

const endpoints = {
  getAll: (params?: IGetDropOffsParams) => client.post(`${BASE_PATH}/quick-create/drop-offs/search`, params),
};

export default endpoints;
