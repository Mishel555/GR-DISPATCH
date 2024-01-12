import { Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled(Row)`
  width: 100%;
  flex-direction: row;
  gap: 60px;
`;

export const FormWrapper = styled(Space)`
  flex: 1;
  justify-content: space-between;
  gap: 18px !important;
`;

export const Title = styled(Typography.Paragraph)`
  max-width: 60px;
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
  
  margin: 0 !important;
`;
