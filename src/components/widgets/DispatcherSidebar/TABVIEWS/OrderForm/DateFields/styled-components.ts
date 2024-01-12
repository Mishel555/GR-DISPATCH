import { Row } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled(Row)`
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;
