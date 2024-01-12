import { Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface LabelStyleProps {
  bold?: boolean;
}

export const Wrapper = styled.div<{ withName?: boolean }>`
  width: 196px;
  padding: 14px;
  border-radius: 12px;

  position: absolute;
  bottom: ${props => props.withName ? 75 : 25}px;
  left: -85px;

  background-color: ${COLORS.WHITE};
`;

export const ContentWrapper = styled(Space)`
  width: 100%;
  margin: 5px 0;
  justify-content: space-between;
`;

export const Label = styled(Typography.Paragraph)<LabelStyleProps>`
  display: ${props => props.bold ? 'inline' : 'block'};
  margin: 0 !important;

  font-size: 10px;
  font-weight: ${props => props.bold ? 700 : 400};
  color: ${COLORS.GREY_MAIN};
`;
