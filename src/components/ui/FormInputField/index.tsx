import { FormItemProps } from 'antd/lib/form/FormItem';
import { Wrapper, Title } from './styled-components';
import FormInput from './FormInput';

export interface IFormInputFieldProps {
  label?: string;
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  validateTrigger?: FormItemProps['validateTrigger'];
  allowClear?: boolean;
  gap?: number;
  inputWidth?: number;
  type?: 'text' | 'number';
  placeholder?: string;
  readonly?: boolean;
}

const FormInputField = ({
  type,
  name,
  label,
  rules,
  gap = 10,
  inputWidth,
  validateTrigger,
  readonly,
  allowClear,
  placeholder,
}: IFormInputFieldProps) => (
  <Wrapper align="middle">
    {!!label && <Title size={gap}>{label}</Title>}

    <FormInput
      type={type}
      name={name}
      rules={rules}
      validateTrigger={validateTrigger}
      inputWidth={inputWidth}
      readonly={readonly}
      allowClear={allowClear}
      placeholder={placeholder}
    />
  </Wrapper>
);

export default FormInputField;
