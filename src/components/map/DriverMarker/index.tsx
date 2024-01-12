import { useEffect, useRef, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Marker } from '@react-google-maps/api';
import dayjs from 'dayjs';
import { DriverVisibleType, IDriver } from '@types';
import { DISPATCHER_SIDEBAR_PATHS } from '@constants/paths';
import { COLORS } from '@constants/theme';
import { generateURLFromSvgComponent, getDriverColorByOrderStatus, getNearestDate, locationToLatLng } from '@utils';
import { useAppSelector } from '@hooks';
import { selectShowDriversName } from '@selectors/configSelector';
import { selectAllOrders } from '@selectors/ordersSelector';
import { selectActiveRoute, selectRouteById } from '@selectors/routesSelector';
import { CircleMarkerIcon, DriverCarMarkerIcon } from '@components/icons';
import DriverName from './DriverName';
import DriverDetails from './DriverDescription';

interface IProps {
  driver: IDriver;
}

const today = dayjs().toISOString();

const disabledVisibleTypes: DriverVisibleType[] = ['INVISIBLE', 'UNAVAILABLE'];

const DriverMarker = ({ driver }: IProps) => {
  const isDriverView = useMatch(`${DISPATCHER_SIDEBAR_PATHS.DRIVERS}`);

  const orders = useAppSelector(selectAllOrders);
  const allowShowName = useAppSelector(selectShowDriversName);
  const driverRoutes = useAppSelector(selectRouteById(driver.id)); // driverId same as routeId

  const activeRoute = useAppSelector(selectActiveRoute);
  const isDisabled = activeRoute && activeRoute.id !== driver.id; // driverId same as routeId

  const [hover, setHover] = useState<boolean>(false);

  const onHover = () => {
    hoverTimeout.current = setTimeout(() => setHover(true), 300);
  };

  const onBlur = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    setHover(false);
  };

  const driverOrders = orders?.filter(order => order.driver?.id === driver.id);
  const nearestOrder = (() => {
    if (!driverOrders || !driverOrders.length) return;

    const nearestOrderIndex = getNearestDate(driverOrders.map(order =>
      order.timestamps.deliverBy ??
      order.timestamps.pickupBy ??
      order.timestamps.dropOffEta as string), today).index;

    return driverOrders[nearestOrderIndex];
  })();

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { location } = driver;

  if (!location) return null;

  const position = locationToLatLng(location);

  const markerColor = nearestOrder ? getDriverColorByOrderStatus(nearestOrder.status) : COLORS.CYAN;

  useEffect(() => () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  }, []);

  const MARKER_OPTIONS: google.maps.MarkerOptions = {
    opacity: isDisabled || disabledVisibleTypes.includes(driver.visibility) ? 0.6 : 1,
  };

  return (
    <Marker
      options={MARKER_OPTIONS}
      onMouseOver={onHover}
      onMouseOut={onBlur}
      position={position}
      icon={{
        url: generateURLFromSvgComponent(
          isDriverView ?
            <DriverCarMarkerIcon color={markerColor} marginBottom={allowShowName ? 25 : 0} />
            :
            <CircleMarkerIcon color={markerColor} marginBottom={allowShowName ? 25 : 0} />,
        ),
      }}
    >
      {allowShowName && (
        <DriverName
          name={driver.name}
          color={markerColor}
          position={position}
          disabled={disabledVisibleTypes.includes(driver.visibility) || isDisabled}
        />
      )}
      {hover && (
        <DriverDetails
          name={driver.name}
          position={position}
          routes={driverRoutes}
          orders={driverOrders?.length ?? 0}
          withName={!!allowShowName}
          status={nearestOrder?.apiStatus}
        />
      )}
    </Marker>
  );
};

export default DriverMarker;
