import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { SearchSelect } from '@components/ui';

export const StyledSearchSelect = styled(SearchSelect)`
  margin-top: 20px;
`;

export const Title = styled(Typography.Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.GREY_GAINSBORO};
`;

export const RootWrapper = styled.div`
  padding: 20px 0;
  margin-top: 15px;
  border-top: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;

export const RadioWrapper = styled.div`
  margin-top: 20px
`;
