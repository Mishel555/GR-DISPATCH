import { Button, Space } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { hexToRgbString } from '@utils';

export const TeamsWrapper = styled(Space)`
  width: 100%;
  max-height: 300px;
  margin-top: 15px;
  border-bottom: 1px solid ${COLORS.GREY_ULTRA_LIGHT};

  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 20px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${COLORS.GREY_MAIN};
  }

  gap: 5px !important;
`;

export const TeamButton = styled(Button)`
  width: 100%;
  height: 26px;

  margin: 0;
  padding: 0;
  border-radius: 0;

  font-size: 13px;
  font-weight: 600;
  text-align: left;
  color: ${COLORS.GREY_MAIN};

  background-color: ${COLORS.WHITE} !important;

  &:hover {
    color: ${COLORS.BLACK} !important;
    background-color: ${COLORS.GREY_EXTRA_LIGHT} !important;
  }

  &:active {
    background-color: ${`rgba(${hexToRgbString(COLORS.CYAN)}, 0.3)`} !important;
  }
`;
