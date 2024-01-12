import { Form, Input } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Wrapper = styled(Form.Item)`
  width: 100%;
  margin: 0;
`;

export const StyledArea = styled(Input.TextArea)<{ alert?: boolean }>`
  width: 100%;
  height: 110px !important;
  border-radius: 26px;
  border: 1px solid ${props => props.alert ? COLORS.RED_LIGHT : COLORS.GREY_GAINSBORO};

  padding: 10px 20px;
  
  box-shadow: none;
  resize: none !important;
  
  font-size: 13px;
  color: ${COLORS.GREY_LIGHT};

  &:hover, &:focus {
    border-color: ${props => props.alert ? COLORS.RED_LIGHT : COLORS.CYAN} !important;
  }
`;
