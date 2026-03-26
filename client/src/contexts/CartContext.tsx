import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  calories: number;
  allergens: string[];
}

export interface CartItem {
  id: string;
  type: 'jus' | 'smoothie';
  size: string;
  basePrice: number; // Prix de BASE (sans add-ons)
  ingredients?: Ingredient[];
  quantity: number;
  customizations?: {
    description?: string;
    productName?: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemTotalPrice: (item: CartItem) => number;
  updateCartItemIngredients: (itemId: string, newIngredients: Ingredient[]) => void;
  updateCartItemPrice: (itemId: string, newPrice: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('diy-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('diy-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    console.log('➕ AJOUT AU PANIER:', {
      produit: item.customizations?.productName || item.type,
      basePrice: item.basePrice,
      ingredients: item.ingredients?.map(i => `${i.name} (${i.price}€)`),
      totalCalculé: getItemTotalPrice(item)
    });
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('diy-cart');
  };

  const updateCartItemIngredients = (itemId: string, newIngredients: Ingredient[]) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, ingredients: newIngredients } : item
      )
    );
  };

  const updateCartItemPrice = (itemId: string, newPrice: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, basePrice: newPrice } : item
      )
    );
  };

const getItemTotalPrice = (item) => {
  const basePrice = item.basePrice || 0;

  const addonsPrice = item.ingredients
    ?.filter(ing => ing.price > 0)
    .reduce((sum, ing) => sum + ing.price, 0) || 0;

  return basePrice + addonsPrice;
};
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const itemPrice = getItemTotalPrice(item);
      return sum + (itemPrice * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getItemTotalPrice,
      updateCartItemIngredients,
      updateCartItemPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}