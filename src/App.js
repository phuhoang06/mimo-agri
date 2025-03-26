import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './utils/CartManager';
import Home from './pages/Home';
import Order from './pages/Order';
import Products from './pages/Products';
import ChatWidget from './components/ChatWidget';
import 'bootstrap/dist/css/bootstrap.min.css'; // Thêm Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Thêm Bootstrap JavaScript
import './styles.css';

function App() {
  useEffect(() => {
    // Đảm bảo Bootstrap JavaScript có sẵn toàn cục để các component có thể sử dụng
    if (typeof window !== 'undefined' && typeof window.bootstrap === 'undefined') {
      window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/san-pham" element={<Products />} />
        </Routes>
        <ChatWidget />
      </Router>
    </CartProvider>
  );
}

export default App;