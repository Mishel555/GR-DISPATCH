import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IDriver, IOrder } from '@types';
import api from '@services/api';
import { useAppSelector } from '@hooks';
import { selectOrderById } from '@selectors/ordersSelector';
import DriverCard from './DriverCard';
import { DriversWrapper, DriverButton } from './styled-components';

interface IProps {
  search: string;
  orderId: string;
  onSelect: (driver: IDriver) => void;
}

const fetchDrivers = async (query: string, order: IOrder, setState: Dispatch<SetStateAction<IDriver[] | null>>) => {
  if (query && query.length < 3) return;

  const { data } = await api.orders.searchDriversForOrder(order.id, {
    order,
    withShiftsOnly: false,
    query: query ? query : null,
  });

  setState(data.result);
};

const Drivers = ({ search, orderId, onSelect }: IProps) => {
  const currentOrder = useAppSelector(selectOrderById(orderId));

  const [drivers, setDrivers] = useState<IDriver[] | null>(null);

  useEffect(() => {
    if (!currentOrder) return;

    fetchDrivers(search, currentOrder, setDrivers);
  }, [search, currentOrder, orderId]);

  return (
    <DriversWrapper direction="vertical">
      {drivers?.map(driver => (
        <DriverButton key={driver.id} type="link" onClick={() => onSelect(driver)}>
          <DriverCard driver={driver} />
        </DriverButton>
      ))}
    </DriversWrapper>
  );
};

export default Drivers;
