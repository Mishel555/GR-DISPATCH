import { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetRoutePaths, IGetRoutesParams, IRoute, IRouteItem, IUpdateRouteParams } from '@types';
import api from '@services/api';
import { filterRoutePaths, groupRoute, getRoutePath, getNearestDate } from '@utils';
import dayjs from 'dayjs';

const baseName = 'routes';

export const getRoutes = createAsyncThunk(
  `${baseName}/getAll`,
  async (params: IGetRoutesParams, { rejectWithValue }) => {
    try {
      const { data } = await api.routes.getAll(params);

      data.result.forEach((route: IRoute) => {
        route.items.forEach(item => {
          item.id = uuidv4();
        });
      });

      return data.result as IRoute[];
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const updateRouteById = createAsyncThunk(
  `${baseName}/updateRouteById`,
  async (params: IUpdateRouteParams, { rejectWithValue }) => {
    try {
      const { data } = await api.routes.updateRoute(params);

      data.result.items.forEach((item: IRouteItem) => {
        item.id = uuidv4();
      });

      return data.result as IRoute;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const getRoutePathsWithLocations = createAsyncThunk(
  `${baseName}/getRoutePathsWithLocations`,
  async (params: IGetRoutePaths, { rejectWithValue }) => {
    try {
      const today = dayjs();
      const routeItems = groupRoute(params.route).items;

      if (!routeItems) {
        return null;
      }

      const nearestOrderIndex = getNearestDate(
        routeItems[0].orders.map(order => order.timestamps.deliverBy as string),
        today.toISOString(),
      ).index;

      const orderId = routeItems[0].orders[nearestOrderIndex].id;
      const { data: order } = await api.orders.getOrderById(orderId);

      const data = routeItems.map(item => getRoutePath(item.type, order));

      return filterRoutePaths(data);
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);
