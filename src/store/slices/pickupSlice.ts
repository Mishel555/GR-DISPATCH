import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPickupState, IStoreState } from '@types';
import { SESSION_KEYS } from '@constants/config';
import { cacheService } from '@services/cache';
import { isActionPending, isActionRejected } from '@utils';
import { getPickups } from '@thunks/pickupThunk';

const baseName = 'pickups';

const initialState: IStoreState<IPickupState | null> = {
  data: null,
  error: null,
  loading: false,
};

export const pickupSlice = createSlice({
  name: baseName,
  initialState,
  reducers: {
    selectPickUp: (state, { payload }: PayloadAction<string | null>) => {
      if (state.data) {
        cacheService.saveSessionState(SESSION_KEYS.ACTIVE_PICKUP, payload);
        state.data.activePickup = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPickups.fulfilled, (state, { payload }) => ({
        error: null,
        loading: false,
        data: state.data ? { ...state.data, pickups: payload } : { activePickup: null, pickups: payload },
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

export const { selectPickUp } = pickupSlice.actions;
export default pickupSlice.reducer;
