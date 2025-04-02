import React from 'react';
import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import { ScrollToTop } from '../ui';

/**
 * Layout chung cho tất cả các trang
 * Giúp tránh việc lặp lại code Header và Footer trong mỗi trang
 */
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default MainLayout; 