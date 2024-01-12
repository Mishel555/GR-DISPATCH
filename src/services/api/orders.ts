import { IUpdateDriverData, IGetOrdersParams, IOrder, ISearchDriversForOrders, IDriver, ICheckDriverWarning } from '@types';
import client from './client';

const BASE_PATH = '/app-portal/rest/web/v1';

const endpoints = {
  getAll: (params?: IGetOrdersParams) => client.post(`${BASE_PATH}/orders/search`, params),
  getCompletedOrders: () => client.get(`${BASE_PATH}/orders/completed`),
  getOrderById: (orderId: string) => client.get<IOrder>(`${BASE_PATH}/orders/${orderId}`),
  getOrderBusinessLog: (orderId: string) => client.get(`${BASE_PATH}/orders/${orderId}/business-logs`),
  getNewTemplate: () => client.post(`${BASE_PATH}/orders/new`, {}),
  checkDriverAssignWarnings: (data: ICheckDriverWarning) => client.get(`${BASE_PATH}/orders/${data.order}/assign/warnings`, {
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  assignDriver: (orderId: string, params: IUpdateDriverData) => client.post(`${BASE_PATH}/orders/${orderId}/assign`, params),
  unAssignDriver: (orderId: string) => client.post(`${BASE_PATH}/orders/${orderId}/unassign`, {}),
  quickCreate: (data: unknown) => client.post(`${BASE_PATH}/quick-create/orders`, data),
  fullCreate: (data: unknown) => client.post(`${BASE_PATH}/orders`, data),
  searchDriversForOrder: (orderId: string, payload: ISearchDriversForOrders) => client.post<{ result: IDriver[] }>(`${BASE_PATH}/orders/${orderId}/drivers/search`, payload),
  updateOrderById: (id: string, data: unknown) => client.put(`${BASE_PATH}/orders/${id}`, data),
};

export default endpoints;
