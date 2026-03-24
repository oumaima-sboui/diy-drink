import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '@/lib/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  updateCartItemIngredients: (itemId: string, newIngredients: any[]) => void;
  updateCartItemPrice: (itemId: string, newPrice: number) => void; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
const updateCartItemIngredients = (itemId: string, newIngredients: any[]) => {
  setCart(prevCart => 
    prevCart.map(item => 
      item.id === itemId 
        ? { ...item, ingredients: newIngredients }
        : item
    )
  );
};
  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      let itemPrice = item.basePrice;
      if (item.ingredients) {
        itemPrice += item.ingredients.reduce((sum, ing) => sum + ing.price, 0);
      }
      if (item.customizations?.extras) {
        // Add extras price logic here if needed
      }
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
const updateCartItemPrice = (itemId: string, newPrice: number) => {
  setCart(prevCart => 
    prevCart.map(item => 
      item.id === itemId 
        ? { ...item, basePrice: newPrice }
        : item
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
     
        getTotalPrice,
        getTotalItems,

 clearCart ,
 updateCartItemIngredients,
 updateCartItemPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
const clearCart = () => {
    setCart([]);
    localStorage.removeItem('diy-cart'); // Si vous utilisez localStorage
  };
}
