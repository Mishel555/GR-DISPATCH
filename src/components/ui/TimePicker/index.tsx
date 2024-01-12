import { FormItemProps } from 'antd/lib/form/FormItem';
import { Wrapper, StyledInput } from './styled-components';

interface IProps {
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  className?: string;
  readonly?: boolean;
}

// todo => fixme
const TimePicker = ({ name, rules, readonly, className }: IProps) => (
  <Wrapper name={name} rules={rules} className={className}>
    <StyledInput
      placeholder="__:__"
      disabled={readonly}
    />
  </Wrapper>
);


export default TimePicker;
