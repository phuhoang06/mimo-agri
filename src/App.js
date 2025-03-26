import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './utils/CartManager';
import Home from './pages/Home';
import Order from './pages/Order';
import ChatWidget from './components/ChatWidget';
import 'bootstrap/dist/css/bootstrap.min.css'; // Thêm Bootstrap CSS
import './styles.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <ChatWidget />
      </Router>
    </CartProvider>
  );
}

export default App;