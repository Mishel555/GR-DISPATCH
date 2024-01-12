import { Button, Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const FooterWrapper = styled(Row)`
  padding: 20px 20px;
  border-top: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
  gap: 10px;
`;

export const ActionWrapper = styled(Space)`
  gap: 6px !important;
`;

export const FooterAction = styled(Button)<{ confirm?: boolean }>`
  width: 95px;
  height: 28px;
  padding: 0;
  border-radius: 15px;
  border: 1px solid ${props => props.confirm ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT};

  font-size: 13px;
  font-weight: 600;

  color: ${props => props.confirm ? COLORS.WHITE : COLORS.GRAY_MAIN};
  background-color: ${props => props.confirm ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT};

  &:hover {
    color: ${props => props.confirm ? COLORS.WHITE : COLORS.GREY_LIGHT} !important;
    border-color: ${props => props.confirm ? COLORS.GREY_EXTRA : COLORS.GREY_ULTRA_LIGHT} !important;
    opacity: .7;
  }
`;

export const Label = styled(Typography.Text)`
  font-size: 13px;
  color: ${COLORS.GREY_SILVER};
`;
