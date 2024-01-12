import { Row, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface IProps {
  search?: string | null;
  filterCount: number;
}

const { Text } = Typography;

const Wrapper = styled(Row)`
  margin-top: 10px;
  padding-bottom: 15px;
`;

const Label = styled(Text)`
  font-size: 10px;
  color: ${COLORS.GREY_LIGHT};
`;

const SearchLog = ({ search, filterCount }: IProps) => (
  <Wrapper justify="space-between">
    <Label>Search results for “{search}” + {filterCount} filter</Label>
    <Label>Press ENTER</Label>
  </Wrapper>
);

export default SearchLog;
