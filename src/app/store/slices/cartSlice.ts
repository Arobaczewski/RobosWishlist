import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedVariants: { [key: string]: string };
  inStock: boolean;
  brand?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastAddedItem: CartItem | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  lastAddedItem: null,
};

// Load cart from localStorage if available
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }
  return [];
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'id'>>) => {
      // Check if item with same product and variants already exists
      const existingItemIndex = state.items.findIndex(
        item => 
          item.productId === action.payload.productId && 
          JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.selectedVariants)
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        state.items[existingItemIndex].quantity += action.payload.quantity;
        state.lastAddedItem = state.items[existingItemIndex];
      } else {
        // Add new item with unique ID
        const newItem: CartItem = {
          ...action.payload,
          id: `${action.payload.productId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        state.items.push(newItem);
        state.lastAddedItem = newItem;
      }

      // Save to localStorage
      saveCartToStorage(state.items);

      // DO NOT auto-open modal - user must click cart icon to open
      // state.isOpen = true; // REMOVED
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }

      // Save to localStorage
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.lastAddedItem = null;
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    },

    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    syncCartWithBackend: (state, action: PayloadAction<CartItem[]>) => {
      // Merge backend cart with local cart
      const backendItems = action.payload;
      const localItems = state.items;

      // Create a map of backend items for easy lookup
      const backendMap = new Map(
        backendItems.map(item => [
          `${item.productId}-${JSON.stringify(item.selectedVariants)}`,
          item
        ])
      );

      // Merge items
      const mergedItems: CartItem[] = [...backendItems];

      localItems.forEach(localItem => {
        const key = `${localItem.productId}-${JSON.stringify(localItem.selectedVariants)}`;
        const backendItem = backendMap.get(key);

        if (backendItem) {
          // Item exists in both - use higher quantity
          backendItem.quantity = Math.max(backendItem.quantity, localItem.quantity);
        } else {
          // Item only in local cart - add it
          mergedItems.push(localItem);
        }
      });

      state.items = mergedItems;
      saveCartToStorage(mergedItems);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCart,
  openCart,
  closeCart,
  toggleCart,
  syncCartWithBackend,
} = cartSlice.actions;

export default cartSlice.reducer;