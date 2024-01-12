import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Label = styled(Typography.Paragraph)`
  margin: 0 !important;
  color: ${COLORS.WHITE};
  font-size: 13px;
  
`;

export const Wrapper = styled.div`
  padding: 8px 26px;
  display: flex;
  gap: 10px;
  border-radius: 26px;
  background-color: ${COLORS.YELLOW};
`;
