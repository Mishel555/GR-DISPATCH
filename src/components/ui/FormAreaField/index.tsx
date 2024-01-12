import { FormItemProps } from 'antd/lib/form/FormItem';
import { Wrapper, Title } from './styled-components';
import FormArea from './FormArea';

interface IProps {
  gap?: number;
  label?: string;
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  readonly?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

const FormAreaField = ({
  name,
  label,
  rules,
  gap = 10,
  readonly,
  allowClear,
  placeholder,
}: IProps) => (
  <Wrapper>
    {!!label && <Title size={gap}>{label}</Title>}
    <FormArea
      name={name}
      rules={rules}
      readonly={readonly}
      allowClear={allowClear}
      placeholder={placeholder}
    />
  </Wrapper>
);

export default FormAreaField;
