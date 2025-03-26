import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) setCart(JSON.parse(cartData));
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (title, price, img) => {
    const newCart = [...cart, { title, price, img }];
    saveCart(newCart);
    alert(`Đã thêm "${title}" vào giỏ hàng!`);
  };

  const removeFromCart = (index) => {
    const grouped = groupItems();
    const item = grouped[index];
    const newCart = cart.filter(i => i.title !== item.title);
    saveCart(newCart);
    alert("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const clearCart = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng đã trống!");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      saveCart([]);
      alert("Đã xóa toàn bộ giỏ hàng!");
    }
  };

  const groupItems = () => {
    const grouped = {};
    cart.forEach(item => {
      if (!grouped[item.title]) {
        grouped[item.title] = { ...item, quantity: 1 };
      } else {
        grouped[item.title].quantity++;
      }
    });
    return Object.values(grouped);
  };

  const updateQuantity = (index, change) => {
    const items = groupItems();
    const item = items[index];
    if (typeof change === 'number') {
      item.quantity = Math.max(1, Math.min(99, item.quantity + change));
    } else {
      item.quantity = Math.max(1, Math.min(99, parseInt(change) || 1));
    }
    const newCart = [];
    items.forEach(i => {
      for (let j = 0; j < i.quantity; j++) {
        newCart.push({ title: i.title, price: i.price, img: i.img });
      }
    });
    saveCart(newCart);
  };

  const showCart = () => setShowModal(true);
  const hideCart = () => setShowModal(false);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, groupItems, updateQuantity, showCart, showModal, hideCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);