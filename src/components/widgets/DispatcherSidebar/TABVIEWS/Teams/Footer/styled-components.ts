import { Button } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled.div`
  //height: 80px;
  padding: 25px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterAction = styled(Button)<{ confirm?: boolean }>`
  width: 97px;
  height: 28px;
  padding: 0;
  border-radius: 100px;
  border: 1px solid ${props => props.confirm ? COLORS.GREY_MAIN : COLORS.GREY_ULTRA_LIGHT};
  

  font-size: 13px;
  font-weight: 600;

  color: ${props => props.confirm ? COLORS.WHITE : COLORS.GREY_MAIN};
  background-color: ${props => props.confirm ? COLORS.GREY_MAIN : COLORS.GREY_ULTRA_LIGHT};

  &:hover {
    color: ${props => props.confirm ? COLORS.WHITE : COLORS.GREY_LIGHT} !important;
    border-color: ${props => props.confirm ? COLORS.GREY_MAIN : COLORS.GREY_ULTRA_LIGHT} !important;
    opacity: .7;
  }
`;
