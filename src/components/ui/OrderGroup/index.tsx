import { useEffect, useRef, useState } from 'react';
import Icon from '@ant-design/icons';
import classNames from 'classnames';
import { cacheService } from '@services/cache';
import { IAssignedOrderGroup, IOrder } from '@types';
import { useAppSelector } from '@hooks';
import { selectActiveOrderId } from '@selectors/ordersSelector';
import { CaretArrowIcon } from '@components/icons';
import Header from './Header';
import { StyledPanel, StyledCollapse, StyledOrderCard, StyledAssignedOrderGroup } from './styled-components';

interface IProps {
  title: string;
  orders?: IOrder[];
  cacheState?: boolean;
  assignedOrders?: IAssignedOrderGroup[];
  className?: string;
}

const OrderGroup = ({ title, orders, cacheState, assignedOrders, className }: IProps) => {
  const activeOrderId = useAppSelector(selectActiveOrderId);
  const childIsActive = activeOrderId && (
    orders ??
    assignedOrders?.map(assignedOrder => assignedOrder.orders).flat()
    ?? []
  ).findIndex(order => order.id === activeOrderId) > -1;

  const ordersLength = (orders?.length ?? 0) + (assignedOrders?.reduce(
    (current, item) => current + item.orders.length,
    0,
  ) ?? 0);

  const isEmpty = ordersLength === 0;

  const loadedCache = useRef<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCollapseChange = (e: string | string[]) => {
    if (Array.isArray(e) && e.includes('1')) {
      return setIsOpen(true);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    if (childIsActive) {
      setIsOpen(true);
    }
  }, [childIsActive]);

  useEffect(() => {
    const sessionKey = `${title}_ORDER_GROUP_STATE`;

    if (cacheState) {
      const sessionState = cacheService.getSessionState<boolean>(sessionKey);

      if (sessionState !== null && !loadedCache.current) {
        setIsOpen(sessionState);
      }
    }

    loadedCache.current = true;
    cacheService.saveSessionState(sessionKey, isOpen);
  }, [title, cacheState, isOpen]);

  return (
    <StyledCollapse
      size="small"
      bordered={false}
      isEmpty={isEmpty}
      activeKey={isOpen ? '1' : undefined}
      onChange={onCollapseChange}
      expandIcon={({ isActive }) => (
        <Icon component={() => <CaretArrowIcon direction={isActive ? 'bottom' : 'top'} />} />
      )}
      className={classNames(className, isEmpty && 'disabled')}
    >
      <StyledPanel key="1" header={<Header title={title} count={ordersLength} />}>
        {assignedOrders?.map(assignedOrder => (
          <StyledAssignedOrderGroup key={assignedOrder.driver.id} data={assignedOrder} cacheState />
        ))}
        {orders?.map(order => (
          <StyledOrderCard key={order.id} data={order} cacheState={cacheState} />
        ))}
      </StyledPanel>
    </StyledCollapse>
  );
};

export default OrderGroup;
