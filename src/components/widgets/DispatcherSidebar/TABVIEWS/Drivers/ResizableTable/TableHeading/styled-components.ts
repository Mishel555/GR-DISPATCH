import { Row, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Wrapper = styled(Row)`
  align-items: center;
  gap: 2px;
`;

export const Title = styled(Typography.Paragraph)`
  font-size: 10px;
  font-weight: 600;
  color: ${COLORS.GREY_LIGHT};
  margin-bottom: 0 !important;
`;
