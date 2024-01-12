import { Form } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const FormWrapper = styled(Form)`
  height: 100%;
  //padding: 0 10px 0 5px;
  position: relative;
`;

export const ScrollContent = styled.div`
  height: 100%;
  overflow: auto;
  padding: 0 10px 80px 5px;

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

export const HiddenWrapper = styled.div`
  display: none
`;
