import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './utils/CartManager';
import Home from './pages/Home.jsx';
import Order from './pages/Order.jsx';
import Products from './pages/Products.jsx';
import ChatWidget from './components/chat/ChatWidget.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
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