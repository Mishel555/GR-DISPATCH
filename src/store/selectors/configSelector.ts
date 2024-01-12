import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { EDateFormats, EDateTimeFormats, ETimeFormats } from '@types';

const keyName = 'config';

const selectState = (state: RootState) => state[keyName];

export const selectAppConfig = createSelector(selectState, state => state.data?.appConfig);

export const selectGoogleMapSettings = createSelector(selectState, state => state.data?.mapSettings);

export const selectMapViewSettings = createSelector(selectState, state => state.data?.mapViewSettings);

export const selectAppLayoutSettings = createSelector(selectState, state => state.data.appLayoutSettings);

export const selectAppLayoutCurrentWidth = createSelector(
  selectState,
  state => state.data.appLayoutSettings.currentWidth,
);

export const selectShowCompleted = createSelector(selectState, state => (
  state.data?.appConfig?.showCompletedOrdersOnTheMap
));

export const selectShowDriversName = createSelector(selectState, state => state.data?.mapViewSettings.showDriversName);

export const selectMaxTeamsSelection = createSelector(
  selectState,
  state => (
    state.data?.appConfig?.maxTeamsSelection
  ),
);

export const selectAppCurrencyUnit = createSelector(
  selectState,
  state => (
    state.data?.appConfig?.currencyUnit
  ),
);

export const selectAppDateFormat = createSelector(
  selectState,
  state => state.data.appConfig?.dateFormat ?? EDateFormats.ISO_US_SLASH,
);

export const selectAppTimeFormat = createSelector(
  selectState,
  state => state.data.appConfig?.timeFormat ?? ETimeFormats.ISO_US_COLON,
);

export const selectAppDateTimeFormat = createSelector(
  selectState,
  state => state.data.appConfig?.dateTimeFormat ?? EDateTimeFormats.ISO_US_SLASH_COLON,
);

export const selectAppTimeZone = createSelector(
  selectState,
  state => state.data.appConfig?.timeZoneSettings,
);
