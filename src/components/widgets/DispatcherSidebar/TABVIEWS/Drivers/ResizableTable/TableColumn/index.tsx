import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@hooks';
import { selectDriver } from '@slices/driversSlice';
import { selectActiveDriverId } from '@selectors/driversSelector';
import RowContext from './RowContext';
import { Wrapper } from './styled-components';

interface IProps {
  driverId: string;
  children: ReactNode;
}

const TableColumn = ({ driverId, children }: IProps) => {
  const dispatch = useDispatch();
  const activeDriver = useAppSelector(selectActiveDriverId);

  const onRowClick = () => {
    dispatch(selectDriver(activeDriver === driverId ? null : driverId));
  };

  return (
    <RowContext driverId={driverId}>
      <Wrapper onClick={onRowClick}>
        {children}
      </Wrapper>
    </RowContext>
  );
};

export default TableColumn;
