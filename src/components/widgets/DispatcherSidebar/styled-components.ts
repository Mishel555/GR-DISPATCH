import { ResizableBox } from 'react-resizable';
import styled from 'styled-components';

export const ResizableContainer = styled(ResizableBox)`
  position: relative;
  background-clip: padding-box;
  width: 33%;
  height: calc(100vh - 10px) !important;
`;

export const ResizeHandler = styled.span`
  width: 10px;
  height: 100%;
  cursor: col-resize;

  position: absolute;
  right: -5px;
  bottom: 0;
  z-index: 1;
`;

export const RootWrapper = styled.div`
  //padding: 0 0 0 10px;
  height: 100%;
  
  display: flex;
  flex-direction: column;
`;

export const RouteWrapper = styled.div`
  height: 100%;

  overflow: hidden;
`;
