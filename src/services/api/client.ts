import axios from 'axios';
import { WEB_API_ORIGIN } from '@constants/environment';

const instance = axios.create({
  baseURL: WEB_API_ORIGIN,
});

instance.interceptors.request.use(config => {
  const session = sessionStorage.getItem('session');

  config.params ??= {};
  config.params.session = session;

  return config;
});

export default instance;
