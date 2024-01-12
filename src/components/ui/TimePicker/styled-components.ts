import { Form, Input, TimePicker } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface InputStyleProps {
  alert?: boolean;
  disabled?: boolean;
}

const getInputBorderColor = (props: InputStyleProps, hover?: boolean) => {
  if (props.alert) return COLORS.RED_LIGHT;

  if (props.disabled) return COLORS.GREY_ULTRA_LIGHT;

  if (hover) return COLORS.CYAN;

  return COLORS.GREY_GAINSBORO;
};

export const Wrapper = styled(Form.Item)`
  width: 100%;
  margin: 0;
`;

export const StyledInput = styled(Input)<InputStyleProps>`
  width: 100%;
  height: 30px;
  box-shadow: none;
  border-radius: 15px;
  border: 1px solid ${props => getInputBorderColor(props)};

  font-size: 13px;
  text-align: center;
  
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

export const StyledTimePicker = styled(TimePicker)<InputStyleProps>`
  width: 100%;
  max-width: 80px;
  height: 30px;
  padding: 0;
  border-radius: 15px;

  font-size: 13px !important;
  font-weight: 400;
  color: ${COLORS.GREY_MAIN} !important;

  border-color: ${props => getInputBorderColor(props)};
  cursor: ${props => props.disabled ? 'not-allowed' : 'text'} !important;
  background-color: ${props => props.disabled ? COLORS.GREY_ULTRA_LIGHT : 'inherit'};

  &:hover {
    border-color: ${props => getInputBorderColor(props, true)};
  }

  &.ant-picker-disabled {
    border-color: ${props => getInputBorderColor(props, true)} !important;
  }

  input {
    text-align: center;

    font-size: 13px !important;
    font-weight: 400;
    color: ${COLORS.GREY_MAIN} !important;
  }
`;
