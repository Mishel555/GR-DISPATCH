import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetPickUpsParams, IPickUp } from '@types';
import api from '@services/api';

const baseName = 'pickups';

export const getPickups = createAsyncThunk(
  `${baseName}/getAll`,
  async (params: IGetPickUpsParams, { rejectWithValue }) => {
    try {
      const { data } = await api.pickUp.getAll(params);

      return data.result as IPickUp[];
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);
