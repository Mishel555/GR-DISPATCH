import { Collapse } from 'antd';
import styled from 'styled-components';
import { OrderCardType } from '@types';
import { COLORS } from '@constants/theme';
import { hexToRgbString } from '@utils';

interface IStyleProps {
  active?: boolean;
  type?: OrderCardType;
  nested?: boolean;
}

const COLLAPSE_BACKGROUND_COLORS = {
  warning: `rgba(${hexToRgbString(COLORS.YELLOW)}, 0.2)`,
  danger: `rgba(${hexToRgbString(COLORS.RED_LIGHT)}, 0.2)`,
};

const getBackgroundColor = (props: IStyleProps) => {
  if (props.nested) {
    return COLORS.WHITE;
  }

  if (props.type) {
    return COLLAPSE_BACKGROUND_COLORS[props.type];
  }

  return COLORS.WHITE;
};

export const CollapseWrapper = styled(Collapse)<IStyleProps>`
  border: ${props => props.active ? `1px solid ${COLORS.GREY_LIGHT}` : 'none'};
  border-radius: 26px !important;
  box-shadow: 0 4px 30px rgba(${hexToRgbString(COLORS.WHITE)}, 0.08);

  background-color: ${(props) => getBackgroundColor(props)} !important;

  .main-order-card {
    .ant-collapse-content-box {
      padding: 0 !important;
    }

    .ant-collapse-header {
      margin-top: 5px;
      padding: 8px 20px !important;
      background-color: ${(props) => getBackgroundColor(props)} !important;
      border-bottom: 1px solid ${COLORS.GREY_ULTRA_LIGHT} !important;
    }
  }
`;

export const StyledPanel = styled(Collapse.Panel)<IStyleProps>`
  
`;
