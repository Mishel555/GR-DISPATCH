import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { RootWrapper, StyledInput, StyledCol, SearchIconWrapper } from './styled-components';
import { SearchIcon } from '@components/icons';

interface IProps {
  onSearch: (search: string | null) => void;
}

const Search = ({ onSearch }: IProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.value) {
      return setSearchValue(target.value);
    }

    setSearchValue(null);
  };

  const onSearchClean = () => {
    setSearchValue(null);

    onSearch(null);
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue) {
      e.currentTarget.blur();
      onSearch(searchValue);
    }
  };

  return (
    <RootWrapper>
      <StyledCol ref={rootRef}>
        <StyledInput
          allowClear={{ clearIcon: <CloseOutlined onClick={onSearchClean} /> }}
          value={searchValue ?? ''}
          addonBefore={<SearchIconWrapper><SearchIcon /></SearchIconWrapper>}
          addonAfter={<div />}
          placeholder="Search"
          onChange={onChange}
          onKeyPress={onKeyPress}
          className="searchBar"
        />
      </StyledCol>
    </RootWrapper>
  );
};

export default Search;
