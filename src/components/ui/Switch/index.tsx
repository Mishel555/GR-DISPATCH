import { StyledSwitch, Wrapper } from './styled-components';
import { FormItemProps } from 'antd/lib/form/FormItem';

interface IProps {
  name: FormItemProps['name'];
  checkedValue?: string;
  unCheckedValue?: string;
  rules?: FormItemProps['rules'];
  className?: string;
  readonly?: boolean;
}

const Switch = ({ name, rules, checkedValue, unCheckedValue, readonly, className }: IProps) => (
  <Wrapper name={name} rules={rules} className={className}>
    <StyledSwitch
      disabled={readonly}
      checkedChildren={checkedValue}
      unCheckedChildren={unCheckedValue}
    />
  </Wrapper>
);

export default Switch;
