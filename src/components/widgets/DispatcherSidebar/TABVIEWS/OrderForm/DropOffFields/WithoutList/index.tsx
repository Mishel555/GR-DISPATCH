import { Fragment } from 'react';
import { IValueLabel } from '@types';
import { FormAddressField, FormInputField } from '@components/ui';

interface IProps {
  outAddress?: IValueLabel[];
}

const WithoutList = ({ outAddress }: IProps) => (
  <Fragment>
    <FormInputField name={['dropOff', 'name']} label="Name" gap={71} allowClear={false} />
    <FormAddressField
      gap={56}
      label="Address"
      name={['dropOff', 'address']}
      rules={[{ required: true, message: '' }]}
      outAddress={outAddress}
    />
    <FormInputField name={['dropOff', 'phone']} label="Phone" gap={67} allowClear={false} type="number" />
    <FormInputField name={['dropOff', 'email']} label="Email" gap={73} allowClear={false} />
  </Fragment>
);

export default WithoutList;
