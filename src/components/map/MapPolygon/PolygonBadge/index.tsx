import { ILatLng } from '@types';
import { CustomMarker } from '@components/ui';
import { Label, Wrapper, Circle } from './styled-components';

interface IProps {
  label: string;
  color: string;
  position: ILatLng;
}

const PolygonBadge = ({ label, color, position }: IProps) => (
  <CustomMarker position={position}>
    <Wrapper>
      <Circle color={color} />
      <Label>{label}</Label>
    </Wrapper>
  </CustomMarker>
);

export default PolygonBadge;
