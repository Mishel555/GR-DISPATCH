import { configureStore } from '@reduxjs/toolkit';

import driversReducers from './slices/driversSlice';
import configReducers from './slices/configSlice';
import ordersReducers from './slices/ordersSlice';
import teamsReducers from './slices/teamsSlice';
import modalReducer from './slices/modalSlice';
import routesReducer from './slices/routesSlice';
import pickupsReducer from './slices/pickupSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    config: configReducers,
    drivers: driversReducers,
    orders: ordersReducers,
    teams: teamsReducers,
    routes: routesReducer,
    pickups: pickupsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
