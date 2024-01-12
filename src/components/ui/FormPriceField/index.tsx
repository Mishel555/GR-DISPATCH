import { FormItemProps } from 'antd/lib/form/FormItem';
import { Wrapper, Title, FormWrapper, StyledInputNumber } from './styled-components';

export interface IFormPriceFieldProps {
  min?: number;
  max?: number;
  label?: string;
  controls?: boolean;
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  allowClear?: boolean;
  gap?: number;
  placeholder?: string;
  readonly?: boolean;
}

const FormPriceField = ({
  min,
  max,
  name,
  label,
  rules,
  controls,
  gap = 10,
  readonly,
  placeholder,
}: IFormPriceFieldProps) => (
  <Wrapper align="middle">
    {!!label && <Title size={gap}>{label}</Title>}
    <FormWrapper name={name} rules={rules}>
      <StyledInputNumber
        min={min}
        max={max}
        type="number"
        readOnly={readonly}
        controls={controls}
        placeholder={placeholder}
        addonAfter="$"
      />
    </FormWrapper>
  </Wrapper>
);

export default FormPriceField;
