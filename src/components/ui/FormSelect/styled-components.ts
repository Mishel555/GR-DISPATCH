import { Form, Row, Select, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface StyleProps {
  alert?: boolean;
  readOnly?: boolean;
}

const getInputBorderColor = (props: StyleProps, hover?: boolean) => {
  if (props.alert) return COLORS.RED_LIGHT;

  if (props.readOnly) return COLORS.GREY_ULTRA_LIGHT;

  if (hover) return COLORS.CYAN;

  return COLORS.GREY_GAINSBORO;
};

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

export const RootWrapper = styled(Row)`
  width: 100%;
  flex-wrap: nowrap;
`;

export const StyledSelect = styled(Select)<StyleProps>`
  width: 100%;
  margin: 0 !important;

  .ant-select-selector {
    height: 30px!important;

    border-radius: 26px;
    box-shadow: none !important;

    font-size: 13px;
    color: ${COLORS.GREY_MAIN};

    cursor: ${props => props.readOnly ? 'not-allowed' : 'text'} !important;
    background-color: ${props => props.readOnly ? COLORS.GREY_ULTRA_LIGHT : 'inherit'};

    &:hover, &:focus {
      border-color: ${props => getInputBorderColor(props, true)} !important;
    }
  }
`;
