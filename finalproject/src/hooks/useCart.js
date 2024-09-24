import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    const totalCount = sum(cartItems.map(item => item.quantity));
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
  
    // Ensure valid JSON is stored
    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  }, [cartItems]);
  

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
  
    // Use try-catch to handle invalid JSON parsing
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error('Failed to parse cart data from localStorage:', error);
        // Clear the invalid entry
        localStorage.removeItem(CART_KEY);
      }
    }
  
    // Return the empty cart object if no valid data is found
    return EMPTY_CART;
  }
  

  const sum = (items) => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  const removeFromCart = cupId => {
    const filteredCartItems = cartItems.filter(item => item.cup.id !== cupId);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { cup } = cartItem;

    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: cup.price * newQuantity,
    };

    setCartItems(
      cartItems.map(item => (item.cup.id === cup.id ? changedCartItem : item))
    );
  };

  const addToCart = cup => {
    const cartItem = cartItems.find(item => item.cup.id === cup.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { cup, quantity: 1, price: cup.price }]);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    const { items, totalPrice, totalCount } = EMPTY_CART;
    setCartItems(items);
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);