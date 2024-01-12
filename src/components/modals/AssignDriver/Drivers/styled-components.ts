import { Button, Space } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const DriversWrapper = styled(Space)`
  width: 100%;
  max-height: 330px;
  margin-top: 15px;
  padding-bottom: 26px;
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

  gap: 10px !important;
`;

export const DriverButton = styled(Button)`
  width: 100%;
  margin: 0;
  padding: 0;
`;
