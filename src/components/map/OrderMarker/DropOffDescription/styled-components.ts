import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Wrapper = styled.div<{ onDot?: boolean }>`
  width: 170px;
  padding: 14px;
  border-radius: 12px;

  position: absolute;
  bottom: ${props => props.onDot ? 30 : 55}px;
  left: -85px;

  background-color: ${COLORS.WHITE};
`;

export const BoldText = styled(Typography.Paragraph)`
  display: inline;
  margin: 0 !important;

  font-size: 10px;
  font-weight: 700;
  color: ${COLORS.GREY_MAIN};
`;

export const Address = styled(Typography.Paragraph)`
  font-size: 10px;
  color: ${COLORS.GREY_MAIN};
  margin: 0 0 10px 0 !important;
`;
