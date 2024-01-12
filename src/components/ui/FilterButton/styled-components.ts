import { Button } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface IStyleProps {
  active?: boolean;
}

export const StyledButton = styled(Button)<IStyleProps>`
  display: flex;
  align-items: center;
  
  height: 28px;

  font-size: 12px;
  color: ${props => props.active ? COLORS.WHITE : COLORS.GREY_LIGHT};
  background-color: ${props => props.active ? COLORS.GREY_LIGHT : COLORS.WHITE};

  font-weight: 500;
  border-radius: 26px;
  border-color: ${COLORS.GREY_EXTRA};
  transition: .3s ease-in-out;

  &:hover {
    border-color: ${COLORS.GREY_LIGHT} !important;
    color: ${props => props.active ? COLORS.WHITE : COLORS.GREY_MAIN} !important;
  }
`;

export const StyledIcon = styled(Icon)`
  margin-inline-start: 4px !important;
`;
