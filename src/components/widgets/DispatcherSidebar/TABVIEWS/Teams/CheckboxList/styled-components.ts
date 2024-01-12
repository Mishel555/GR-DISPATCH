import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled.div`
  flex: 1;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${COLORS.GREY_MAIN};
  }
`;
