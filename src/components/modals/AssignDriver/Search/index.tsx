import { ChangeEvent } from 'react';
import { SearchIcon } from '@components/icons';
import { FormInput } from './styled-components';

interface IProps {
  value: string;
  alert?: boolean;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  handleRecommendation: (value: boolean) => void;
}

const Search = ({ value, handleRecommendation, alert, onChange }: IProps) => (
  <FormInput
    alert={alert}
    value={value}
    prefix={<SearchIcon />}
    placeholder="Select Driver"
    onFocus={() => handleRecommendation(true)}
    onChange={onChange}
  />
);

export default Search;
