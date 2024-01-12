import { FormItemProps } from 'antd/lib/form/FormItem';
import { Wrapper, StyledArea } from './styled-components';

interface IProps {
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  readonly?: boolean;
  className?: string;
  allowClear?: boolean;
  placeholder?: string;
}

const FormArea = ({
  name,
  rules,
  className,
  placeholder,
  allowClear = true,
}: IProps) => (
  <Wrapper name={name} rules={rules} className={className}>
    <StyledArea placeholder={placeholder} allowClear={allowClear} />
  </Wrapper>
);

export default FormArea;
