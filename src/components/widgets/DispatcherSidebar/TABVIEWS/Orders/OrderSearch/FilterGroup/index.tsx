import { Fragment } from 'react';
import { Space } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FilterButton, RangePicker } from '@components/ui';
import { COLORS } from '@constants/theme';

interface IFilter {
  id: string;
  label: string;
}

interface IProps {
  data: IFilter[];
  currentFilters: IFilter[] | null;
  toggleFilter: (id: string, label: string) => void;
  onDatesChange?: (dates: Array<dayjs.Dayjs> | null) => void;
  dates?: Array<dayjs.Dayjs> | null;
}

const StyledSpace = styled(Space)`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${COLORS.GREY_EXTRA_LIGHT};
`;

const FilterGroup = ({ data, currentFilters, toggleFilter, onDatesChange = () => undefined, dates = null }: IProps) => (
  <StyledSpace wrap>
    {data.map(({ id, label }) => {
      const active = currentFilters?.length ? currentFilters.findIndex(filter => filter.id === id) > -1 : false;

      return (
        <Fragment key={id}>
          <FilterButton
            value={id}
            label={label}
            active={active}
            onClick={toggleFilter}
          />
          {id === 'CUSTOM' && active && <RangePicker onChange={onDatesChange} defaultValue={dates} />}
        </Fragment>
      );
    })}
  </StyledSpace>
);

export default FilterGroup;
