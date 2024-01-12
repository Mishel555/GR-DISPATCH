import { Divider, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const GroupWrapper = styled(Space)`
  width: 100%;
  margin-top: 14px;
  gap: 18px !important;
`;

export const Title = styled(Typography.Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.GREY_GAINSBORO};
`;

export const StyledDivider = styled(Divider)`
  margin: 0;
  border-color: ${COLORS.GREY_ULTRA_LIGHT};
`;
