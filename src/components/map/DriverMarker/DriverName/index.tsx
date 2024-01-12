import { Marker } from '@react-google-maps/api';
import { ILatLng } from '@types';
import { generateURLFromSvgComponent } from '@utils';
import { BadgeMarker } from '@components/icons';

interface IProps {
  name: string;
  color: string;
  position: ILatLng;
  disabled?: boolean;
}

const DriverName = ({ name, color, disabled, position }: IProps) => (
  <Marker
    position={position}
    opacity={disabled ? 0.6 : 1}
    icon={{
      url: generateURLFromSvgComponent(
        <BadgeMarker color={color}>{name}</BadgeMarker>,
      ),
    }}
  />
);

export default DriverName;
