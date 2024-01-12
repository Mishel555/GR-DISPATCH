import { Space } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled(Space)`
  padding: 20px 0;
  gap: 25px !important;
  border-bottom: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;
