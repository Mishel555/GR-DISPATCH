import { createSlice } from '@reduxjs/toolkit';
import { IDriver, IDriversState, IStoreState } from '@types';
import { SESSION_KEYS } from '@constants/config';
import { cacheService } from '@services/cache';
import { isActionPending, isActionRejected } from '@utils';
import { getDrivers, getMapDrivers, updateDriverById } from '@thunks/driversThunk';

const baseName = 'drivers';

const initialState: IStoreState<IDriversState> = {
  data: {
    drivers: null,
    mapDrivers: null,
    activeDriver: null,
  },
  error: null,
  loading: false,
};

export const driversSlice = createSlice({
  name: baseName,
  initialState,
  reducers: {
    selectDriver: (state, { payload }) => {
      cacheService.saveSessionState(SESSION_KEYS.ACTIVE_DRIVER, payload);

      state.data.activeDriver = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDrivers.fulfilled, (state, { payload }) => ({
        loading: false,
        data: { ...state.data, drivers: payload },
        error: null,
      }))
      .addCase(getMapDrivers.fulfilled, (state, { payload }) => ({
        loading: false,
        data: { ...state.data, mapDrivers: payload },
        error: null,
      }))
      .addCase(updateDriverById.fulfilled, (state, { payload }) => {
        const driversIncomes = state.data.drivers;
        if (!driversIncomes) return state;

        const driver = payload as IDriver;

        const driverIndex = driversIncomes?.findIndex(driverIncome => driverIncome.driver.id === driver.id);
        driversIncomes[driverIndex].driver = driver;
      })
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

export const { selectDriver } = driversSlice.actions;

export default driversSlice.reducer;
