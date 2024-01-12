import { FormItemProps } from 'antd/lib/form/FormItem';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { IValueLabel } from '@types';
import { Wrapper, StyledCheckbox } from './styled-components';

export interface ICheckboxGroupProps {
  name?: FormItemProps['name'];
  options: IValueLabel[];
  direction?: 'vertical' | 'horizontal';
  values?: string[];
  className?: string;
  defaultValues?: string[];
  rtl?: boolean;
  bordered?: boolean;
  onChange?: (e: CheckboxValueType[]) => void;
}

const CheckboxGroup = ({ name, defaultValues, className, ...props }: ICheckboxGroupProps) => (
  <Wrapper name={name} initialValue={defaultValues} className={className}>
    <StyledCheckbox
      {...props}
      value={props.values}
      defaultValue={props.values}
    />
  </Wrapper>
);

export default CheckboxGroup;
