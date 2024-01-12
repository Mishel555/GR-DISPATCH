import { IValueLabel } from '@types';
import { CheckboxGroup } from '@components/ui';
import { RootWrapper } from './styled-components';

const FLAGS1: IValueLabel[] = [
  { label: 'Contactless Delivery', value: 'contactlessDelivery' },
  { label: 'Catering', value: 'catering' },
];

const AdditionalOptions = () => (
  <RootWrapper direction="vertical">
    <CheckboxGroup name="FLAGS1" options={FLAGS1} rtl />
  </RootWrapper>
);

export default AdditionalOptions;
