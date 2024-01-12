import { Space, Row, Typography } from 'antd';
import styled from 'styled-components';
import { DriverStatusType } from '@types';
import { COLORS } from '@constants/theme';

export const CardWrapper = styled(Row)`
  transition: .3s ease-in-out;
  
  &:hover {
    opacity: .7;
  }
`;

export const CardGroup = styled(Space)`
  gap: 12px !important;
`;

export const Title = styled(Typography.Text)`
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
`;

export const Status = styled(Typography.Text)<{ status: DriverStatusType }>`
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.status === 'online' ? COLORS.CYAN : COLORS.GREY_SLIVER};
`;

export const Distance = styled(Typography.Text)`
  font-size: 13px;
  color: ${COLORS.GREY_LIGHT};
`;
