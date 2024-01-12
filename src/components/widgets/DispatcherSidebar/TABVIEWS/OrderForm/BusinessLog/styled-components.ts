import styled from 'styled-components';
import { Typography } from 'antd';
import { COLORS } from '@constants/theme';

export const Wrapper = styled.div`
  margin-top: 15px;
`;

export const Title = styled(Typography.Paragraph)`
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.GREY_GAINSBORO};
`;
