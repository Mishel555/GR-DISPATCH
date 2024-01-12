import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Wrapper = styled.div`
  margin-bottom: 4px;
  padding: 14.5px 20px 0;

  border-top: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;

export const Label = styled(Typography.Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  font-size: 10px;
  color: ${COLORS.GREY_LIGHT};
`;
