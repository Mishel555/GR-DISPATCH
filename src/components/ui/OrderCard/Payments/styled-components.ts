import { Space, Typography } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled(Space)`
  width: 100%;
  padding: 0 20px;
  gap: 12px !important;
`;

export const ContentWrapper = styled(Space)`
  gap: 12px !important;
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

export const Label = styled(Typography.Paragraph)`
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
`;
