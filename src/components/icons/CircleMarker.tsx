import { IIconDefaultProps } from '@types';

interface IProps extends IIconDefaultProps {
  marginBottom?: number;
}

const CircleMarkerIcon = ({ color = '#29CCFF', marginBottom = 0 }: IProps) => (
  <svg width="20" height={20 + marginBottom} viewBox={`0 0 20 ${20 + marginBottom}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" fill={color} stroke="white" strokeWidth="4" />
  </svg>
);

export default CircleMarkerIcon;
