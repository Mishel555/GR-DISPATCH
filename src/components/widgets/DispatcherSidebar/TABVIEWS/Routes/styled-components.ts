import styled from 'styled-components';
import { RouteGroup } from '@components/ui';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const RouteWrapper = styled.div`
  flex: 1;
  margin-top: 10px;
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

export const StyledRouteGroup = styled(RouteGroup)`
  margin-bottom: 20px;
  margin-right: 10px;
`;
