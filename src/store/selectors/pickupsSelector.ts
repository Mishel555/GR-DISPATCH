import { RootState } from '@store';
import { createSelector } from '@reduxjs/toolkit';

const keyName = 'pickups';

const selectState = (state: RootState) => state[keyName];

export const selectAllPickups = createSelector(selectState, state => state.data?.pickups);

export const selectActivePickupId = createSelector(
  selectState,
  state => state.data?.activePickup,
);

export const selectActivePickup = createSelector(selectState, state => {
  const pickups = state.data?.pickups;
  const activePickup = state.data?.activePickup;

  if (!pickups || !pickups.length || !activePickup) return;

  return pickups.find(pickup => pickup.id === activePickup);
});
