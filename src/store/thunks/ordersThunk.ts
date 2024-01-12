import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAssignOrderParams, IBeError, ICancelOrderParams, IGetOrdersParams, IOrder, IUnAssignOrderParams, IUpdateOrderParams } from '@types';
import api from '@services/api';

const baseName = 'orders';

export const getOrders = createAsyncThunk(
  `${baseName}/getAll`,
  async (params: IGetOrdersParams, { rejectWithValue }) => {
    try {
      const { data } = await api.orders.getAll(params);

      return data.result;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const quickCreateOrder = createAsyncThunk(
  `${baseName}/quickCreateOrder`,
  async (params: unknown, { rejectWithValue }) => {
    try {
      const { data } = await api.orders.quickCreate(params);

      return data as IOrder[];
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const fullCreateOrder = createAsyncThunk(
  `${baseName}/fullCreateOrder`,
  async (params: unknown, { rejectWithValue }) => {
    try {
      const { data } = await api.orders.fullCreate(params);

      return data as IOrder;
    } catch (e) {
      const { message, response } = e as AxiosError<IBeError>;
      if (response) {
        return rejectWithValue(response.data.details || response.data.message);
      }

      return rejectWithValue(message);
    }
  },
);

export const updateOrderById = createAsyncThunk(
  `${baseName}/updateOrderById`,
  async (params: IUpdateOrderParams, { rejectWithValue }) => {
    try {
      const { data } = await api.orders.updateOrderById(params.orderId, params.data);

      return data as IOrder;
    } catch (e) {
      const { message, response } = e as AxiosError<IBeError>;
      if (response) {
        return rejectWithValue(response.data.details || response.data.message);
      }

      return rejectWithValue(message);
    }
  },
);

export const cancelOrderById = createAsyncThunk(
  `${baseName}/cancelOrder`,
  async (params: ICancelOrderParams, { rejectWithValue }) => {
    try {
      const { data: currentOrder } = await api.orders.getOrderById(params.orderId);

      const { data } = await api.orders.updateOrderById(
        params.orderId,
        { ...currentOrder, dropOff: { id: currentOrder.dropOff?.id ?? null }, status: 'CANCELLED' },
      );

      return data as IOrder;
    } catch (e) {
      const { message, response } = e as AxiosError<IBeError>;
      if (response) {
        return rejectWithValue(response.data.details || response.data.message);
      }

      return rejectWithValue(message);
    }
  },
);

export const assignDriverToOrder = createAsyncThunk(
  `${baseName}/assignDriverToOrder`,
  async (params: IAssignOrderParams, { rejectWithValue }) => {
    try {
      const { data } = await api.orders.assignDriver(params.orderId, params.data);

      return data as IOrder;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const unAssignDriverFromOrder = createAsyncThunk(
  `${baseName}/unAssignDriverFromOrder`,
  async (params: IUnAssignOrderParams, { rejectWithValue }) => {
    try {
      const { data } = await api.orders.unAssignDriver(params.orderId);

      return data as IOrder;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);
