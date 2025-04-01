import { lazy } from 'react';
import { isFeatureEnabled, FEATURE_NAMES } from '../utils/featureFlags';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home.jsx'));
const Order = lazy(() => import('../pages/Order.jsx'));
const Products = lazy(() => import('../pages/Products.jsx'));
const ProductDetail = lazy(() => import('../pages/ProductDetail.jsx'));
const AllVideos = lazy(() => import('../pages/AllVideos.jsx'));
const TechnicalDocuments = lazy(() => import('../pages/TechnicalDocuments.jsx'));
const TechnicalDocDetail = lazy(() => import('../pages/TechnicalDocDetail.jsx'));
const AboutUs = lazy(() => import('../pages/AboutUs.jsx'));
const SalesPolicy = lazy(() => import('../pages/SalesPolicy.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));

/**
 * Cấu trúc route cho ứng dụng
 * Dùng để quản lý tất cả các đường dẫn một cách tập trung
 */
const routes = [
  {
    path: '/',
    element: <Home />,
    label: 'Trang chủ',
    showInNav: true
  },
  {
    path: '/san-pham',
    element: <Products />,
    label: 'Sản phẩm',
    showInNav: true
  },
  {
    path: '/san-pham/:productId',
    element: <ProductDetail />,
    showInNav: false
  },
  {
    path: '/videos',
    element: <AllVideos />,
    label: 'Videos',
    showInNav: true
  },
  {
    path: '/tai-lieu-ky-thuat',
    element: <TechnicalDocuments />,
    label: 'Tài liệu kỹ thuật',
    showInNav: true
  },
  {
    path: '/tai-lieu-ky-thuat/:id',
    element: <TechnicalDocDetail />,
    showInNav: false
  },
  {
    path: '/ve-chung-toi',
    element: <AboutUs />,
    label: 'Về chúng tôi',
    showInNav: true
  },
  {
    path: '/chinh-sach-ban-hang',
    element: <SalesPolicy />,
    label: 'Chính sách bán hàng',
    showInNav: true
  },
  {
    path: '/lien-he',
    element: <Contact />,
    label: 'Liên hệ',
    showInNav: true
  }
];

// Thêm trang Order nếu feature cart được bật
if (isFeatureEnabled(FEATURE_NAMES.SHOPPING_CART)) {
  routes.push({
    path: '/order',
    element: <Order />,
    label: 'Đặt hàng',
    showInNav: false
  });
}

export default routes; 