import { CloseOutlined } from '@ant-design/icons';
import type { FormItemProps } from 'antd/lib/form/FormItem';
import { StyledInput, Wrapper } from './styled-components';

interface IProps {
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  validateTrigger?: FormItemProps['validateTrigger'];
  allowClear?: boolean;
  className?: string;
  type?: 'text' | 'number';
  placeholder?: string;
  readonly?: boolean;
  inputWidth?: number;
}

const FormInput = ({
  name,
  rules,
  placeholder,
  validateTrigger,
  allowClear = true,
  type = 'text',
  readonly,
  className,
  inputWidth,
}: IProps) => (
  <Wrapper name={name} rules={rules} width={inputWidth} validateTrigger={validateTrigger} className={className}>
    <StyledInput
      type={type}
      readOnly={readonly}
      placeholder={placeholder}
      allowClear={allowClear ? { clearIcon: <CloseOutlined /> } : allowClear}
    />
  </Wrapper>
);

export default FormInput;
