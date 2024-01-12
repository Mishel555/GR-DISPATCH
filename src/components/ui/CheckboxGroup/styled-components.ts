import { Checkbox, Form } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface ICheckboxStyleProps {
  rtl?: boolean;
  bordered?: boolean;
  direction?: 'horizontal' | 'vertical';
}

export const Wrapper = styled(Form.Item)`
  margin: 0;

  .ant-form-item-control-input {
    min-height: 0;
  }
`;

export const StyledCheckbox = styled(Checkbox.Group)<ICheckboxStyleProps>`
  display: ${props => props.direction === 'vertical' ? 'grid' : 'inline-flex'} !important;

  // $GREY_ULTRA_LIGHT

  .ant-checkbox {
    &::after {
      display: none;
    }
  }

  .ant-checkbox-wrapper {
    flex-direction: ${props => props.rtl ? 'row-reverse' : 'row'};

    font-size: 13px;
    color: ${COLORS.GREY_LIGHT};
    margin-inline-start: 0;
    
    padding: ${props => props.bordered ? '6px' : 0} 0;
    border-bottom: ${props => props.bordered ? `1px solid ${COLORS.GREY_ULTRA_LIGHT}` : 'none'};
    
      // margin-inline-start: ${props => props.direction === 'vertical' ? 0 : '8px'};

    span {
      &:nth-child(2) {
        position: relative;
        bottom: 2.5px;
      }
    }

    &:hover {
      .ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${COLORS.CYAN} !important;
        }
      }

      .ant-checkbox-inner {
        border-color: ${COLORS.CYAN};
      }
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      border-color: ${COLORS.CYAN};
      background-color: ${COLORS.CYAN};

      &::after {
        inset-inline-start: 6.5px;
      }
    }
  }

  .ant-checkbox-inner {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-left: ${props => props.rtl ? 8 : 0}px;
    margin-right: ${props => props.rtl ? 0 : 8}px;

    border-color: ${COLORS.GREY_ULTRA_LIGHT};
    background-color: ${COLORS.GREY_ULTRA_LIGHT};
  }`;
