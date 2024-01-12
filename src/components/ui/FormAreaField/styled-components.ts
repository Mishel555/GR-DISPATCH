import { Row, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Title = styled(Typography.Paragraph)<{ size: number }>`
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
  
  margin: 0 ${props => props.size}px 0 0 !important;
`;

export const Wrapper = styled(Row)`
  width: 100%;
  flex-wrap: nowrap;
`;
