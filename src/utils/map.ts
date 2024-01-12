import { DriverStateType, IGoogleMapSettings, ILatLng, ILocation, IPolygon, IVertexes, OrderStatusType } from '@types';
import { COLORS } from '@constants/theme';

const ORDER_MARKER_COLORS: Record<OrderStatusType, string> = {
  UNASSIGNED: COLORS.CYAN,
  ASSIGNED: COLORS.YELLOW,
  ACCEPTED: COLORS.BLUE_LIGHT,
  PICKED_UP: COLORS.RED_LIGHT,
  DELIVERED: COLORS.VIOLET,
  COMPLETED: COLORS.YELLOW,
  COMP_FOR_ARRIVING: COLORS.BLUE_VIOLET,
  CANCELLED: '', // CANCELED orders isn't shown on map
};

const DRIVER_MARKER_COLOR: Record<DriverStateType, string> = {
  AVAILABLE: COLORS.CYAN,
  ASSIGNED: COLORS.YELLOW,
  ACCEPTED: COLORS.BLUE_LIGHT,
  PICKED_UP: COLORS.RED_LIGHT,
  DROP_OFF: COLORS.VIOLET,
};

export const getOrderMarkerColor = (status: OrderStatusType): string => ORDER_MARKER_COLORS[status];
export const getDriverMarkerColor = (state: DriverStateType): string => DRIVER_MARKER_COLOR[state];

// Function to calculate the area of a polygon
const calculateArea = (path: ILatLng[]) => {
  let area = 0;
  const numPoints = path.length;
  let j = numPoints - 1;

  for (let i = 0; i < numPoints; i++) {
    const point1 = path[i];
    const point2 = path[j];
    area += (point2.lng + point1.lng) * (point2.lat - point1.lat);
    j = i;
  }

  return Math.abs(area / 2);
};

// Function to sort the paths based on their area
export const sortPathsByArea = (paths: ILatLng[][]): ILatLng[][] => paths.sort((path1, path2) => {
  const area1 = calculateArea(path1);
  const area2 = calculateArea(path2);
  return area2 - area1; // Sort in descending order (largest to smallest)
});

export const locationToLatLng = (location: ILocation): ILatLng => ({
  lat: location.latitude,
  lng: location.longitude,
});

export const convertDefaultLocation = (position: string): IGoogleMapSettings['position'] => {
  const [latitude, longitude, zoom] = position.split(/[|,]+/).map(item => +item);

  return {
    zoom,
    center: {
      latitude,
      longitude,
    },
  };
};

export const vertexesToLatLng = (vertexes: IVertexes[]): ILatLng[] => vertexes.map(({ x, y }) => ({
  lat: x,
  lng: y,
}));

export const sortPolygonsByArea = (polygons: IPolygon[][]) => polygons.flat().sort((polygon1, polygon2) => {
  const area1 = calculateArea(polygon1.paths);
  const area2 = calculateArea(polygon2.paths);

  return area2 - area1;
});

export const isOnPolygonBorder = (
  mouseLatLng: google.maps.LatLng,
  paths: ILatLng[],
  polygonOptions: google.maps.PolygonOptions,
): boolean => {
  const polygon = new google.maps.Polygon({ ...polygonOptions, paths });

  // Adjust the tolerance as needed
  return google.maps.geometry.poly.isLocationOnEdge(
    mouseLatLng,
    polygon,
    0.01,
  );
};
