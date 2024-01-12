import { IDriver, IGetDriversParams, IUpdateDriverData } from '@types';
import client from './client';

const BASE_PATH = '/app-portal/rest/web/v1';

const endpoints = {
  getAll: (params?: IGetDriversParams) => client.post(`${BASE_PATH}/drivers/search`, params),
  getDriverById: (driverId: string) => client.get<IDriver>(`${BASE_PATH}/drivers/${driverId}`),
  getIncomes: (params?: IGetDriversParams) => client.post(`${BASE_PATH}/driver-incomes/search`, params),
  setInvisibleDriverById: (driverId: string) => client.post(`${BASE_PATH}/drivers/${driverId}/off`, {}),
  updateDriver: (driverId: string, data: IUpdateDriverData) => client.patch(`${BASE_PATH}/drivers/${driverId}`, data),
};

export default endpoints;
