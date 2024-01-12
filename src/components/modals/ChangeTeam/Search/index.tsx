import { ChangeEvent } from 'react';
import { SearchIcon } from '@components/icons';
import { FormInput } from './styled-components';

interface IProps {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: IProps) => (
  <FormInput
    value={value}
    prefix={<SearchIcon />}
    placeholder="Some team name"
    onChange={onChange}
  />
);

export default Search;
