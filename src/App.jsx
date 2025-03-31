import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './utils/CartManager';
import Home from './pages/Home.jsx';
import Order from './pages/Order.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import AllVideos from './pages/AllVideos.jsx';
import TechnicalDocuments from './pages/TechnicalDocuments.jsx';
import TechnicalDocDetail from './pages/TechnicalDocDetail.jsx';
import AboutUs from './pages/AboutUs.jsx';
import SalesPolicy from './pages/SalesPolicy.jsx';
import Contact from './pages/Contact.jsx';
import ChatWidget from './components/chat/ChatWidget.jsx';
import { ScrollToTop } from './components/ui';
import { isFeatureEnabled, FEATURE_NAMES } from './utils/featureFlags';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './index.css';

function App() {
  const isCartEnabled = isFeatureEnabled(FEATURE_NAMES.SHOPPING_CART);

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
          {isCartEnabled && <Route path="/order" element={<Order />} />}
          <Route path="/san-pham" element={<Products />} />
          <Route path="/san-pham/:productId" element={<ProductDetail />} />
          <Route path="/videos" element={<AllVideos />} />
          <Route path="/tai-lieu-ky-thuat" element={<TechnicalDocuments />} />
          <Route path="/tai-lieu-ky-thuat/:id" element={<TechnicalDocDetail />} />
          <Route path="/ve-chung-toi" element={<AboutUs />} />
          <Route path="/chinh-sach-ban-hang" element={<SalesPolicy />} />
          <Route path="/lien-he" element={<Contact />} />
        </Routes>
        <ChatWidget />
        <ScrollToTop />
      </Router>
    </CartProvider>
  );
}

export default App;