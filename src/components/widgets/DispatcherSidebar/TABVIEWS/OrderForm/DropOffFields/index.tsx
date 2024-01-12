import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IDropOff, IValueLabel } from '@types';
import api from '@services/api';
import { useAppSelector, useDebounce } from '@hooks';
import { selectAppConfig } from '@selectors/configSelector';
import { FormAreaField } from '@components/ui';
import { RootWrapper, FieldWrapper, Title } from './styled-components';
import WithList from './WithList';
import WithoutList from './WithoutList';

interface IProps {
  create: boolean;
  setFormValue: (name: FormItemProps['name'], value: unknown) => void;
  outAddress?: IValueLabel[];
}

const fetchDropOffs = async (query: string, setState: Dispatch<SetStateAction<IDropOff[]>>) => {
  if (query && query.length < 3) return;

  const { data } = await api.dropOff.getAll({ query: query ? query : null });

  setState(data.result);
};

const DropOffFields = ({ create, setFormValue, outAddress }: IProps) => {
  const appConfig = useAppSelector(selectAppConfig);

  const [dropOffs, setDropOffs] = useState<IDropOff[]>([]);
  const dropOffOptions: IValueLabel[] = dropOffs.map((dropOff: IDropOff) => (
    { value: dropOff.id, label: dropOff.name }
  ));

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const onDropOffChange = (data: unknown) => {
    const dropOff = dropOffs.find(dropOff => dropOff.id === data);

    if (!dropOff) return;

    setFormValue(['dropOff', 'name'], dropOff.name);
    setFormValue(['dropOff', 'address'], dropOff.address.address);
  };

  const onSearch = (value: string) => setSearchValue(value);

  useEffect(() => {
    fetchDropOffs(debouncedSearchValue, setDropOffs);
  }, [debouncedSearchValue]);

  useEffect(() => {
    fetchDropOffs('', setDropOffs);
  }, []);

  return (
    <RootWrapper>
      <Title>Drop-Off</Title>
      <FieldWrapper>
        {appConfig?.chooseDropOffFromTheList ? (
          <WithList
            create={create}
            dropOffOptions={dropOffOptions}
            onDropOffSearch={onSearch}
            onDropOffChange={onDropOffChange}
          />
        ) : (
          <WithoutList outAddress={outAddress} />
        )}
        <FormAreaField
          gap={18}
          label="Drop-off Notes"
          name={['notes', 'dropOffNotes']}
          placeholder="Add notes"
          allowClear={false}
        />
      </FieldWrapper>
    </RootWrapper>
  );
};

export default DropOffFields;
