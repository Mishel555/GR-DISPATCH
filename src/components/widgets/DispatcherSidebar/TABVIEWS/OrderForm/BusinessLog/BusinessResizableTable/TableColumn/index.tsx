import { ReactNode } from 'react';
import { Wrapper } from './styled-components';

interface IProps {
  children: ReactNode;
}

const TableColumn = ({ children }: IProps) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default TableColumn;
