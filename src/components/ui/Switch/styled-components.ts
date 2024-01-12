import { Form, Switch } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface IStyleProps {
  disabled?: boolean;
}

export const Wrapper = styled(Form.Item)`
  width: 100%;
  margin: 0;
`;

export const StyledSwitch = styled(Switch)<IStyleProps>`
  font-size: 10px;
  font-weight: 600;
  padding: 5px;
  height: unset;

  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  background-color: ${COLORS.GREY_LIGHT};

  &.ant-switch-checked {
    background-color: ${COLORS.GREY_LIGHT} !important;

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
  }
`;
