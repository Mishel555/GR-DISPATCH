import { Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const CollapseHeader = styled(Typography.Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.GREY_GAINSBORO};
`;

export const CollapseWrapper = styled(Collapse)`
  background-color: initial;

  .ant-collapse-header {
    padding: 12px 0 !important;
  }

  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;
