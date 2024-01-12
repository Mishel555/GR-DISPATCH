import { ReactNode, useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { EModalTypes, IDriverOrder, OrderStatusType } from '@types';
import api from '@services/api';
import { useAppDispatch, useAppSelector } from '@hooks';
import { openModal } from '@slices/modalSlice';
import { selectDriverById } from '@selectors/driversSelector';

interface IProps {
  driverId: string;
  children: ReactNode;
}

const ACTIVE_ORDER_STATUSES: OrderStatusType[] = ['UNASSIGNED', 'ASSIGNED', 'ACCEPTED', 'PICKED_UP'];

const RowContext = ({ driverId, children }: IProps) => {
  const driver = useAppSelector(selectDriverById(driverId));
  const dispatch = useAppDispatch();

  const [orders, setOrders] = useState<IDriverOrder[] | null>(null);

  const changeDriverTeam = () => {
    dispatch(openModal({
      type: EModalTypes.CHANGE_DRIVER_TEAM,
      props: { driverId },
    }));

    close();
  };

  const setInvisible = async () => {
    try {
      await api.drivers.setInvisibleDriverById(driverId);

      dispatch(openModal({
        type: EModalTypes.SUCCESS_MESSAGE,
        props: {
          timeout: 2000,
          autoHide: true,
          messages: ['Driver successfully updated'],
        },
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const openInvisibleModal = () => {
    if (!driver) return;

    let message: string[] = ['Are you sure', `you want to set the driver ${driver.name} invisible?`];

    if (orders?.length) {
      message = [`The driver ${driver.name} has assigned orders.`, 'Are you sure you want to set the driver invisible?'];

      if (orders.some(order => ACTIVE_ORDER_STATUSES.includes(order.status))) {
        message = [`The driver ${driver.name} has active orders.`, 'Are you sure you want to set the driver invisible?'];
      }
    }

    dispatch(openModal({
      type: EModalTypes.CONFIRM_MESSAGE,
      props: {
        okLabel: 'Yes',
        cancelLabel: 'No',
        messages: message,
        onConfirm: setInvisible,
      },
    }));
  };

  const menuItems: ItemType[] = [
    { key: '1', label: 'Set invisible', onClick: openInvisibleModal },
    { key: '2', label: 'Change team', onClick: changeDriverTeam },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.drivers.getDriverById(driverId);

        setOrders(data.orders);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [driverId]);

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  );
};

export default RowContext;
