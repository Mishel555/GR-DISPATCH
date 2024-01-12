import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { getDriverStatus } from '@utils';

const keyName = 'drivers';

const selectState = (state: RootState) => state[keyName];

export const selectDriversState = createSelector(selectState, state => state);

export const selectDrivers = createSelector(selectState, state => state.data.drivers);

export const selectOnlineDrivers = createSelector(selectState, state => (
  state.data.drivers?.filter(driver => getDriverStatus(driver.driver.lastCoordinatesTime) === 'online')
));

export const selectMapDrivers = createSelector(selectState, state => (
  state.data.mapDrivers
));

export const selectDriverById = (id: string) => createSelector(
  selectState,
  state => state.data.drivers?.find(driver => driver.driver.id === id)?.driver,
);

export const selectActiveDriverId = createSelector(
  selectState,
  state => state.data.activeDriver,
);

export const selectActiveDriver = createSelector(selectState, state => {
  const drivers = state.data.drivers;
  const activeDriver = state.data.activeDriver;

  if (!drivers?.length || !activeDriver) return null;

  return drivers.find(driver => driver.driver.id === activeDriver);
});
