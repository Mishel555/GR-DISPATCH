import { Fragment, useEffect } from 'react';
import { locationToLatLng } from '@utils';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getRoutePathsWithLocations } from '@thunks/routesThunk';
import { selectActiveOrder } from '@selectors/ordersSelector';
import { selectActiveRoute, selectActiveRoutePaths } from '@selectors/routesSelector';
import { MapArrow } from '@components/map';

// const MOCK_ROUTE_DATA: ILatLng[][] = [
//   [
//     { lat: 34.0522, lng: -118.2437 },
//     { lat: 34.0593801, lng: -118.4592182 },
//   ],
//   [
//     { lat: 34.0593801, lng: -118.4592182 },
//     { lat: 34.00410842895508, lng: -118.4796142578125 },
//   ],
// ];

const MapArrows = () => {
  const dispatch = useAppDispatch();

  const activeOrder = useAppSelector(selectActiveOrder);
  const activeRoute = useAppSelector(selectActiveRoute);
  const activeRoutePaths = useAppSelector(selectActiveRoutePaths);

  useEffect(() => {
    if (activeRoute) {
      dispatch(getRoutePathsWithLocations({ route: activeRoute }));
    }
  }, [dispatch, activeRoute]);

  return (
    <Fragment>
      {activeOrder?.dropOff && (
        <MapArrow
          key={activeOrder.id}
          paths={[
            locationToLatLng(activeOrder.pickup.address.location),
            locationToLatLng(activeOrder.dropOff.address.location),
          ]}
        />
      )}
      {activeRoutePaths?.map((paths, index) => (
        <MapArrow key={`${index}-${activeRoute?.id}`} paths={paths} />
      ))}
    </Fragment>
  );
};

export default MapArrows;
