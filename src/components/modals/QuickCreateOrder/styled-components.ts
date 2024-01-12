import { Form, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const ModalWrapper = styled(Form)`
  width: 460px;
`;

export const Title = styled(Typography.Text)`
  font-size: 12px;
  font-weight: 700;
  color: ${COLORS.CYAN};
`;

export const ScrollContent = styled.div`
  max-height: calc(100vh - 180px);
  padding: 20px 20px;
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
