import { useRef, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import { IPickUp } from '@types';
import { COLORS } from '@constants/theme';
import { generateURLFromSvgComponent, getPickUpOverdueTime, locationToLatLng } from '@utils';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectMapViewSettings } from '@selectors/configSelector';
import { selectActiveRoute } from '@selectors/routesSelector';
import { selectAllOrders } from '@selectors/ordersSelector';
import { selectPickUp } from '@slices/pickupSlice';
import { MinuteMarker, StoreMarkerIcon } from '@components/icons';
import PickUpDescription from './PickUpDescription';
import dayjs from 'dayjs';

interface IProps {
  data: IPickUp;
  pickUpTime?: string | null;
}

const removeAccessibility = () => {
  const markers = document.querySelectorAll('div[title=""]');

  markers.forEach(marker => {
    if (marker.children[0].tagName === 'IMG') {
      marker.classList.add('marker-class');
      marker.ariaHidden = 'true';
    }
  });
};

const PickupMarker = ({ data, pickUpTime }: IProps) => {
  const dispatch = useAppDispatch();

  const { view } = useAppSelector(selectMapViewSettings);
  const focusedView = view === 'focused';

  const order = useAppSelector(selectAllOrders)?.find(order => order.pickup.id === data.id);
  const activeRoute = useAppSelector(selectActiveRoute);
  const activeRouteOrders = activeRoute?.items.map(item => item.order).map(order => order.id);
  const isDisabled = order && activeRouteOrders && !activeRouteOrders.includes(order.id);

  const position = locationToLatLng(data.address.location);
  const pickupBy = pickUpTime ?? order?.timestamps.pickupBy;

  const diff = pickupBy ? dayjs(pickupBy).diff(dayjs(), 'second') : 1000;
  const overdueTime = focusedView ? getPickUpOverdueTime(diff) : false;

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const onClick = () => {
    dispatch(selectPickUp(data.id));
  };

  const onHover = () => {
    hoverTimeout.current = setTimeout(() => setShowDescription(true), 300);
  };

  const onBlur = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    setShowDescription(false);
  };

  removeAccessibility();

  const MARKER_OPTIONS: google.maps.MarkerOptions = {
    opacity: isDisabled ? 0.6 : 1,
  };

  return (
    <Marker
      options={MARKER_OPTIONS}
      position={position}
      onClick={onClick}
      onMouseOver={onHover}
      onMouseOut={onBlur}
      icon={{
        url: generateURLFromSvgComponent(
          overdueTime ? <MinuteMarker minutes={overdueTime} color={COLORS.RED_LIGHT} />
            : <StoreMarkerIcon color={overdueTime === false ? COLORS.GREY_MAIN : COLORS.RED_LIGHT} />,
        ),
      }}
    >
      {showDescription && (
        <PickUpDescription
          name={data.name}
          address={data.address.address}
          position={locationToLatLng(data.address.location)}
        />
      )}
    </Marker>
  );
};

export default PickupMarker;
