import client from './client';

const BASE_PATH = '/app-portal/rest/web/v1/addresses';

interface IGetAddresses {
  query: string;
}

const endpoints = {
  getAll: (params: IGetAddresses) => client.post(`${BASE_PATH}/search`, params),
  getAddressByPlaceId: (id: string) => client.get(`${BASE_PATH}/${id}`),
};

export default endpoints;
