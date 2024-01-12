import { Button, Row } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const FooterWrapper = styled(Row)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1500;
  
  gap: 10px;
  padding: 25px 10px 25px 14px;
  background-color: ${COLORS.WHITE};
`;

export const FooterAction = styled(Button)<{ confirm?: boolean }>`
  width: ${props => props.confirm ? 130 : 95}px;
  height: 28px;
  padding: 0;
  border-radius: 15px;
  border: 1px solid ${props => props.confirm ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT};

  font-size: 13px;
  font-weight: 600;
  color: ${props => props.confirm ? COLORS.WHITE : COLORS.GRAY_MAIN};
  background-color: ${props => props.confirm ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT};

  &:hover {
    opacity: .7;
    color: ${props => props.confirm ? COLORS.WHITE : COLORS.GREY_LIGHT} !important;
    border-color: ${props => props.confirm ? COLORS.GREY_EXTRA : COLORS.GREY_ULTRA_LIGHT} !important;
  }
`;
