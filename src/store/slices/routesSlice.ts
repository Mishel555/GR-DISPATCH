import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoutesState, IStoreState } from '@types';
import { SESSION_KEYS } from '@constants/config';
import { cacheService } from '@services/cache';
import { isActionPending, isActionRejected } from '@utils';
import { getRoutePathsWithLocations, getRoutes, updateRouteById } from '@thunks/routesThunk';

const baseName = 'routes';

const initialState: IStoreState<IRoutesState | null> = {
  data: null,
  error: null,
  loading: false,
};

export const routesSlice = createSlice({
  name: baseName,
  initialState,
  reducers: {
    selectRoute: (state, { payload }: PayloadAction<string | null>) => {
      if (state.data) {
        cacheService.saveSessionState(SESSION_KEYS.ACTIVE_ROUTE, payload);

        state.data.activeRoute = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoutes.fulfilled, (state, { payload }) => ({
        data: state.data ? {
          ...state.data,
          routes: payload,
        } : {
          routes: payload,
          activeRoute: null,
          activeRoutePaths: null,
        },
        error: null,
        loading: false,
      }))
      .addCase(updateRouteById.fulfilled, (state, { payload }) => {
        const routes = state.data?.routes || [];

        const routeIndex = routes.findIndex(route => route.id === payload.id);

        if (routeIndex > -1) {
          routes.splice(routeIndex, 0, payload);
        } else {
          routes.push(payload);
        }

        return {
          data: state.data ? {
            ...state.data,
            routes,
          } : {
            routes,
            activeRoute: null,
            activeRoutePaths: null,
          },
          error: null,
          loading: false,
        };
      })
      .addCase(getRoutePathsWithLocations.fulfilled, (state, { payload }) => ({
        data: state.data ? {
          ...state.data,
          activeRoutePaths: payload,
        } : {
          routes: [],
          activeRoute: null,
          activeRoutePaths: payload,
        },
        error: null,
        loading: false,
      }))
      .addMatcher(isActionPending('routes'), state => ({
        ...state,
        loading: true,
      }))
      .addMatcher(isActionRejected('routes'), (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }));
  },
});

export const { selectRoute } = routesSlice.actions;

export default routesSlice.reducer;
