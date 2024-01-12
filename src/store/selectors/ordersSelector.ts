import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { formatAssignedOrders } from '@utils';

const keyName = 'orders';

const selectState = (state: RootState) => state[keyName];

export const selectAllOrders = createSelector(selectState, state => state.data?.orders);

export const selectOrderById = (id: string) => createSelector(
  selectState,
  state => state.data?.orders?.find(order => order.id === id),
);

export const selectActiveOrderId = createSelector(
  selectState,
  state => state.data?.activeOrder,
);

export const selectActiveOrder = createSelector(selectState, state => {
  const orders = state.data?.orders;
  const activeOrder = state.data?.activeOrder;

  if (!orders || !orders.length || !activeOrder) return;

  return orders.find(order => order.id === activeOrder);
});

export const selectOrderForceLoad = createSelector(selectState, state => state.data?.forceLoad);

export const selectGroupedOrders = createSelector(selectState, state => {
  const { data } = state;
  const unAssignedOrders = data?.orders?.filter(order => order.status === 'UNASSIGNED');
  const assignedOrders = data?.orders?.filter(order => (
    order.status === 'ASSIGNED' ||
    order.status === 'ACCEPTED' ||
    order.status === 'PICKED_UP'
  ));

  return {
    unAssignedOrders,
    assignedOrders: assignedOrders ? formatAssignedOrders(assignedOrders) : [],
  };
});
