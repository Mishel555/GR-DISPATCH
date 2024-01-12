import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetTeamsParams, ISelectedTeamsParams, ITeam } from '@types';
import api from '@services/api';

const baseName = 'teams';

export const getTeams = createAsyncThunk(
  `${baseName}/getAll`,
  async (params: IGetTeamsParams, { rejectWithValue }) => {
    try {
      const { data } = await api.teams.getAll(params);

      return data.result as ITeam[];
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const getSelectedTeams = createAsyncThunk(
  `${baseName}/getSelected`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.teams.getSelectedTeams();

      return data.result as ITeam[];
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const setSelectedTeams = createAsyncThunk(
  `${baseName}/setSelected`,
  async (params: ISelectedTeamsParams, { rejectWithValue }) => {
    try {
      const { data } = await api.teams.setSelectedTeams(params);
      return data.result as ITeam[];
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);
