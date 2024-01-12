import { useEffect, useRef, useState } from 'react';
import Icon from '@ant-design/icons';
import { IAssignedOrderGroup } from '@types';
import { cacheService } from '@services/cache';
import { useAppSelector } from '@hooks';
import { selectActiveOrderId } from '@selectors/ordersSelector';
import { selectAppLayoutCurrentWidth } from '@selectors/configSelector';
import { CaretArrowIcon } from '@components/icons';
import Header from './Header';
import { StyledPanel, StyledCollapse, StyledOrderCard } from './styled-components';

interface IProps {
  data: IAssignedOrderGroup;
  className?: string;
  cacheState?: boolean;
}

const AssignedOrderGroup = ({ data, cacheState, className }: IProps) => {
  const layoutWidth = useAppSelector(selectAppLayoutCurrentWidth);
  const activeOrderId = useAppSelector(selectActiveOrderId);
  const childIsActive = !!activeOrderId && data.orders.findIndex(order => order.id === activeOrderId) > -1;

  const { orders, driver } = data;
  const isEmpty = orders.length === 0;

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
    const sessionKey = `${driver.id}_ASSIGNED_ORDER_GROUP_STATE`;

    if (cacheState) {
      const sessionState = cacheService.getSessionState<boolean>(sessionKey);

      if (sessionState !== null && !loadedCache.current) {
        setIsOpen(sessionState);
      }
    }

    loadedCache.current = true;
    cacheService.saveSessionState(sessionKey, isOpen);
  }, [driver, cacheState, isOpen]);

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
      className={className}
    >
      <StyledPanel key="1" header={<Header driver={driver} orders={orders} />} className="assigned-order-group">
        {orders?.map(order => (
          <StyledOrderCard key={order.id} data={order} nest={layoutWidth > 480} nested />
        ))}
      </StyledPanel>
    </StyledCollapse>
  );
};

export default AssignedOrderGroup;
