import { Form, Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { IValueLabel } from '@types';
import { COLORS } from '@constants/theme';

interface IProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  options: IValueLabel[];
  className?: string;
  onChange?: (e: RadioChangeEvent) => void;
}

const Wrapper = styled(Form.Item)`
  margin: 0;
  
  .ant-form-item-control-input {
    min-height: 0;
  }
`;

const StyledRadio = styled(Radio.Group)`
  .ant-radio-wrapper {
    font-size: 13px;
    color: ${COLORS.GREY_LIGHT};
    margin-right: 8px;

    &:hover {
      .ant-radio-inner {
        border-color: ${COLORS.CYAN};
      }
    }
  }

  .ant-radio-checked {
    .ant-radio-inner {
      border-color: ${COLORS.CYAN};
      background-color: ${COLORS.CYAN};

      &::after {
        width: 30px;
        height: 30px;

        margin-block-start: -15px;
        margin-inline-start: -15px;
      }
    }
  }

  .ant-radio-inner {
    width: 24px;
    height: 24px;
    margin-right: 8px;

    border-color: ${COLORS.GREY_ULTRA_LIGHT};
    background-color: ${COLORS.GREY_ULTRA_LIGHT};
  }
`;

const RadioGroup = ({ name, defaultValue, className, ...props }: IProps) => (
  <Wrapper name={name} initialValue={defaultValue} className={className}>
    <StyledRadio {...props} defaultValue={defaultValue} />
  </Wrapper>
);

export default RadioGroup;
