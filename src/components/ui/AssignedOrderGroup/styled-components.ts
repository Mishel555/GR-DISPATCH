import { Collapse } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { OrderCard } from '@components/ui';

interface IStyleProps {
  nest?: boolean;
}

export const StyledCollapse = styled(Collapse)<{ isEmpty?: boolean }>`
  background-color: initial;
`;

export const StyledOrderCard = styled(OrderCard)<IStyleProps>`
  margin-top: 8px;
  margin-left: ${props => props.nest ? 30 : 0}px;
`;

export const StyledPanel = styled(Collapse.Panel)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }

  .ant-collapse-header {
    border-radius: 15px !important;
    background-color: ${COLORS.GREY_BRIGHT} !important;
  }
`;
