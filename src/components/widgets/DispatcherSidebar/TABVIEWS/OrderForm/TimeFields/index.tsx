import { FormDateAndTimeField } from '@components/ui';
import { IFormDateAndTimeFieldProps } from '@components/ui/FormDateAndTimeField';
import DistanceFields from './DistanceFields';
import { RootWrapper } from './styled-components';

const createDateField = (name: string, label: string, gap: number): IFormDateAndTimeFieldProps => ({
  gap,
  name,
  label,
  readonly: true,
  allowClear: false,
});

const DATE_FIELDS: IFormDateAndTimeFieldProps[] = [
  createDateField('pickupETA', 'Pick up ETA', 38),
  createDateField('dropOffETA', 'Drop off ETA', 33),
];

const TimeFields = () => (
  <RootWrapper>
    <DistanceFields />
    {DATE_FIELDS.map((field) => (
      <FormDateAndTimeField key={field.label} {...field} />
    ))}
  </RootWrapper>
);

export default TimeFields;
