import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IValueLabel } from '@types';
import { useDebounce } from '@hooks';
import api from '@services/api';
import { FormWrapper, RootWrapper, StyledSelect, Title } from './styled-components';

interface IProps {
  name: FormItemProps['name'];
  label?: string;
  gap?: number;
  rules?: FormItemProps['rules'];
  readonly?: boolean;
  outAddress?: IValueLabel[];
}

interface IAddress {
  address: string;
  placeId: string;
}

const fetchAddresses = async (query: string, setState: Dispatch<SetStateAction<IValueLabel[]>>) => {
  if (query.length < 3) return setState([]);

  const { data } = await api.address.getAll({ query });

  setState(data.result.map((address: IAddress) => ({ value: address.placeId, label: address.address })));
};

const FormAddressField = ({ name, label, gap = 10, rules, readonly, outAddress }: IProps) => {
  const [data, setData] = useState<IValueLabel[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const handleSearch = (newValue: string) => {
    setSearchValue(newValue);
  };

  useEffect(() => {
    fetchAddresses(debouncedSearchValue, setData);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (outAddress) {
      setData(prevState => [...prevState, ...outAddress]);
    }
  }, [outAddress]);

  return (
    <RootWrapper>
      {!!label && <Title size={gap}>{label}</Title>}
      <FormWrapper name={name} rules={rules}>
        <StyledSelect
          showSearch
          showArrow={false}
          disabled={readonly}
          // placeholder="address"
          filterOption={false}
          searchValue={searchValue}
          defaultActiveFirstOption={false}
          notFoundContent={null}
          options={data}
          onSearch={handleSearch}
        />
      </FormWrapper>
    </RootWrapper>
  );
};

export default FormAddressField;
