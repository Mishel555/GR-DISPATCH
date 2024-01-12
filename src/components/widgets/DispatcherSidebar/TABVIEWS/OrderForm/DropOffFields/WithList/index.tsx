import { Fragment } from 'react';
import { IValueLabel } from '@types';
import { CheckboxGroup, FormAddressField, FormInputField, SearchSelect } from '@components/ui';

interface IProps {
  create: boolean;
  dropOffOptions: IValueLabel[];
  onDropOffSearch: (searchValue: string) => void;
  onDropOffChange: (data: unknown) => void;
}

const OPTIONS: IValueLabel[] = [
  { label: 'Create Drop-off', value: 'createDropoff' },
];

const WithList = ({ create, dropOffOptions, onDropOffChange, onDropOffSearch }: IProps) => (
  <Fragment>
    <CheckboxGroup name={['dropOff', 'create']} options={OPTIONS} />
    <SearchSelect
      gap={71}
      label="Name"
      name={['dropOff', 'name']}
      options={dropOffOptions}
      placeholder="Select Drop-Off"
      rules={[{ required: true, message: '' }]}
      onSearch={onDropOffSearch}
      onChange={onDropOffChange}
    />
    <FormAddressField
      gap={56}
      name={['dropOff', 'address']}
      rules={[{ required: true, message: '' }]}
      label="Address"
      readonly
    />
    {create && (
      <Fragment>
        <FormInputField name={['dropOff', 'phone']} label="Phone" gap={67} allowClear={false} type="number" />
        <FormInputField name={['dropOff', 'email']} label="Email" gap={73} allowClear={false} />
      </Fragment>
    )}
  </Fragment>
);

export default WithList;
