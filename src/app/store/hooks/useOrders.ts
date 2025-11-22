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
import { Order, OrderItem, ShippingAddress, PaymentInfo } from "@/app/data/orders";
import { useEffect } from "react";

interface CreateOrderData {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
}

export function useOrders() {
  const dispatch = useAppDispatch();
  const { orders, loading, error, currentOrder } = useAppSelector((state) => state.orders);
  const { token, isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Fetch orders when user logs in
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchOrders();
    } else {
      // Clear orders when user logs out
      dispatch(clearOrders());
    }
  }, [isAuthenticated, token]);

  const fetchOrders = async () => {
    if (!token) return;

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setOrders(data.orders || []));
      } else {
        const errorData = await response.json();
        dispatch(setError(errorData.error || 'Failed to fetch orders'));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      dispatch(setError('Failed to fetch orders. Please try again.'));
    }
  };

  // Updated to support both authenticated users and guest tokens
  const fetchOrderById = async (orderId: string, guestToken?: string): Promise<Order | null> => {
    // If we have a guest token, use that instead of auth token
    if (guestToken) {
      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        // For guest orders, append token as query parameter
        const response = await fetch(`/api/orders/${orderId}?token=${encodeURIComponent(guestToken)}`, {
          headers: {
            'Content-Type': 'application/json'
            // No Authorization header for guest access
          }
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setCurrentOrder(data.order));
          dispatch(setLoading(false));
          return data.order;
        } else {
          const errorData = await response.json();
          dispatch(setError(errorData.error || 'Failed to fetch order'));
          dispatch(setLoading(false));
          return null;
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        dispatch(setError('Failed to fetch order. Please try again.'));
        dispatch(setLoading(false));
        return null;
      }
    }

    // Original authenticated user logic
    if (!token) return null;

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentOrder(data.order));
        dispatch(setLoading(false));
        return data.order;
      } else {
        const errorData = await response.json();
        dispatch(setError(errorData.error || 'Failed to fetch order'));
        dispatch(setLoading(false));
        return null;
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      dispatch(setError('Failed to fetch order. Please try again.'));
      dispatch(setLoading(false));
      return null;
    }
  };

  const createOrder = async (orderData: CreateOrderData, isGuest: boolean = false): Promise<Order | null> => {
    // For guest checkout, we don't need authentication
    if (!isGuest && (!token || !user)) {
      dispatch(setError('You must be logged in to place an order'));
      return null;
    }

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          ...(token && !isGuest ? { 'Authorization': `Bearer ${token}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...(user && !isGuest ? { userId: user.id } : {}),
          ...orderData,
          isGuest
        })
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addOrder(data.order));
        dispatch(setLoading(false));
        // Return the order with orderToken if it's a guest order
        return { ...data.order, orderToken: data.orderToken };
      } else {
        const errorData = await response.json();
        dispatch(setError(errorData.error || 'Failed to create order'));
        return null;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      dispatch(setError('Failed to create order. Please try again.'));
      return null;
    }
  };

  const deleteOrderById = async (orderId: string): Promise<boolean> => {
    if (!token) return false;

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        dispatch(removeOrder(orderId));
        dispatch(setLoading(false));
        return true;
      } else {
        const errorData = await response.json();
        dispatch(setError(errorData.error || 'Failed to delete order'));
        return false;
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      dispatch(setError('Failed to delete order. Please try again.'));
      return false;
    }
  };

  const deleteAllOrders = async (): Promise<boolean> => {
    if (!token) return false;

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await fetch('/api/orders', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        dispatch(clearOrders());
        dispatch(setLoading(false));
        return true;
      } else {
        const errorData = await response.json();
        dispatch(setError(errorData.error || 'Failed to delete orders'));
        return false;
      }
    } catch (error) {
      console.error('Error deleting orders:', error);
      dispatch(setError('Failed to delete orders. Please try again.'));
      return false;
    }
  };

  const updateStatus = async (orderId: string, status: Order['status']): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        dispatch(updateOrderStatus({ orderId, status }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  };

  // Helper functions for order statistics
  const getTotalSpent = (): number => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const getOrderCount = (): number => {
    return orders.length;
  };

  const getRecentOrders = (limit: number = 5): Order[] => {
    return orders.slice(0, limit);
  };

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