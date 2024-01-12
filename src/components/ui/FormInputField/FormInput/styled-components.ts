import { Form, Input } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface InputStyleProps {
  alert?: boolean;
  readOnly?: boolean;
}

const getInputBorderColor = (props: InputStyleProps, hover?: boolean) => {
  if (props.alert) return COLORS.RED_LIGHT;

  if (props.readOnly) return COLORS.GREY_ULTRA_LIGHT;

  if (hover) return COLORS.CYAN;

  return COLORS.GREY_GAINSBORO;
};

export const Wrapper = styled(Form.Item)<{ width?: number }>`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  margin: 0;
`;

export const StyledInput = styled(Input)<InputStyleProps>`
  width: 100%;
  height: 30px;
  border-radius: 15px;
  border: 1px solid ${props => getInputBorderColor(props)};

  box-shadow: none;
  
  font-size: 13px;
  color: ${COLORS.GREY_LIGHT};
  background-color: ${props => props.readOnly ? COLORS.GREY_ULTRA_LIGHT : 'inherit'};

  cursor: ${props => props.readOnly ? 'not-allowed' : 'text'} !important;

  &:hover, &:focus {
    border-color: ${props => getInputBorderColor(props, true)} !important;
  }

  /* Chrome, Safari, Edge, Opera */

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  &[type=number] {
    -moz-appearance: textfield;
  }
`;
