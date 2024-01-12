import styled from 'styled-components';
import { Button, Card } from 'antd';
import { hexToRgbString } from '@utils';
import { COLORS } from '@constants/theme';
import { DndSortableLayoutItem } from '@components/layouts';
import RouteCard from '../RouteCard';

interface IWrapperProps {
  active?: boolean;
}

export const Wrapper = styled(Card)<IWrapperProps>`
  overflow: hidden;
  border-radius: 26px !important;
  border: ${props => props.active ? '1px solid' : 'none'};
  box-shadow: 0 4px 30px rgba(${hexToRgbString(COLORS.BLACK)}, 0.08) !important;

  .ant-card-body {
    padding: 20px 0;
  }
  
  .ant-card-head {
    border-color: ${COLORS.GREY_ULTRA_LIGHT};
  }
`;

export const StyledRouteCard = styled(RouteCard)`
  border: none !important;
  box-shadow: none !important;
`;

export const StyledDndLayoutItem = styled(DndSortableLayoutItem)<{ last?: boolean }>`
  border-radius: 17px;
  margin-bottom: ${props => props.last ? 0 : '15px'};
  padding: 0 18px 0 0 !important;
  background-color: ${COLORS.WHITE};
`;

export const SendButton = styled(Button)`
  width: 80px;
  height: 28px;
  
  font-size: 13px;
  font-weight: 600;
  
  border-radius: 26px;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.GREY_LIGHT};
  
  &:hover {
    opacity: .8;
    color: ${COLORS.WHITE} !important;
    border-color: ${COLORS.GREY_LIGHT} !important;
    background-color: ${COLORS.GREY_LIGHT} !important;
  }
`;
