import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface IStyleProps {
  color: string;
}

export const Wrapper = styled.div`
  max-width: 130px;
  max-height: 30px;
  padding: 4px 8px;
  border-radius: 15px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  color: ${COLORS.GREY_MAIN};
  background-color: ${COLORS.WHITE};
`;

export const Circle = styled.span<IStyleProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

export const Label = styled(Typography.Text)`
  font-size: 10px;  
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
`;
