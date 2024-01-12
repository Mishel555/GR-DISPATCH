import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDriver, IGetDriversParams, IUpdateDriverPayload } from '@types';
import api from '@services/api';

const baseName = 'drivers';

export const getDrivers = createAsyncThunk(
  `${baseName}/getAll`,
  async (params: IGetDriversParams, { rejectWithValue }) => {
    try {
      const { data } = await api.drivers.getIncomes(params);

      return data.result;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const getMapDrivers = createAsyncThunk(
  `${baseName}/getMapDrivers`,
  async (params: IGetDriversParams, { rejectWithValue }) => {
    try {
      const { data } = await api.drivers.getAll(params);

      return data.result as IDriver[];
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const updateDriverById = createAsyncThunk(
  `${baseName}/updateDriverById`,
  async (params: IUpdateDriverPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.drivers.updateDriver(params.driverId, params.data);
      return data;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);
