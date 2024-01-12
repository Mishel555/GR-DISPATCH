import { FormDateAndTimeField, FormInputField } from '@components/ui';
import { RootWrapper } from './styled-components';

const DateFields = () => (
  <RootWrapper>
    <FormInputField name="number" label="Order Number" gap={22} />
    <FormDateAndTimeField
      readonly
      gap={22}
      label="Order Created"
      name={['timestamps', 'createdTime']}
      rules={[{ required: true, message: '' }]}
    />

    <FormDateAndTimeField
      gap={50}
      label="Pickup by"
      name={['timestamps', 'pickupBy']}
      rules={[{ required: true, message: '' }]}
    />

    <FormDateAndTimeField gap={43} label="Delivery by" name={['timestamps', 'deliverBy']} />
  </RootWrapper>
);

export default DateFields;
