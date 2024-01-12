import { Divider, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const ModalWrapper = styled.div`
  width: 100%;
  max-width: 460px;
`;

export const ModalContent = styled.div`
  max-height: calc(100vh - 80px);
  padding: 14px 20px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 20px;
    padding-left: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${COLORS.GREY_MAIN};
  }
`;

export const Title = styled(Typography.Paragraph)`
  font-size: 12px;
  font-weight: 700;
  color: ${COLORS.CYAN};
`;

export const StyledDivider = styled(Divider)`
  border-color: ${COLORS.GREY_ULTRA_LIGHT};
  margin: 14px 0 0;
`;
