import React, { createContext, useContext, useState, useEffect } from 'react';
import { isFeatureEnabled, FEATURE_NAMES } from './featureFlags';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isCartEnabled = isFeatureEnabled(FEATURE_NAMES.SHOPPING_CART);

  useEffect(() => {
    // Chỉ load giỏ hàng từ localStorage nếu tính năng được bật
    if (isCartEnabled) {
      const cartData = localStorage.getItem('cart');
      if (cartData) setCart(JSON.parse(cartData));
    }
  }, [isCartEnabled]);

  const saveCart = (newCart) => {
    if (!isCartEnabled) return;
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (title, price, img, quantity = 1) => {
    if (!isCartEnabled) return;
    
    let newCart = [...cart];
    
    // Add the item to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      newCart.push({ title, price, img });
    }
    
    saveCart(newCart);
    alert(`Đã thêm "${title}" vào giỏ hàng!`);
  };

  const removeFromCart = (index) => {
    if (!isCartEnabled) return;
    
    const grouped = groupItems();
    const item = grouped[index];
    const newCart = cart.filter(i => i.title !== item.title);
    saveCart(newCart);
    alert("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const clearCart = () => {
    if (!isCartEnabled) return;
    
    if (cart.length === 0) {
      alert("Giỏ hàng đã trống!");
      return;
    }
    
    else  {
      saveCart([]);
    }
  };

  const groupItems = () => {
    if (!isCartEnabled) return [];
    
    const grouped = {};
    
    let itemsToGroup = cart;
    
    if (cart.length === 0) {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        itemsToGroup = JSON.parse(cartData);
      }
    }
    
    itemsToGroup.forEach(item => {
      if (!grouped[item.title]) {
        grouped[item.title] = { ...item, quantity: 1 };
      } else {
        grouped[item.title].quantity++;
      }
    });
    
    return Object.values(grouped);
  };

  const updateQuantity = (index, change) => {
    if (!isCartEnabled) return;
    
    const items = groupItems();
    const item = items[index];
    const MIN_QUANTITY = 1;
    const MAX_QUANTITY = 99;
    
    if (typeof change === 'number') {
      item.quantity = Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, item.quantity + change));
    } else {
      item.quantity = Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, parseInt(change) || MIN_QUANTITY));
    }
    
    const newCart = [];
    items.forEach(i => {
      for (let j = 0; j < i.quantity; j++) {
        newCart.push({ title: i.title, price: i.price, img: i.img });
      }
    });
    
    saveCart(newCart);
  };

  const showCart = () => {
    if (!isCartEnabled) return;
    setShowModal(true);
  };
  
  const hideCart = () => setShowModal(false);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      groupItems, 
      updateQuantity, 
      showCart, 
      showModal, 
      hideCart,
      isCartEnabled
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);