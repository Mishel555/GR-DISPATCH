import { Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface LabelStyleProps {
  bold?: boolean;
}

export const ContentWrapper = styled(Space)`
  width: 100%;
  margin: 5px 0;
`;

export const Label = styled(Typography.Paragraph)<LabelStyleProps>`
  display: ${props => props.bold ? 'inline' : 'block'};
  margin: 0 !important;

  font-size: 10px;
  font-weight: ${props => props.bold ? 700 : 400};
  color: ${COLORS.GREY_MAIN};
`;
