import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/app/data/orders';

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
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },

    addOrder: (state, action: PayloadAction<Order>) => {
      // Add new order to the beginning of the array (most recent first)
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
      state.error = null;
    },

    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },

    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const order = state.orders.find(order => order.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
      }
      
      if (state.currentOrder?.id === action.payload.orderId) {
        state.currentOrder.status = action.payload.status;
        state.currentOrder.updatedAt = new Date().toISOString();
      }
    },

    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
      
      if (state.currentOrder?.id === action.payload) {
        state.currentOrder = null;
      }
    },

    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
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