import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IPickUp, IValueLabel } from '@types';
import api from '@services/api';
import { useDebounce } from '@hooks';
import { RadioGroup } from '@components/ui';
import { RootWrapper, RadioWrapper, Title, StyledSearchSelect } from './styled-components';

export type PickUpType = 'asap' | 'scheduled';

interface IProps {
  onPickUpChange: (data: unknown) => void;
}

const PICK_UP_OPTIONS: IValueLabel[] = [
  { value: 'asap', label: 'ASAP' },
  { value: 'scheduled', label: 'Scheduled order' },
];

const fetchPickUps = async (query: string, setState: Dispatch<SetStateAction<IValueLabel[]>>) => {
  if (query && query.length < 3) return;

  const { data } = await api.pickUp.getAll({ query: query ? query : null });

  setState(data.result.map((pickUp: IPickUp) => ({ value: pickUp.id, label: pickUp.name })));
};

const PickUp = ({ onPickUpChange }: IProps) => {
  const [pickUps, setPickUps] = useState<IValueLabel[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const onSearch = (value: string) => setSearchValue(value);

  useEffect(() => {
    fetchPickUps(debouncedSearchValue, setPickUps);
  }, [debouncedSearchValue]);

  return (
    <RootWrapper>
      <Title>Pick-Up</Title>
      <StyledSearchSelect
        name="pickUp"
        options={pickUps}
        placeholder="Select Pick-Up"
        rules={[{ required: true, message: '' }]}
        onSearch={onSearch}
        onChange={onPickUpChange}
      />
      <RadioWrapper>
        <RadioGroup name="pickUpType" defaultValue={PICK_UP_OPTIONS[0].value} options={PICK_UP_OPTIONS} />
      </RadioWrapper>
    </RootWrapper>
  );
};

export default PickUp;
