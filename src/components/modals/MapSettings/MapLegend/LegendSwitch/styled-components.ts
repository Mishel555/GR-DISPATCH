import { Button, Space } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const SwitchWrapper = styled(Space)`
  width: fit-content;
  margin: 15px 0;
  border-radius: 11px;
  background-color: ${COLORS.GREY_ULTRA_LIGHT};
`;

export const SwitchButton = styled(Button)<{ active?: boolean }>`
  height: 25px;
  padding: 0 ${props => props.active ? 32 : 15}px;

  font-size: 10px;
  font-weight: 600;
  color: ${props => props.active ? COLORS.WHITE : COLORS.GREY_MAIN};

  border-radius: 11px;
  border: 1px solid ${props => props.active ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT};
  background-color: ${props => props.active ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT};

  &:hover {
    color: ${props => props.active ? COLORS.WHITE : COLORS.CYAN} !important;
    border: 1px solid ${props => props.active ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT} !important;
    background-color: ${props => props.active ? COLORS.CYAN : COLORS.GREY_ULTRA_LIGHT} !important;
  }
`;
