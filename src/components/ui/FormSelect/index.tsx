import { FormItemProps } from 'antd/lib/form/FormItem';
import { IValueLabel } from '@types';
import { CaretArrowIcon } from '@components/icons';
import { Title, RootWrapper, FormWrapper, StyledSelect } from './styled-components';

interface IProps {
  label?: string;
  options: IValueLabel[];
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  gap?: number;
  placeholder?: string;
  readonly?: boolean;
}

const FormSelect = ({ name, rules, options, placeholder, readonly, label, gap = 10 }: IProps) => (
  <RootWrapper align="middle">
    {!!label && <Title size={gap}>{label}</Title>}
    <FormWrapper name={name} rules={rules}>
      <StyledSelect
        showArrow
        options={options}
        readOnly={readonly}
        placeholder={placeholder}
        suffixIcon={<CaretArrowIcon direction="top" />}
      />
    </FormWrapper>
  </RootWrapper>
);

export default FormSelect;
