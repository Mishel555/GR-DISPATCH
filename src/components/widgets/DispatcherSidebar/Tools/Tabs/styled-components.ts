import { Col, Segmented } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const StyledTabs = styled(Segmented)<{ count?: number }>`
  background-color: inherit;

  .ant-segmented-group {
  }

  .ant-segmented-item {
    color: ${COLORS.GREY_MAIN};

    &:hover {
      color: ${COLORS.GREY_LIGHT} !important;

      &:after {
        display: none;
      }
    }
  }

  .ant-segmented-item-selected {
    box-shadow: none;
    position: relative;
    color: ${COLORS.CYAN};

    &:before {
      content: '';
      width: 50%;
      height: 2px;
      margin: auto;
      background-color: ${COLORS.CYAN};

      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .ant-segmented-item-label {
    position: relative;

    font-size: 13px;
    font-weight: 600;
  }

  .ant-segmented-thumb {
    box-shadow: none;
    background: transparent;
  }
`;

export const PlusWrapper = styled(Col)`
  padding-right: 16px;
`;
