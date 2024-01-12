import { Space, Switch, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Wrapper = styled(Space)`
  width: 100%;
  gap: 14px !important;
`;

export const Label = styled(Typography.Text)`
  font-size: 13px;
  color: ${COLORS.GREY_LIGHT};
`;

export const StyledSwitch = styled(Switch)`
  font-size: 10px;
  font-weight: 600;
  padding: 5px;
  height: unset;

  cursor: pointer;

  background-color: ${COLORS.GREY_LIGHT};

  &:hover {
    //background-color: ${COLORS.GREY_MAIN} !important;
  }

  &.ant-switch-checked {
    background-color: ${COLORS.CYAN} !important;

    .ant-switch-handle {
      inset-inline-start: calc(100% - 27px);;
    }
  }

  .ant-switch-inner-checked {
    padding-right: 2px;
  }

  .ant-switch-inner-unchecked {
    padding-left: 2px;
  }

  .ant-switch-handle {
    width: 24px;
    height: 24px;
    top: 4px;

    inset-inline-start: 3.5px;

    &::before {
      border-radius: 12px;
    }
  }`;
