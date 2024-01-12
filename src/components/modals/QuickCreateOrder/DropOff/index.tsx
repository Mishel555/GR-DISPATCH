import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import { IDropOff, IValueLabel } from '@types';
import { COLORS } from '@constants/theme';
import { useAppSelector, useDebounce } from '@hooks';
import api from '@services/api';
import { selectAppConfig } from '@selectors/configSelector';
import { CloseIcon, NoteIcon } from '@components/icons';
import { SearchSelect, FormInputField, FormAreaField, FormAddressField, FormDateAndTimeField, CustomTooltip } from '@components/ui';
import type { PickUpType } from '../PickUp';
import { FieldWrapper, HeaderWrapper, RootWrapper, Title } from './styled-components';

interface IProps {
  name: number;
  pickUpType: PickUpType;
  allowRemove: boolean;
  remove: (index: number) => void;
  onSelectChange: (index: number, value: unknown) => void;
}

const fetchDropOffs = async (query: string, setState: Dispatch<SetStateAction<IValueLabel[]>>) => {
  if (query && query.length < 3) return;

  const { data } = await api.dropOff.getAll({ query: query ? query : null });

  setState(data.result.map((dropOff: IDropOff) => ({ value: dropOff.id, label: dropOff.name })));
};

const DropOff = ({ name, pickUpType, allowRemove, remove, onSelectChange }: IProps) => {
  const showDateFields = pickUpType === 'scheduled';
  const appConfig = useAppSelector(selectAppConfig);

  const [allowNote, setAllowNote] = useState<boolean>(false);
  const [dropOffs, setDropOffs] = useState<IValueLabel[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const onSearch = (value: string) => setSearchValue(value);

  useEffect(() => {
    fetchDropOffs(debouncedSearchValue, setDropOffs);
  }, [debouncedSearchValue]);

  const toggleNote = () => setAllowNote(true);

  return (
    <RootWrapper direction="vertical">
      <HeaderWrapper justify="space-between">
        <Title index={allowRemove ? name + 1 : 0}>Drop-Off</Title>
        {allowRemove && <CloseIcon color={COLORS.GREY_LIGHT} onClick={() => remove(name)} />}
      </HeaderWrapper>
      {showDateFields && (
        <FormDateAndTimeField
          gap={28}
          name={name}
          allowClear={false}
          label="Pick-Up Time"
          rules={[{ required: true, message: '' }]}
        />
      )}
      <FieldWrapper justify="space-between" align="middle">
        {appConfig?.chooseDropOffFromTheList ? (
          <SearchSelect
            gap={30}
            label=""
            name={[name, 'address']}
            options={dropOffs}
            placeholder="Select Drop-Off"
            onSearch={onSearch}
            rules={[{ required: true, message: '' }]}
            onChange={(data) => onSelectChange(name, data)}
          />
        ) : (
          <FormAddressField
            gap={28}
            label="Address"
            name={[name, 'address']}
            rules={[{ required: true, message: '', whitespace: true }]}
          />
        )}
        <CustomTooltip title="Add notes" arrow={false}>
          <Icon component={() => <NoteIcon />} onClick={toggleNote} />
        </CustomTooltip>
      </FieldWrapper>
      {!appConfig?.chooseDropOffFromTheList && (
        <FieldWrapper>
          <FormInputField name={[name, 'name']} label="Name" gap={45} allowClear={false} />
          <FormInputField name={[name, 'phone']} label="Phone" allowClear={false} type="number" />
        </FieldWrapper>
      )}
      {allowNote && (
        <FormAreaField name={[name, 'note']} placeholder="Add notes" allowClear={false} />
      )}
    </RootWrapper>
  );
};

export default DropOff;
