import { FormInstance } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IPickUp, IValueLabel } from '@types';
import { useDebounce } from '@hooks';
import api from '@services/api';
import { FormInputField, FormAreaField, SearchSelect } from '@components/ui';
import { RootWrapper, FieldWrapper, Title } from './styled-components';

interface IProps {
  setFormValue: (name: FormItemProps['name'], value: unknown) => void;
  getFormValue: FormInstance['getFieldValue'];
}

const fetchPickUps = async (query: string, setState: Dispatch<SetStateAction<IPickUp[]>>) => {
  if (query && query.length < 3) return;

  const { data } = await api.pickUp.getAll({ query: query ? query : null });

  setState(data.result);
};

const PickUpFields = ({ getFormValue, setFormValue }: IProps) => {
  const defaultPickup = getFormValue(['pickup', 'id']);

  const [pickUps, setPickUps] = useState<IPickUp[]>([]);
  const pickUpOptions: IValueLabel[] = pickUps.map(pickUp => ({ value: pickUp.id, label: pickUp.name }));

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const onPickUpSearch = (value: string) => setSearchValue(value);

  const onPickUpChange = (data: unknown) => {
    const pickup = pickUps.find(pickUp => pickUp.id === data);

    if (!pickup) return;

    setFormValue(['pickup', 'id'], pickup.id);
    setFormValue(['pickup', 'address'], pickup.address.address);
  };

  useEffect(() => {
    fetchPickUps(debouncedSearchValue, setPickUps);
  }, [debouncedSearchValue]);

  useEffect(() => {
    fetchPickUps('', setPickUps);
  }, []);

  return (
    <RootWrapper>
      <Title>Pick-Up</Title>
      <FieldWrapper direction="vertical">
        <SearchSelect
          gap={71}
          label="Name"
          options={pickUpOptions}
          name={['pickup', 'id']}
          rules={[{ required: true, message: '' }]}
          placeholder="Select Pick-Up"
          defaultValue={defaultPickup}
          onSearch={onPickUpSearch}
          onChange={onPickUpChange}
        />
        <FormInputField gap={56} label="Address" name={['pickup', 'address']} allowClear={false} readonly />
        <FormAreaField
          gap={18}
          label="Pick-up Notes"
          name={['notes', 'pickupNotes']}
          placeholder="Add notes"
          allowClear={false}
        />
      </FieldWrapper>
    </RootWrapper>
  );
};

export default PickUpFields;
