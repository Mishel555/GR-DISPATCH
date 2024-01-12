import { Button, Row } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const FooterWrapper = styled(Row)`
  padding: 14px 22px 14px 0;
  gap: 10px;
`;

export const FooterAction = styled(Button)<{ confirm?: boolean }>`
  width: 95px;
  height: 28px;
  padding: 0;
  border-radius: 11px;
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
