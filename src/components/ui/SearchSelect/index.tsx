import { useState } from 'react';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IValueLabel } from '@types';
import { COLORS } from '@constants/theme';
import { CaretArrowIcon, SearchIcon } from '@components/icons';
import { RootWrapper, FormWrapper, IconWrapper, Title, StyledSelect } from './styled-components';

interface IProps {
  gap?: number;
  label?: string;
  options: IValueLabel[];
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
  placeholder?: string;
  className?: string;
  defaultValue?: unknown;
  onChange: (value: unknown) => void;
  onSearch: (value: string) => void;
}

const SearchSelect = ({
  name,
  rules,
  options,
  label,
  gap = 10,
  className,
  placeholder,
  defaultValue,
  onSearch,
  onChange,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen(prevState => !prevState);

  return (
    <RootWrapper className={className}>
      {!!label && <Title size={gap}>{label}</Title>}
      <FormWrapper name={name} rules={rules}>
        <IconWrapper direction="left" component={() => <SearchIcon color={COLORS.GREY_SILVER} />} />
        <StyledSelect
          showSearch
          open={open}
          showArrow={false}
          filterOption={false}
          options={options}
          placeholder={placeholder}
          notFoundContent={null}
          defaultValue={defaultValue}
          defaultActiveFirstOption={false}
          onClick={toggle}
          onSearch={onSearch}
          onChange={onChange}
        />
        <IconWrapper
          direction="right"
          onClick={toggle}
          component={() => <CaretArrowIcon direction={open ? 'bottom' : 'top'} />}
        />
      </FormWrapper>
    </RootWrapper>
  );
};

export default SearchSelect;
