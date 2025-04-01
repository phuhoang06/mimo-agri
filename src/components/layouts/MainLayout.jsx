import React from 'react';
import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import ChatWidget from '../chat/ChatWidget.jsx';
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
      <ChatWidget />
      <ScrollToTop />
    </>
  );
};

export default MainLayout; 