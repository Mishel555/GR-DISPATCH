import { memo, useState } from 'react';
import { closestCenter, DndContextProps, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { IDndDragEvent, IGroupedRoute, IGroupedRouteItem } from '@types';
import { unGroupRoute } from '@utils';
import { useAppDispatch, useAppSelector } from '@hooks';
import { updateRouteById } from '@thunks/routesThunk';
import { selectActiveRouteId } from '@selectors/routesSelector';
import { selectRoute } from '@slices/routesSlice';
import { DndSortableLayout } from '@components/layouts';
import { Wrapper, StyledDndLayoutItem, StyledRouteCard, SendButton } from './styled-components';

import DriverBadge from './DriverBadge';

interface IProps {
  data: IGroupedRoute;
  className?: string;
}

const RouteGroup = ({ data, className }: IProps) => {
  const dispatch = useAppDispatch();

  const activeRoute = useAppSelector(selectActiveRouteId);
  const isActive = activeRoute === data.id;

  const toggleActiveRoute = () => dispatch(selectRoute(isActive ? null : data.id));

  const { driver, items: routeItems } = data;

  const [items, setItems] = useState<IGroupedRouteItem[]>(routeItems);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [canSend, setCanSend] = useState<boolean>(false);

  const onSend = async () => {
    try {
      setIsSending(true);
      const convertedRoute = unGroupRoute({ ...data, items });

      await dispatch(updateRouteById({
        id: data.id,
        data: {
          driver: { id: data.driver.id },
          items: convertedRoute.items.map(item => ({ type: item.type, order: { id: item.order.id } })),
        },
      })).unwrap();

      setCanSend(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSending(false);
    }
  };

  const onDragEnd = (e: IDndDragEvent) => {
    const { active, over, delta } = e;

    const activeIndex = items.findIndex(item => item.id === active.id);
    const activeItem = items[activeIndex];

    // drag drop-off to top
    if (activeItem.type === 'DROPOFF' && delta.y < 0) {
      const newIndex = items.findIndex(routeItem => over.id === routeItem.id);

      const samePickupIndex = items.findIndex(item => (
        item.type === 'PICKUP' &&
        item.orders.some(order => (
          activeItem.orders.map(order => order.pickup.id).includes(order.pickup.id)))
      ));

      if (newIndex <= samePickupIndex) return;
    }

    if (active.id !== over.id) {
      setCanSend(true);

      setItems(prevState => {
        const oldIndex = prevState.findIndex(routeItem => active.id === routeItem.id);
        const newIndex = prevState.findIndex(routeItem => over.id === routeItem.id);

        return arrayMove(prevState, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  const contextConfig: DndContextProps = {
    sensors,
    collisionDetection: closestCenter,
    modifiers: [restrictToVerticalAxis, restrictToParentElement],
    onDragEnd,
  };

  return (
    <Wrapper
      active={isActive}
      bordered={false}
      title={<DriverBadge driver={driver} />}
      extra={canSend && <SendButton loading={isSending} onClick={onSend}>Send</SendButton>}
      onClick={toggleActiveRoute}
      className={className}
    >
      <DndSortableLayout
        data={items}
        ids={items.map(route => route.id)}
        contextConfig={contextConfig}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <StyledDndLayoutItem key={item.id} id={item.id} last={items.length - 1 === index} handle>
            <StyledRouteCard data={item} />
          </StyledDndLayoutItem>
        ))}
      </DndSortableLayout>
    </Wrapper>
  );
};

export default memo(RouteGroup);
