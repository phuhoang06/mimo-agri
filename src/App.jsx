import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './utils/CartManager';
import ChatWidget from './components/chat/ChatWidget';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './index.css';

// Loading component
const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Đảm bảo Bootstrap JavaScript có sẵn toàn cục để các component có thể sử dụng
    if (typeof window !== 'undefined' && typeof window.bootstrap === 'undefined') {
      window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  // Đặt tiêu đề mặc định cho ứng dụng khi khởi động
  useEffect(() => {
    document.title = 'MiMo Agriculture';
  }, []);

  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {routes.map((route) => (
              <Route 
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
          <ChatWidget />
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;