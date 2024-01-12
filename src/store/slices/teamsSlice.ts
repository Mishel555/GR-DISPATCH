import { createSlice } from '@reduxjs/toolkit';
import { IStoreState, ITeamState } from '@types';
import { isActionPending, isActionRejected } from '@utils';
import { getTeams, getSelectedTeams, setSelectedTeams } from '@thunks/teamsThunk';

const baseName = 'teams';

const initialState: IStoreState<ITeamState | null> = {
  data: null,
  error: null,
  loading: false,
};

export const teamsSlice = createSlice({
  name: baseName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.fulfilled, (state, { payload }) => ({
        loading: false,
        error: null,
        data: { list: payload, checkedTeams: state.data?.checkedTeams || [] },
      }))
      .addCase(getSelectedTeams.fulfilled, (state, { payload }) => ({
        loading: false,
        error: null,
        data: {
          list: state.data?.list || [],
          checkedTeams: payload.map(team => team.id),
        },
      }))
      .addCase(setSelectedTeams.fulfilled, (state, { payload }) => ({
        loading: false,
        error: null,
        data: {
          list: state.data?.list || [],
          checkedTeams: payload.map(team => team.id),
        },
      }))
      .addMatcher(isActionPending(baseName), state => ({
        ...state,
        loading: true,
      }))
      .addMatcher(isActionRejected(baseName), (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }));
  },
});

export const {} = teamsSlice.actions;

export default teamsSlice.reducer;
