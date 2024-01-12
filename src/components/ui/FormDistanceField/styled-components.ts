import { Form, InputNumber, Row, Typography } from 'antd';
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

export const Title = styled(Typography.Paragraph)<{ size: number }>`
  flex-shrink: 0;
  max-width: 90px;
  
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
  
  margin: 0 ${props => props.size}px 0 0 !important;
`;

export const Wrapper = styled(Row)`
  width: 100%;
  flex-wrap: nowrap;
`;

export const FormWrapper = styled(Form.Item)`
  margin: 0;
  width: 100%;
`;

export const StyledInputNumber = styled(InputNumber)<InputStyleProps>`
  width: 100%;
  max-width: 100px;
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

  .ant-input-number {
    padding-left: 10px;
    padding-right: 2px;
    border: none !important;
  }
  
  .ant-input-number-input-wrap {
    input {
      padding: 0 !important;
      border-radius: 0;
      box-shadow: none !important;
      cursor: ${props => props.readOnly ? 'not-allowed' : 'text'} !important;
    }
  }
  
  .ant-input-number-group-addon {
    position: relative;

    height: 30px;
    border: none;
    padding: 0 20px 0 15px;
    
    font-weight: 600;
    font-size: 13px;
    color: ${COLORS.GREY_MAIN};

    background: inherit;
  
    &::before {
      content: '';

      position: absolute;
      top: 50%;
      left: 0;

      transform: translateY(-50%);
      
      width: 1.5px;
      height: 13px;
      background-color: ${COLORS.GREY_GAINSBORO};
    }
  }
`;
