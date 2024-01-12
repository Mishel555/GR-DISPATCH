import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { IPickUp, IPolygon, MapPolygonsType } from '@types';
import { sortPolygonsByArea, vertexesToLatLng } from '@utils';
import api from '@services/api';
import { useAppSelector } from '@hooks';
import { selectMapViewSettings } from '@selectors/configSelector';
import { selectTeamsPolygons } from '@selectors/teamsSelector';
import { MapPolygon } from '@components/map';

const fetchPickups = async (setState: Dispatch<SetStateAction<IPolygon[] | null>>) => {
  const { data: response } = await api.pickUp.getWithPolygons({ query: null });

  const pickups = response.result;
  const data: IPolygon[][] = [];

  if (pickups) {
    pickups.forEach((pickUp: IPickUp) => {
      const { polygons } = pickUp;
      const localData: IPolygon[] = [];

      if (!polygons || !Object.keys(polygons)) return;

      polygons.quoteDeliveryPolygons?.forEach(polygon => {
        if (polygon.color && polygon.vertexes) {
          localData.push({
            label: pickUp.name,
            color: polygon.color,
            paths: vertexesToLatLng(polygon.vertexes),
          });
        }
      });

      polygons.selfDeliveryPolygons?.forEach(polygon => {
        if (polygon.color && polygon.vertexes) {
          localData.push({
            label: pickUp.name,
            color: polygon.color,
            paths: vertexesToLatLng(polygon.vertexes),
          });
        }
      });

      if (localData.length) {
        data.push(localData);
      }
    });
  }

  setState(sortPolygonsByArea(data));
};

const MapPolygons = () => {
  const { polygons } = useAppSelector(selectMapViewSettings);
  const teamsPolygons = useAppSelector(selectTeamsPolygons);

  const [pickupPolygons, setPickupPolygons] = useState<IPolygon[] | null>(null);

  const polygonsPaths: Record<MapPolygonsType, IPolygon[]> = {
    'teams': teamsPolygons,
    'pick-ups': pickupPolygons ?? [],
  };

  useEffect(() => {
    fetchPickups(setPickupPolygons);
  }, []);

  return polygons?.length ? (
    <Fragment>
      {polygons.map(key => (
        <Fragment key={key}>
          {polygonsPaths[key]?.map((polygon, index) => (
            <MapPolygon key={index} {...polygon} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  ) : null;
};

export default MapPolygons;
