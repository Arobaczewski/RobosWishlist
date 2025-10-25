import { useAppDispatch, useAppSelector } from "./hooks";
import { 
  addToCart as addToCartAction, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  openCart, 
  closeCart, 
  toggleCart,
  syncCartWithBackend,
  CartItem 
} from "../slices/cartSlice";
import { useEffect } from "react";

export function useCart() {
  const dispatch = useAppDispatch();
  const { items, isOpen, lastAddedItem } = useAppSelector((state) => state.cart);
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  // Sync cart with backend when user logs in
  useEffect(() => {
    if (isAuthenticated && token && items.length > 0) {
      syncWithBackend();
    }
  }, [isAuthenticated, token]);

  // Load cart from backend when user logs in
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cart && data.cart.length > 0) {
          // Merge backend cart with local cart
          dispatch(syncCartWithBackend(data.cart));
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const syncWithBackend = async () => {
    if (!token || items.length === 0) return;

    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart: items })
      });
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    // Add to Redux state (which also updates localStorage)
    dispatch(addToCartAction(item));

    // If user is authenticated, sync with backend
    if (isAuthenticated && token) {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart: [...items, item] })
        });
      } catch (error) {
        console.error('Error adding to cart on backend:', error);
        // Item is still added locally, so user experience isn't affected
      }
    }
  };

  const removeItem = async (itemId: string) => {
    dispatch(removeFromCart(itemId));

    // Sync with backend if authenticated
    if (isAuthenticated && token) {
      const updatedItems = items.filter(item => item.id !== itemId);
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart: updatedItems })
        });
      } catch (error) {
        console.error('Error removing from cart on backend:', error);
      }
    }
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }));

    // Sync with backend if authenticated
    if (isAuthenticated && token) {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart: items })
        });
      } catch (error) {
        console.error('Error updating cart on backend:', error);
      }
    }
  };

  const emptyCart = async () => {
    dispatch(clearCart());

    // Clear backend cart if authenticated
    if (isAuthenticated && token) {
      try {
        await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Error clearing cart on backend:', error);
      }
    }
  };

  // Calculate cart totals
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax for demo
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  return {
    items,
    isOpen,
    lastAddedItem,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
    addToCart,
    removeItem,
    updateItemQuantity,
    emptyCart,
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
    toggleCart: () => dispatch(toggleCart()),
  };
}