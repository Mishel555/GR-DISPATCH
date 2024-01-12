import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const keyName = 'modal';

const selectState = (state: RootState) => state[keyName];

export const selectModalState = createSelector(selectState, state => state);
