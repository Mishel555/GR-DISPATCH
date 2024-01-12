import { Space } from 'antd';
import styled from 'styled-components';
import { FilterButton } from '@components/ui';

interface IProps {
  filters: { id: string; label: string }[];
  deleteFilter: (id: string) => void;
}

const StyledSpace = styled(Space)`
  width: 100%;
  padding-top: 10px;
`;

const ActiveFilters = ({ filters, deleteFilter }: IProps) => (
  <StyledSpace wrap>
    {filters.map(({ id, label }) => (
      label && id !== 'query' ? (
        <FilterButton
          key={id}
          value={id}
          label={label}
          onClick={deleteFilter}
          remove
        />
      ) : <span key={id}></span>
    ))}
  </StyledSpace>
);

export default ActiveFilters;
