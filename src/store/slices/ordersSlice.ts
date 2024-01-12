import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderState, IStoreState } from '@types';
import { SESSION_KEYS } from '@constants/config';
import { cacheService } from '@services/cache';
import { isActionPending, isActionRejected } from '@utils';
import {
  getOrders,
  assignDriverToOrder,
  unAssignDriverFromOrder,
  quickCreateOrder,
  fullCreateOrder,
  cancelOrderById,
} from '@thunks/ordersThunk';

const baseName = 'orders';

const initialState: IStoreState<IOrderState | null> = {
  data: null,
  error: null,
  loading: false,
};

export const ordersSlice = createSlice({
  name: baseName,
  initialState,
  reducers: {
    selectOrder: (state, { payload }: PayloadAction<string | null>) => {
      if (state.data) {
        cacheService.saveSessionState(SESSION_KEYS.ACTIVE_ORDER, payload);

        state.data.activeOrder = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, { payload }) => ({
        data: state.data ? {
          ...state.data,
          orders: payload,
          forceLoad: false,
        } : {
          activeOrder: null,
          orders: payload,
          forceLoad: false,
        },
        error: null,
        loading: false,
      }))
      .addCase(assignDriverToOrder.fulfilled, (state, { payload }) => {
        const orders = state.data?.orders;
        if (!orders) return state;

        const orderIndex = orders.findIndex(order => order.id === payload.id);
        orders[orderIndex] = payload;
      })
      .addCase(quickCreateOrder.fulfilled, (state) => ({
        ...state,
        data: state.data ? {
          ...state.data,
          forceLoad: true,
        } : {
          orders: null,
          activeOrder: null,
          forceLoad: true,
        },
      }))
      .addCase(fullCreateOrder.fulfilled, (state) => ({
        ...state,
        data: state.data ? {
          ...state.data,
          forceLoad: true,
        } : {
          orders: null,
          activeOrder: null,
          forceLoad: true,
        },
      }))
      .addCase(unAssignDriverFromOrder.fulfilled, (state, { payload }) => {
        const orders = state.data?.orders;
        if (!orders) return state;

        const orderIndex = orders.findIndex(order => order.id === payload.id);
        orders[orderIndex] = payload;
      })
      .addCase(cancelOrderById.fulfilled, (state, { payload }) => {
        const orders = state.data?.orders;
        if (!orders) return state;

        const orderIndex = orders.findIndex(order => order.id === payload.id);

        orders.splice(orderIndex, 1);
      })
      .addMatcher(isActionPending('orders'), state => ({
        ...state,
        loading: true,
      }))
      .addMatcher(isActionRejected('orders'), (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }));
  },
});

export const { selectOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
