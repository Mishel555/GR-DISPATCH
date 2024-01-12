import { Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Title = styled(Typography.Text)<{ index?: number }>`
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.GREY_GAINSBORO};

  &::before {
    content: '${props => props.index}';
    display: ${props => props.index ? 'inline' : 'none'};
    
    position: relative;
    top: -5px;
    margin-right: 6px;

    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.GREY_GAINSBORO};
  }
`;

export const RootWrapper = styled(Space)`
  width: 100%;
  gap: 20px !important;

  padding-top: 20px;
  margin-top: 15px;
  border-top: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;

export const HeaderWrapper = styled(Row)`
`;

export const FieldWrapper = styled(Row)`
  width: 100%;
  gap: 20px !important;
  flex-flow: nowrap;
`;
