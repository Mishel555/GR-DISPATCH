import { ILatLng } from '@types';
import { CustomMarker } from '@components/ui';
import { Wrapper, Address, BoldText } from './styled-components';

interface IProps {
  position: ILatLng;
  name: string;
  address?: string;
}

const PickUpDescription = ({ name, position, address }: IProps) => (
  <CustomMarker position={position}>
    <Wrapper>
      <BoldText>{name}</BoldText>
      <Address>{address}</Address>
    </Wrapper>
  </CustomMarker>
);

export default PickUpDescription;
