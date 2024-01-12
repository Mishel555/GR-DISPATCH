import { ReactNode } from 'react';
import { OverlayView } from '@react-google-maps/api';
import { ILatLng } from '@types';

interface IProps {
  position: ILatLng;
  children: ReactNode | ReactNode[];
}

const CustomMarker = ({ position, children }: IProps) => (
  <OverlayView mapPaneName="floatPane" position={position}>
    {children}
  </OverlayView>
);

export default CustomMarker;
