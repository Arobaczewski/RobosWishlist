import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '@/app/data/orders';

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  currentOrder: Order | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    setCurrentOrder(state, action: PayloadAction<Order | null>) {
      state.currentOrder = action.payload;
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ id: string; status: Order['status'] | string }>
    ) {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        // @ts-ignore – depends on your Order type definition
        order.status = action.payload.status;
      }
      if (state.currentOrder && state.currentOrder.id === action.payload.id) {
        // @ts-ignore
        state.currentOrder.status = action.payload.status;
      }
    },
    removeOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
      if (state.currentOrder && state.currentOrder.id === action.payload) {
        state.currentOrder = null;
      }
    },
    clearOrders(state) {
      state.orders = [];
      state.currentOrder = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setOrders,
  addOrder,
  setCurrentOrder,
  updateOrderStatus,
  removeOrder,
  clearOrders,
  setLoading,
  setError,
  clearError,
} = ordersSlice.actions;

export default ordersSlice.reducer;
