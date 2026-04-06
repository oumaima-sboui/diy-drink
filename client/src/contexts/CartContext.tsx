import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  calories: number;
  allergens?: string[];
}

export interface CartItem {
  id: string;
  type: 'jus' | 'smoothie';
  size: string;
  basePrice: number;
  ingredients: Ingredient[];
  quantity: number;
  customizations?: {
    productName?: string;
    description?: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  updateCartItemIngredients: (itemId: string, ingredients: Ingredient[]) => void;
  updateCartItemPrice: (itemId: string, newPrice: number) => void;
  getItemTotalPrice: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getItemTotalPrice = (item: CartItem): number => {
    const basePrice = item.basePrice;
    const addonsPrice = item.ingredients
      .filter((ing: Ingredient) => ing.price > 0)
      .reduce((sum: number, ing: Ingredient) => sum + ing.price, 0);
    return basePrice + addonsPrice;
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + getItemTotalPrice(item) * item.quantity;
    }, 0);
  };

  const updateCartItemIngredients = (itemId: string, ingredients: Ingredient[]) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, ingredients } : item
      )
    );
  };

  const updateCartItemPrice = (itemId: string, newPrice: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, basePrice: newPrice } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        updateCartItemIngredients,
        updateCartItemPrice,
        getItemTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ IMPORTANT : Export du hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}