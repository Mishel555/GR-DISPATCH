import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { OrderGroup } from '@components/ui';

export const RootWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const OrderWrapper = styled.div`
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

export const StyledOrderGroup = styled(OrderGroup)`
  margin-bottom: 10px;
  margin-right: 10px;
`;
