import { Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const GroupWrapper = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;

export const Title = styled(Typography.Text)`
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GRAY_MAIN};
`;

export const LegendWrapper = styled(Space)`
  margin-top: 15px;

  width: 100%;
  gap: 14px !important;
`;
