import { Button, Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const MainContainer = styled(Row)`
  gap: 10px;
`;

export const RowGroup = styled(Space)`
  gap: 10px !important;
  height: 22.8px;
`;

export const Wrapper = styled(Space)`
`;

export const Title = styled(Typography.Paragraph)<{ hover?: boolean }>`
  position: relative;
  
  width: 100%;
  max-width: 200px;
  margin: 0 !important;

  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  &::after {
    width: ${props => props.hover ? 100 : 0}%;
    height: 0.5px;
    transition: .2s ease-in-out;
    background-color: ${COLORS.GREY_MAIN};

    position: absolute;
    bottom: 0.5px;
    left: 0;
  
    content: 'asdasdassad';
  }
`;

export const DateTime = styled(Typography.Paragraph)<{ alert?: boolean }>`
  margin: 0 !important;

  font-size: 13px;
  font-weight: 600;
  color: ${props => props.alert ? COLORS.RED_LIGHT : COLORS.GREY_LIGHT};
`;

export const CopyButton = styled(Button)`
  width: 12px;
  height: 11px;
  padding: 0;
`;
