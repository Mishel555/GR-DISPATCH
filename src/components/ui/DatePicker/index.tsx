import { DatePickerProps } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { Wrapper, StyledDatePicker } from './styled-components';

interface IProps {
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  format?: DatePickerProps['format'];
  getValueProps?: FormItemProps['getValueProps'];
  allowClear?: boolean;
  className?: string;
  placeholder?: string;
  readonly?: boolean;
}

const DatePicker = ({ name, rules, allowClear, format, getValueProps, readonly, className }: IProps) => (
  <Wrapper name={name} rules={rules} className={className} getValueProps={getValueProps}>
    <StyledDatePicker
      suffixIcon={null}
      allowClear={allowClear}
      placeholder="___/___/___"
      format={format}
      disabled={readonly}
    />
  </Wrapper>
);


export default DatePicker;
