import React, { createContext, useState } from 'react';


export const UserContext = createContext();
export const ThemeContext = createContext();
export const CartContext = createContext();
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState({ textColor: 'black', backgroundColor: 'white' });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev => {
      return prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(quantity, 1) }
          : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalCost }}>
          {children}
        </CartContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};
