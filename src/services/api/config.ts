import client from './client';

const BASE_PATH = '/app-portal/rest';

const endpoints = {
  getAppConfig: () => client.get(`${BASE_PATH}/property`),
  getAppMapConfig: () => client.get(`${BASE_PATH}/property?names=mapSettings`),
};

export default endpoints;
