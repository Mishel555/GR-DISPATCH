import { useEffect, useRef, useState } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { ILatLng } from '@types';
import { useAppSelector } from '@hooks';
import { locationToLatLng } from '@utils';
import { selectGoogleMapSettings } from '@selectors/configSelector';
import { selectActiveOrder } from '@selectors/ordersSelector';
import { selectActiveRouteId, selectActiveRoutePaths } from '@selectors/routesSelector';
import { selectActivePickup } from '@selectors/pickupsSelector';
import { selectActiveDriver } from '@selectors/driversSelector';
import MapToolbar from './MapToolbar';
import MapMarkers from './MapMarkers';
import MapPolygons from './MapPolygons';
import MapArrows from './MapArrows';
import { MapWrapper } from './styled-components';

interface ILastZoomItems {
  order: string | null;
  pickup: string | null;
  driver: string | null;
  route: string | null;
}

const initMapSettings = (mapId: string): google.maps.MapOptions => ({
  mapId,
  disableDefaultUI: true,
  gestureHandling: 'greedy',
});

const LIBRARIES: Libraries = ['geometry'];

const DispatcherMap = () => {
  const mapSettings = useAppSelector(selectGoogleMapSettings);
  const activeOrder = useAppSelector(selectActiveOrder);
  const activePickup = useAppSelector(selectActivePickup);
  const activeRouteId = useAppSelector(selectActiveRouteId);
  const activeRoutePaths = useAppSelector(selectActiveRoutePaths);
  const activeDriver = useAppSelector(selectActiveDriver);

  const isInitialized = useRef<boolean>(false);
  const lastZoomItems = useRef<ILastZoomItems>({ order: null, pickup: null, driver: null, route: null });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onMapLoad = (data: google.maps.Map) => {
    setMap(data);
  };

  useEffect(() => {
    if (!map) return;

    const locations: ILatLng[] = [];

    if (activeOrder) {
      if (activeOrder.id === lastZoomItems.current.order) return;

      const { id, dropOff, pickup } = activeOrder;

      locations.push(...[
        ...(dropOff ? [locationToLatLng(dropOff.address.location)] : []),
        locationToLatLng(pickup.address.location),
      ]);

      lastZoomItems.current = { ...lastZoomItems.current, order: id };
    } else {
      lastZoomItems.current = { ...lastZoomItems.current, order: null };
    }

    if (locations.length) {
      const bounds = new google.maps.LatLngBounds();

      locations.forEach((marker) => {
        bounds.extend(marker);
      });

      map.fitBounds(bounds);
    }
  }, [activeOrder, map]);

  useEffect(() => {
    if (!map) return;

    if (activeDriver) {
      const { id, driver } = activeDriver;

      if (id === lastZoomItems.current.driver) return;

      map.setCenter(locationToLatLng(driver.location));

      lastZoomItems.current = { ...lastZoomItems.current, driver: id };
    } else {
      lastZoomItems.current = { ...lastZoomItems.current, driver: null };
    }
  }, [map, activeDriver]);

  useEffect(() => {
    if (!map) return;

    if (activePickup) {
      if (activePickup.id === lastZoomItems.current.pickup) return;

      const pickupPosition = locationToLatLng(activePickup.address.location);

      lastZoomItems.current = { ...lastZoomItems.current, pickup: activePickup.id };
      map.setCenter(pickupPosition);
    } else {
      lastZoomItems.current = { ...lastZoomItems.current, pickup: null };
    }
  }, [map, activePickup]);

  useEffect(() => {
    if (!map) return;

    if (!activeRouteId || !activeRoutePaths) {
      lastZoomItems.current = { ...lastZoomItems.current, route: null };
      return;
    }

    if (activeRouteId === lastZoomItems.current.route) return;

    const locations: ILatLng[] = [];

    locations.push(...activeRoutePaths.flat().map(location => location));

    if (locations.length) {
      const bounds = new google.maps.LatLngBounds();

      locations.forEach((marker) => {
        bounds.extend(marker);
      });

      lastZoomItems.current = { ...lastZoomItems.current, route: activeRouteId };
      map.fitBounds(bounds);
    }
  }, [map, activeRouteId, activeRoutePaths]);

  useEffect(() => {
    if (!isInitialized.current && mapSettings && map) {
      isInitialized.current = true;

      map.setZoom(mapSettings.position.zoom || 15);
      map.setCenter(locationToLatLng(mapSettings.position.center));
    }
  }, [map, mapSettings]);

  // useEffect(() => {
  //   if (!map) return;
  //
  //   const zoomLevel = map.getZoom();
  //   const renderKey = selectedTeams?.join(',') || '';
  //
  //   if (mapForceRenderKey.current !== renderKey && zoomLevel !== undefined) {
  //     mapForceRenderKey.current = renderKey;
  //     map.setZoom(zoomLevel);
  //   }
  // }, [map, selectedTeams]);

  return mapSettings ? (
    <MapWrapper>
      <LoadScript googleMapsApiKey={mapSettings.key} libraries={LIBRARIES}>
        <GoogleMap
          onLoad={onMapLoad}
          options={initMapSettings(mapSettings.mapId)}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          <MapMarkers />
          <MapPolygons />
          <MapArrows />
        </GoogleMap>
      </LoadScript>
      <MapToolbar />
    </MapWrapper>
  ) : null;
};

export default DispatcherMap;
