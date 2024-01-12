import { Button } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const CreateButton = styled(Button)<{ color: string; circle?: boolean }>`
  width: 30px !important;
  height: 30px !important;
  border-radius: ${props => props.circle ? 13 : 12}px;
  border-color: ${props => props.color};

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: ${COLORS.WHITE};
  background-color: ${props => props.color};

  &:hover {
    color: ${COLORS.WHITE} !important;
    border-color: ${props => props.color} !important;
    background-color: ${props => props.color} !important;
  }
`;
