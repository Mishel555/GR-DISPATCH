import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConfigState, IMapViewSettings, IStoreState } from '@types';
import { convertDefaultLocation, isActionPending, isActionRejected } from '@utils';
import { getAppConfig } from '@thunks/configThunk';
import { cacheService } from '@services/cache';
import { APP_LAYOUT_SETTINGS } from '@constants/config';

const baseName = 'config';

const INITIAL_MAP_SETTINGS: IMapViewSettings = {
  legend: 'orders',
  view: 'default',
};

const initialState: IStoreState<IConfigState> = {
  data: {
    appLayoutSettings: APP_LAYOUT_SETTINGS,
    mapViewSettings: cacheService.getMapSettings() ?? INITIAL_MAP_SETTINGS,
  },
  error: null,
  loading: false,
};

export const configSlice = createSlice({
  name: baseName,
  initialState,
  reducers: {
    setAppLayoutWidth: (state, { payload }: PayloadAction<number>) => {
      state.data.appLayoutSettings.currentWidth = payload;
    },
    setMapView: (state, action: PayloadAction<IMapViewSettings>) => {
      cacheService.saveMapSettings(action.payload);
      state.data.mapViewSettings = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAppConfig.fulfilled, (state, { payload }) => ({
        data: {
          ...state.data,
          mapSettings: {
            mapId: payload.googleMapId,
            key: payload.googleMapApiKey,
            position: convertDefaultLocation(payload.mapDisplaySettings),
          },
          appConfig: payload,
        },
        loading: false,
        error: null,
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

export const { setMapView, setAppLayoutWidth } = configSlice.actions;
export default configSlice.reducer;
