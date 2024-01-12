import { Fragment, useEffect, useRef, useState } from 'react';
import { Polygon } from '@react-google-maps/api';
import { isOnPolygonBorder } from '@utils';
import { ILatLng, IPolygon } from '@types';
import PolygonBadge from './PolygonBadge';

const options = {
  strokeWeight: 3.5,
  fillOpacity: 0.1,
  strokeOpacity: 0.5,
  clickable: true,
  draggable: false,
  editable: false,
  zIndex: 1,
};

const MapPolygon = ({ paths, color, label }: IPolygon) => {
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hover, setHover] = useState<boolean>(false);
  const [badgePosition, setBadgePosition] = useState<ILatLng>(paths[paths.length - 1]);

  const resetTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = null;
  };

  const onHover = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;

    if (!latLng) {
      return setHover(false);
    }

    const isOnBorder = isOnPolygonBorder(latLng, paths, options);

    if (isOnBorder) {
      if (!hoverTimeout.current) {
        hoverTimeout.current = setTimeout(() => setHover(true), 300);
      }

      return setBadgePosition(latLng.toJSON());
    }

    resetTimeout();

    setHover(false);
  };

  const onBlur = () => {
    resetTimeout();

    setHover(false);
  };

  useEffect(() => () => {
    resetTimeout();
  }, []);

  return (
    <Fragment>
      <Polygon
        paths={paths}
        options={{
          ...options,
          fillColor: color,
          strokeColor: color,
          // eslint-disable-next-line
          // @ts-ignore
          cursor: hover ? 'none' : 'pointer',
          fillOpacity: hover ? options.fillOpacity * 1.5 : options.fillOpacity,
          strokeOpacity: hover ? options.strokeOpacity * 1.5 : options.strokeOpacity,
        }}
        onMouseMove={onHover}
        // onMouseOver={onHover}
        onMouseOut={onBlur}
      />
      {hover && <PolygonBadge label={label} color={color} position={badgePosition} />}
    </Fragment>
  );
};

export default MapPolygon;
