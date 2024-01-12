import { ReactNode } from 'react';
import { Space, Typography } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

const { Text, Paragraph } = Typography;

export const RootWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 5px;

  display: flex;
  flex-direction: column;
  gap: 8px !important;
`;

export const ContentWrapper = styled(Space)`
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
  gap: 35px !important;
`;

interface ILabelProps {
  isDate?: boolean;
  danger?: boolean;
  children?: ReactNode | ReactNode[];
}

export const Label = styled(Paragraph)<ILabelProps>`
  white-space: ${props => props.isDate ? 'nowrap' : 'unset'};
  font-size: 13px;
  text-align: ${props => props.isDate ? 'right' : 'left'};
  color: ${props => props.danger ? COLORS.RED_LIGHT : COLORS.GREY_MAIN};
`;

export const ErrorMessage = styled(Text)`
  font-size: 13px;
  color: ${COLORS.RED_LIGHT};
`;

export const StyledIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  border-radius: 8px;
  background-color: ${COLORS.WHITE};

  font-size: 11px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
