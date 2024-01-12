import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { groupRoute } from '@utils';

const keyName = 'routes';

const selectState = (state: RootState) => state[keyName];

export const selectRoutes = () => createSelector(selectState, state => state.data?.routes);

export const selectRouteById = (id: string) => createSelector(
  selectState,
  state => state.data?.routes.find(route => route.id === id),
);

export const selectGroupedRoutes = () => createSelector(
  selectState,
  state => {
    const routes = state.data?.routes;

    if (!routes) return;

    return routes.map(route => groupRoute(route));
  },
);

export const selectActiveRouteId = createSelector(
  selectState,
  state => state.data?.activeRoute,
);

export const selectActiveRoute = createSelector(selectState, state => {
  const routes = state.data?.routes;
  const activeRoute = state.data?.activeRoute;

  if (!routes || !routes.length || !activeRoute) return;

  return routes.find(route => route.id === activeRoute);
});

export const selectActiveRoutePaths = createSelector(selectState, state => state.data?.activeRoutePaths);
