import { useEffect, useRef, useState, MouseEvent, useMemo, memo } from 'react';
import Icon from '@ant-design/icons';
import { IOrder } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { cacheService } from '@services/cache';
import { selectActiveOrderId } from '@selectors/ordersSelector';
import { selectOrder } from '@slices/ordersSlice';
import { CaretArrowIcon } from '@components/icons';
import { CollapseWrapper, StyledPanel } from './styled-components';
import Header from './Header';
import Details from './Details';
import Payments from './Payments';
import OrderNotes from './OrderNotes';
import Actions from './Actions';

interface IProps {
  data: IOrder;
  nested?: boolean;
  className?: string;
  cacheState?: boolean;
}

const OrderCard = ({ data, nested, cacheState, className }: IProps) => {
  const dispatch = useAppDispatch();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const loadedCache = useRef<boolean>(false);

  const {
    id,
    status,
    labels,
    notes,
    dropOff,
    pickup,
    number,
    payments,
    timestamps,
  } = useMemo(() => data, [data]);

  const showAlert = !dropOff?.address.address || !pickup.address.address;

  const activeOrder = useAppSelector(selectActiveOrderId);
  const isActive = activeOrder === id;

  const [open, setOpen] = useState<boolean>(false);

  const toggleCard = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(prevState => !prevState);
  };

  const toggleActiveOrder = () => dispatch(selectOrder(isActive ? null : id));

  const onCollapseChange = (e: string | string[]) => {
    toggleActiveOrder();

    if (Array.isArray(e) && e.includes(id)) {
      return setOpen(true);
    }

    setOpen(false);
  };

  useEffect(() => {
    if (isActive) {
      setOpen(true);
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  useEffect(() => {
    const sessionKey = `${id}_ORDER_ITEM_STATE`;

    if (cacheState) {
      const sessionState = cacheService.getSessionState<boolean>(sessionKey);

      if (sessionState !== null && !loadedCache.current) {
        setOpen(sessionState);
      }
    }

    loadedCache.current = true;
    cacheService.saveSessionState(sessionKey, open);
  }, [id, cacheState, open]);

  return (
    <CollapseWrapper
      ref={rootRef}
      size="small"
      bordered={false}
      active={isActive}
      activeKey={open ? id : undefined}
      expandIcon={({ isActive }) => (
        <Icon
          onClick={toggleCard}
          component={() => <CaretArrowIcon direction={isActive ? 'bottom' : 'top'} />}
        />
      )}
      onChange={onCollapseChange}
      className={className}
    >
      <StyledPanel
        key={id}
        nested={nested}
        header={(
          <Header
            id={id}
            number={number}
            status={status}
            labels={labels}
            showName={!open}
            timestamps={timestamps}
            name={dropOff?.name}
            alert={showAlert}
          />
        )}
        className="main-order-card"
      >
        <div onClick={toggleActiveOrder}>
          <Details data={data} />
          <Payments data={payments} />
          {!!notes.adminNotes && <OrderNotes adminNote={notes.adminNotes} />}
          <Actions status={status} source="OLO / API" orderId={id} />
        </div>
      </StyledPanel>
    </CollapseWrapper>
  );
};

export default memo(OrderCard);
