import { DatePickerProps } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { TimePicker, DatePicker, Switch } from '@components/ui';
import { FieldsWrapper, RootWrapper, Title } from './styled-components';

export interface IFormDateAndTimeFieldProps {
  label?: string;
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  format?: DatePickerProps['format'];
  getValueProps?: FormItemProps['getValueProps'];
  allowClear?: boolean;
  className?: string;
  gap?: number;
  readonly?: boolean;
}

const FormDateAndTimeField = ({ label, name, className, gap = 10, ...props }: IFormDateAndTimeFieldProps) => {
  const dateName: FormItemProps['name'] = [name, 'date'].flat() as FormItemProps['name'];
  const timeName: FormItemProps['name'] = [name, 'time'].flat() as FormItemProps['name'];
  const switchName: FormItemProps['name'] = [name, 'AM'].flat() as FormItemProps['name'];

  return (
    <RootWrapper justify="space-between" align="middle" className={className}>
      {!!label && <Title size={gap}>{label}</Title>}
      <FieldsWrapper>
        <DatePicker name={dateName} {...props} />
        <TimePicker name={timeName} {...props} />
        <Switch
          name={switchName}
          checkedValue="AM"
          unCheckedValue="PM"
          readonly={props.readonly}
        />
      </FieldsWrapper>
    </RootWrapper>
  );
};

export default FormDateAndTimeField;
