import { Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Title = styled(Typography.Paragraph)`
  margin: 0 !important;
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.GREY_GAINSBORO};
`;

export const RootWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;

export const FieldWrapper = styled(Space)`
  width: 100%;
  margin-top: 20px;
  gap: 20px !important;
`;
