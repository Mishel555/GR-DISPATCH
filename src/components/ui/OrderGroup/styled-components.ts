import { Collapse } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { OrderCard } from '@components/ui';
import AssignedOrderGroup from '../AssignedOrderGroup';

export const StyledCollapse = styled(Collapse)<{ isEmpty?: boolean }>`
  background-color: initial;
`;

export const StyledOrderCard = styled(OrderCard)`
  margin-top: 8px;
`;

export const StyledAssignedOrderGroup = styled(AssignedOrderGroup)`
  margin-top: 8px;
`;

export const StyledPanel = styled(Collapse.Panel)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }

  .ant-collapse-header {
    padding: 8px 20px !important;
    border-radius: 26px !important;
    background-color: ${COLORS.GREY_MAIN};
  }

  &.disabled {
    cursor: not-allowed !important;

    .ant-collapse-header {
      pointer-events: none;
    }
  }
`;
