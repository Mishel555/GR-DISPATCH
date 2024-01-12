import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { DriverStatusType } from '@types';

interface IProps {
  size?: number;
  status: DriverStatusType;
}

const Circle = styled.div<{ color: string; size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const DriverStatusBadge = ({ status, size = 18 }: IProps) => (
  <Circle size={size} color={status === 'online' ? COLORS.CYAN : COLORS.GREY_LIGHT} />
);

export default DriverStatusBadge;
