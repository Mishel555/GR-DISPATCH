import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.main`
  padding: 10px 5px 0;
  min-height: calc(100vh);
`;

const MainLayout = () => (
  <Wrapper>
    <Outlet />
  </Wrapper>
);

export default MainLayout;
