import { Polyline } from '@react-google-maps/api';
import { ILatLng } from '@types';
import { COLORS } from '@constants/theme';

interface IProps {
  paths: ILatLng[];
}

const POLYLINE_OPTIONS: google.maps.PolylineOptions = {
  strokeOpacity: 1,
  strokeColor: COLORS.GREY_LIGHT,
};

const MapArrow = ({ paths }: IProps) => (
  <Polyline
    path={paths}
    options={{
      ...POLYLINE_OPTIONS,
      icons: [{
        repeat: '150px',
        icon: { scale: 2.5, strokeOpacity: 1, path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
      }],
    }}
  />
);

export default MapArrow;
