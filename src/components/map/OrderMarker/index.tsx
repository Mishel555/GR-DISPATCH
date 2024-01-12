import { useEffect, useMemo, useRef, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { Marker } from '@react-google-maps/api';
import dayjs from 'dayjs';
import { IOrder, OrderStatusType } from '@types';
import { COLORS } from '@constants/theme';
import { DISPATCHER_SIDEBAR_PATHS, ROOT_PATHS } from '@constants/paths';
import { generateURLFromSvgComponent, getOrderMarkerColor, locationToLatLng } from '@utils';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectOrder } from '@slices/ordersSlice';
import { selectActiveOrderId } from '@selectors/ordersSelector';
import { selectActiveRoute } from '@selectors/routesSelector';
import { CircleMarkerIcon, CompletedOrderMarkerIcon, OrderMarkerIcon } from '@components/icons';
import DropOffDescription from './DropOffDescription';
import './style.scss';

interface IProps {
  order: IOrder;
}

const MAIN_VIEW_PATHS: string[] = [
  ROOT_PATHS.ROOT,
  DISPATCHER_SIDEBAR_PATHS.TEAMS,
  DISPATCHER_SIDEBAR_PATHS.ROUTES,
];

const removeAccessibility = () => {
  const markers = document.querySelectorAll('div[title=""]');

  markers.forEach(marker => {
    if (marker.children[0].tagName === 'IMG') {
      marker.classList.add('marker-class');
      marker.ariaHidden = 'true';
    }
  });
};

const TODAY = dayjs();

const OrderMarker = ({ order }: IProps) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const activeView = MAIN_VIEW_PATHS.findIndex((pathPattern) => matchPath(pathPattern, pathname)) > -1;
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { status, dropOff, timestamps } = order;
  const position = dropOff && locationToLatLng(dropOff.address.location);

  const future = status === 'UNASSIGNED' && Boolean(timestamps.pickupBy && dayjs(timestamps.pickupBy).diff(TODAY, 'minutes') > 60);

  const activeOrder = useAppSelector(selectActiveOrderId);
  const isActive = activeOrder === order.id;

  const activeRoute = useAppSelector(selectActiveRoute);
  const activeRouteOrders = activeRoute?.items.map(item => item.order).map(order => order.id);
  const isDisabled = activeRouteOrders && !activeRouteOrders.includes(order.id);

  const isOverdue = useMemo<boolean>(() => {
    const OTHER_STATUSES: OrderStatusType[] = ['ASSIGNED', 'ACCEPTED', 'UNASSIGNED'];

    if (status === 'PICKED_UP' && timestamps.deliverBy) {
      return dayjs(timestamps.deliverBy).diff(TODAY, 'minutes') < -3;
    }

    if (OTHER_STATUSES.includes(status) && timestamps.pickupBy) {
      return dayjs(timestamps.pickupBy).diff(TODAY, 'minutes') < -3;
    }

    return false;
  }, [status, timestamps]);

  const [showDescription, setShowDescription] = useState<boolean>(false);

  const markerColor = future ? COLORS.BLUE_VIOLET : getOrderMarkerColor(status);

  const onHover = () => {
    hoverTimeout.current = setTimeout(() => setShowDescription(true), 300);
  };

  const onBlur = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    setShowDescription(false);
  };

  const toggleActiveOrder = () => dispatch(selectOrder(isActive ? null : order.id));

  useEffect(() => () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  }, []);

  if (!position) return null;

  removeAccessibility();

  const MARKER_OPTIONS: google.maps.MarkerOptions = {
    opacity: isDisabled ? 0.6 : 1,
  };

  if (status === 'COMPLETED') {
    return (
      <Marker
        options={MARKER_OPTIONS}
        onMouseOver={onHover}
        onMouseOut={onBlur}
        position={position}
        icon={{
          url: generateURLFromSvgComponent(
            activeView ? <CompletedOrderMarkerIcon /> : <CircleMarkerIcon color="#FFD73D" />,
          ),
        }}
      />
    );
  }

  return (
    <Marker
      options={MARKER_OPTIONS}
      position={position}
      onMouseOver={onHover}
      onMouseOut={onBlur}
      onClick={toggleActiveOrder}
      icon={{
        url: generateURLFromSvgComponent(
          activeView ?
            <OrderMarkerIcon color={markerColor} alert={isOverdue} /> :
            <CircleMarkerIcon color={markerColor} />,
        ),
      }}
    >
      {showDescription && (
        <DropOffDescription
          position={position}
          data={{
            date: order.timestamps.deliverBy,
            address: order.dropOff?.address.address,
            name: order.dropOff?.name,
          }}
          onDot={!activeView}
        />
      )}
    </Marker>
  );
};

export default OrderMarker;
