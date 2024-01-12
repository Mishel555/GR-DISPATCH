import { Form, Select, Typography } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const FormWrapper = styled(Form.Item)`
  width: 100%;
  margin: 0;
  position: relative;
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    padding: 0 35px !important;

    border-radius: 26px;
    box-shadow: none !important;

    font-size: 13px;
    color: ${COLORS.GREY_MAIN};

    &:hover {
      border-color: ${COLORS.CYAN} !important;
    }
  }

  .ant-select-selection-search {
    inset-inline-start: 35px !important;
    inset-inline-end: 35px !important;
  }
`;

export const IconWrapper = styled(Icon)<{ direction: 'left' | 'right' }>`
  position: absolute;
  left: ${props => props.direction === 'left' ? '8px' : 'unset'};
  right: ${props => props.direction === 'right' ? '12px' : 'unset'};
  top: ${props => props.direction === 'right' ? 12.5 : 8}px;
  
  z-index: 1;
`;

export const Title = styled(Typography.Paragraph)<{ size: number }>`
  flex-shrink: 0;
  
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
  
  margin: 0 ${props => props.size}px 0 0 !important;
`;
