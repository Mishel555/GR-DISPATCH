import { Button, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const Wrapper = styled(Space)`
  width: 100%;
  padding: 10px 20px;
  justify-content: space-between;
  border-top: 1px solid ${COLORS.GREY_ULTRA_LIGHT};
`;

export const MetaText = styled(Typography.Paragraph)`
  font-size: 10px;
  color: ${COLORS.GREY_SILVER};
`;

export const ActionWrapper = styled(Space)`
  width: 100%;
`;

export const AssignButton = styled(Button)`
  padding: 0 20px;
  border-radius: 100px;
  border-color: ${COLORS.GREY_LIGHT};

  color: ${COLORS.WHITE};
  background-color: ${COLORS.GREY_MAIN};

  font-size: 13px;
  font-weight: 600;

  &:hover {
    opacity: .8;
    border-color: ${COLORS.GREY_LIGHT} !important;
    color: ${COLORS.WHITE} !important;
    background-color: ${COLORS.GREY_MAIN};
  }
`;

export const ChatButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  
  padding: 0 10px;
  border-radius: 100px;
  border-color: ${COLORS.GREY_SILVER};

  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};

  background-color: ${COLORS.WHITE};

  &:hover {
    opacity: .8;
    border-color: ${COLORS.GREY_LIGHT} !important;
    color: ${COLORS.GREY_MAIN} !important;
    background-color: ${COLORS.WHITE};
  }
`;
