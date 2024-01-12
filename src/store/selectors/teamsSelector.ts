import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { IPolygon } from '@types';
import { sortPolygonsByArea, vertexesToLatLng } from '@utils';

const keyName = 'teams';

const selectState = (state: RootState) => state[keyName];

export const selectTeams = createSelector(selectState, state => state.data?.list);

export const selectTeamsCount = createSelector(selectState, state => state.data?.list.length);

export const selectCheckedTeams = createSelector(selectState, state => state.data?.checkedTeams);

export const selectCheckedCount = createSelector(selectState, state => state.data?.checkedTeams.length || 0);

export const selectTeamsPolygons = createSelector(selectState, state => {
  const teams = state.data?.list;
  const data: IPolygon[][] = [];

  if (teams) {
    teams.forEach(team => {
      const { polygons } = team;
      const localData: IPolygon[] = [];

      if (polygons?.quoteDeliveryPolygons) {
        polygons.quoteDeliveryPolygons.forEach(polygon => {
          if (polygon.color && polygon.vertexes) {
            localData.push({
              label: team.alias,
              color: polygon.color,
              paths: vertexesToLatLng(polygon.vertexes),
            });
          }
        });
      }

      if (localData.length) {
        data.push(localData);
      }
    });
  }

  return sortPolygonsByArea(data);
});
