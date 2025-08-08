import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface CartItem {
  id: string;
  name: { ar: string; en: string };
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
};

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, action.payload];
      }

      const { itemCount, total } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        itemCount,
        total,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        return itemKey !== action.payload;
      });

      const { itemCount, total } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        itemCount,
        total,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        return itemKey === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item;
      }).filter((item) => item.quantity > 0);

      const { itemCount, total } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        itemCount,
        total,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'LOAD_CART': {
      const { itemCount, total } = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        itemCount,
        total,
      };
    }

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  getItemKey: (item: { id: string; size: string; color: string }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const getItemKey = (item: { id: string; size: string; color: string }) => {
    return `${item.id}-${item.size}-${item.color}`;
  };

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const cartItem: CartItem = {
      ...item,
      quantity: item.quantity || 1,
    };
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

  const removeItem = (itemKey: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemKey });
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemKey, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemKey,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};