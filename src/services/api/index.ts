import config from './config';
import drivers from './drivers';
import orders from './orders';
import teams from './teams';
import dropOff from './dropOff';
import pickUp from './pickUp';
import address from './address';
import routes from './routes';

export { default as client } from './client';

export default {
  config,
  drivers,
  orders,
  teams,
  dropOff,
  pickUp,
  address,
  routes,
};
