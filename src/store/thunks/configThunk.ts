import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAppConfig } from '@types';
import api from '@services/api';

const baseName = 'config';

export const getAppConfig = createAsyncThunk(
  `${baseName}/get`,
  async (_, { rejectWithValue }) => {
    try {
      const { data: appConfig } = await api.config.getAppConfig();
      const { data: mapConfig } = await api.config.getAppMapConfig();

      return { ...appConfig, ...mapConfig } as IAppConfig;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);
