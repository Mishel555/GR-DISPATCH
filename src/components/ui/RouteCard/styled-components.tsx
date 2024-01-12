import styled from 'styled-components';
import { Col, Row, Space, Typography } from 'antd';
import { hexToRgbString } from '@utils';
import { COLORS } from '@constants/theme';

interface IWrapperProps {
  active?: boolean;
}

export const Wrapper = styled(Row)<IWrapperProps>`
  width: 100%;
  padding: 10px 18px;

  flex-wrap: nowrap;
  box-shadow: 0 5px 15px rgba(${hexToRgbString(COLORS.BLACK)}, 0.1);
`;

export const Label = styled(Typography.Text)<{ date?: boolean; bold?: boolean }>`
  font-size: 13px;
  font-weight: ${props => props.date ? 400 : 600};
  color: ${props => props.bold ? COLORS.GREY_MAIN : COLORS.GREY_LIGHT};
`;

export const DetailsWrapper = styled(Space)`
  flex: 1;
`;

export const MetaWrapper = styled(Col)`
`;
