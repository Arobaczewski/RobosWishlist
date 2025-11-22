"use client";

import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  setOrders,
  addOrder,
  setCurrentOrder,
  updateOrderStatus,
  removeOrder,
  clearOrders,
  setLoading,
  setError,
  clearError,
} from "../slices/ordersSlice";
import type {
  Order,
  OrderItem,
  ShippingAddress,
  PaymentInfo,
} from "@/app/data/orders";

const isBrowser = typeof window !== "undefined";
const ORDERS_KEY = "demo_orders_all";

function loadAllOrders(): Order[] {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch (error) {
    console.error("Error loading orders from localStorage:", error);
    return [];
  }
}

function saveAllOrders(orders: Order[]) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving orders to localStorage:", error);
  }
}

interface CreateOrderData {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  totalAmount: number;
  status?: Order["status"] | string;
  isGuest?: boolean;
  // 👇 This lets your existing code pass extra fields without TS freaking out
  [key: string]: any;
}

export function useOrders() {
  const dispatch = useAppDispatch();
  const { orders, currentOrder, loading, error } = useAppSelector(
    (state) => state.orders
  );
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Load orders for the current user when auth changes
  useEffect(() => {
    if (!isBrowser) return;

    const allOrders = loadAllOrders();

    if (isAuthenticated && user) {
      const userOrders = allOrders.filter(
        (o: any) => o.userId === user.id
      );
      dispatch(setOrders(userOrders));
    } else {
      // logged out: clear user orders from state
      dispatch(setOrders([]));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  const syncUserOrdersFromAll = useCallback(
    (allOrders: Order[]) => {
      if (isAuthenticated && user) {
        const userOrders = allOrders.filter(
          (o: any) => o.userId === user.id
        );
        dispatch(setOrders(userOrders));
      } else {
        dispatch(setOrders([]));
      }
    },
    [dispatch, isAuthenticated, user?.id]
  );

  const fetchOrders = useCallback(async () => {
    if (!isBrowser) return;
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const allOrders = loadAllOrders();
      syncUserOrdersFromAll(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      dispatch(setError("Failed to load orders."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, syncUserOrdersFromAll]);

  // Note: we accept an optional second arg (_orderToken) so your existing
  // confirmation page can still call fetchOrderById(orderId, orderToken)
  const fetchOrderById = useCallback(
    async (orderId: string, _orderToken?: string): Promise<Order | null> => {
      if (!isBrowser) return null;
      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        // First, check current state
        let order = orders.find((o) => o.id === orderId) || null;

        if (!order) {
          // fallback to searching all orders in localStorage
          const allOrders = loadAllOrders();
          order = allOrders.find((o) => o.id === orderId) || null;
        }

        if (order) {
          dispatch(setCurrentOrder(order));
          return order;
        } else {
          dispatch(setError("Order not found."));
          return null;
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        dispatch(setError("Failed to load order."));
        return null;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, orders]
  );

  const createOrder = useCallback(
    async (data: CreateOrderData): Promise<Order> => {
      if (!isBrowser) {
        throw new Error("Orders are only available in the browser.");
      }

      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        const allOrders = loadAllOrders();

        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : Date.now().toString();

        const now = new Date().toISOString();
        const userId = isAuthenticated && user ? user.id : null;
        const status = data.status ?? "processing";

        const newOrder: Order = {
          ...(data as any),
          id,
          userId,
          status,
          createdAt: now,
        };

        const updatedAll = [...allOrders, newOrder];
        saveAllOrders(updatedAll);

        syncUserOrdersFromAll(updatedAll);
        dispatch(addOrder(newOrder));
        dispatch(setCurrentOrder(newOrder));

        return newOrder;
      } catch (err) {
        console.error("Error creating order:", err);
        dispatch(setError("Failed to create order."));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, isAuthenticated, user, syncUserOrdersFromAll]
  );

  const deleteOrderById = useCallback(
    async (orderId: string) => {
      if (!isBrowser) return;
      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        const allOrders = loadAllOrders();
        const updatedAll = allOrders.filter((o) => o.id !== orderId);
        saveAllOrders(updatedAll);

        syncUserOrdersFromAll(updatedAll);
        dispatch(removeOrder(orderId));
      } catch (err) {
        console.error("Error deleting order:", err);
        dispatch(setError("Failed to delete order."));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, syncUserOrdersFromAll]
  );

  const deleteAllOrders = useCallback(async () => {
    if (!isBrowser) return;
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const allOrders = loadAllOrders();

      if (isAuthenticated && user) {
        const updatedAll = allOrders.filter(
          (o: any) => o.userId !== user.id
        );
        saveAllOrders(updatedAll);
      } else {
        // guest: we won't touch stored orders for other users
      }

      dispatch(clearOrders());
    } catch (err) {
      console.error("Error deleting all orders:", err);
      dispatch(setError("Failed to delete orders."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, isAuthenticated, user]);

  const updateStatus = useCallback(
    async (orderId: string, status: Order["status"] | string) => {
      if (!isBrowser) return;
      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        const allOrders = loadAllOrders();
        const idx = allOrders.findIndex((o) => o.id === orderId);
        if (idx === -1) {
          dispatch(setError("Order not found."));
          return;
        }

        (allOrders[idx] as any).status = status;
        saveAllOrders(allOrders);

        syncUserOrdersFromAll(allOrders);
        dispatch(updateOrderStatus({ id: orderId, status }));
      } catch (err) {
        console.error("Error updating order status:", err);
        dispatch(setError("Failed to update order status."));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, syncUserOrdersFromAll]
  );

  const getTotalSpent = useCallback(() => {
    // Assumes each Order has a totalAmount or similar field
    return orders.reduce((sum, order: any) => {
      const amount =
        typeof order.totalAmount === "number" ? order.totalAmount : 0;
      return sum + amount;
    }, 0);
  }, [orders]);

  const getOrderCount = useCallback(() => {
    return orders.length;
  }, [orders]);

  const getRecentOrders = useCallback(
    (limit = 5) => {
      const sorted = [...orders].sort((a: any, b: any) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
      return sorted.slice(0, limit);
    },
    [orders]
  );

  return {
    orders,
    loading,
    error,
    currentOrder,
    fetchOrders,
    fetchOrderById,
    createOrder,
    deleteOrderById,
    deleteAllOrders,
    updateStatus,
    setCurrentOrder: (order: Order | null) => dispatch(setCurrentOrder(order)),
    clearError: () => dispatch(clearError()),
    getTotalSpent,
    getOrderCount,
    getRecentOrders,
  };
}
