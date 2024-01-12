import { Button, Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Container = styled(Row)`
  width: 380px;
  gap: 20px !important;
`;

export const Header = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

export const Wrapper = styled(Row)`
  width: 100%;
`;

export const Title = styled(Typography.Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
`;

export const DetailTitle = styled(Typography.Paragraph)`
  font-size: 10px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
`;

export const DetailWrapper = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

export const DetailLabel = styled(Typography.Text)<{ bold?: boolean }>`
  font-size: 10px;
  color: ${COLORS.GREY_LIGHT};
  font-weight: ${props => props.bold ? 600 : 400};
`;

export const OkButton = styled(Button)`
  min-width: 95px;
  height: 28px;
  padding: 0;

  border-radius: 15px;
  border: 1px solid ${COLORS.GREY_ULTRA_LIGHT};

  font-size: 13px;
  font-weight: 600;

  color: ${COLORS.GRAY_MAIN};
  background-color: ${COLORS.GREY_ULTRA_LIGHT};

  &:hover {
    color: ${COLORS.GREY_LIGHT} !important;
    border-color: ${COLORS.GREY_ULTRA_LIGHT} !important;
    opacity: .7;
  }`;
