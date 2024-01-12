import { Form, Select, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface IStyleProps {
  alert?: boolean;
  disabled?: boolean;
}

const getInputBorderColor = (props: IStyleProps, hover?: boolean) => {
  if (props.alert) return COLORS.RED_LIGHT;

  if (props.disabled) return COLORS.GREY_ULTRA_LIGHT;

  if (hover) return COLORS.CYAN;

  return COLORS.GREY_GAINSBORO;
};

export const RootWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const FormWrapper = styled(Form.Item)`
  width: 100%;
  margin: 0;
`;

export const Title = styled(Typography.Paragraph)<{ size: number }>`
  flex-shrink: 0;

  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};

  margin: 0 ${props => props.size}px 0 0 !important;
`;

export const StyledSelect = styled(Select)<IStyleProps>`
  max-width: 610px !important;

  .ant-select-selector {
    padding: 0 11px !important;

    border-radius: 26px;
    box-shadow: none !important;
    border: 1px solid ${props => getInputBorderColor(props)} !important;

    font-size: 13px;
    color: ${COLORS.GREY_LIGHT};

    cursor: ${props => props.disabled ? 'not-allowed' : 'text'} !important;
    background-color: ${props => props.disabled ? COLORS.GREY_ULTRA_LIGHT : 'inherit'};

    &:hover, &:focus {
      border-color: ${props => getInputBorderColor(props, true)} !important;
    }
  }
`;
