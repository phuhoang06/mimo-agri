# TÀI LIỆU CLONE ĐẦY ĐỦ MIMO AGRI (KHÔNG TÓM TẮT)

## 1) Tài liệu kỹ thuật (Technical Documents)

- Tuyến đường hiển thị trang danh sách và chi tiết:
```1:23:src/routes/index.js
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
```
```44:54:src/routes/index.js
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
```

- Dữ liệu nguồn tài liệu kỹ thuật (cấu trúc, nội dung, sections):
```1:38:src/data/technicalDocs.js
/**
 * Technical documents data for HƯỚNG DẪN VÀ CHĂM SÓC section
 */
import productImg1 from '../assets/product/chai-xit/1.png';
import productImg2 from '../assets/product/tam-bay-con-trung/1.png';
import productImg3 from '../assets/product/nap-bay/1.png';
import productImg4 from '../assets/product/tinh-dau/1.png';

export const technicalDocs = [
  {
    id: 1,
    title: "Ruồi vàng đục trái - Kẻ thù lớn của cây ăn quả",
    image: productImg1,
    description: "Tìm hiểu về ruồi vàng đục trái và các biện pháp phòng trừ hiệu quả để bảo vệ vườn cây ăn quả.",
    content: {
      overview: "Đối với nông dân trồng cây ăn trái, ruồi vàng đục trái chính là một trong những kẻ thù lớn nhất bởi chúng gây hại nghiêm trọng đến chất lượng và sản lượng trái cây thu hoạch, từ đó gián tiếp gây ảnh hưởng đến kinh tế của người nông dân. Ruồi vàng đục trái tấn công, gây hại trên 230 loại cây trồng. Cây trồng, trái cây bị ruồi đục và đẻ trứng vào bên trong sẽ bị thối và rụng.",
      sections: [
        {
          title: "Phân loại khoa học",
          content: "Tên khoa học: Bactrocera sp., Bactrocera spp., Bactrocera dorsalis\nHọ: Tephritidae\nBộ: Diptera"
        },
        {
          title: "Đặc điểm hình thái",
          content: "- Trứng: Hình hạt gạo, màu trắng sữa, khi sắp nở thành dòi thì trứng chuyển sang vàng nhạt.\n- Dòi: Mới nở dài khoảng 1.5mm. Dòi phát triển đầy đủ dài 6-8mm, màu vàng nhạt, miệng có móc. Khi phát triển đầy đủ, dòi búng mình rơi xuống đất để hóa nhộng.\n- Nhộng: Dài 5-7mm, có hình trứng dài, lúc đầu màu vàng nâu, khi sắp vũ hóa có màu nâu đỏ.\n- Ruồi trưởng thành: Cơ thể dài 6-9mm, sải cánh rộng 1.3mm, đầu có dạng hình bán cầu, mặt trước màu nâu đỏ với 6 chấm đỏ màu đen. Thân màu vàng nâu đỏ với những vân vàng, cánh trong, hình dạng giống ruồi nhà nhưng nhỏ hơn, hoạt động vào ban ngày."
        },
```
```45:79:src/data/technicalDocs.js
  {
    id: 2,
    title: "Giải pháp ngăn ngừa, quản lý ruồi vàng đục trái",
    image: productImg2,
    description: "Các phương pháp hiệu quả để ngăn ngừa và kiểm soát ruồi vàng đục trái trong vườn cây ăn quả.",
    content: {
      overview: "Ruồi vàng đục trái là một trong những đối tượng gây hại nghiêm trọng cho nhiều loại cây ăn quả. Để bảo vệ vườn cây và nâng cao chất lượng sản phẩm, người nông dân cần áp dụng đồng bộ nhiều giải pháp phòng trừ hiệu quả, an toàn và bền vững.",
      sections: [
        {
          title: "Giải pháp cơ học",
          content: "- Bao trái: Đối với một số loại cây ăn trái nên sử dụng phương pháp bao trái nhằm hạn chế ruồi một cách tốt nhất.\n- Không trồng xen các loại cây ăn trái khác trong vườn để tránh tạo môi trường thuận lợi cho ruồi phát triển.\n- Loại bỏ các cây là ký chủ của ruồi để giảm nguồn thức ăn và nơi sinh sống của chúng.\n- Thu hoạch trái kịp thời, không để trái chín lâu trên cây vì trái chín là mục tiêu ưa thích của ruồi đục trái.\n- Vệ sinh đồng ruộng, vườn trồng, thường xuyên thu toàn bộ trái rụng trên mặt đất và hái trái hư còn đeo trên cây đi tiêu hủy vì là nơi ruồi lưu tồn."
        },
        {
          title: "Giải pháp kiểm soát bằng phương pháp dẫn dụ",
          content: "- Cơ chế sinh sản của ruồi vàng đục trái là con đực giao phối với con cái và sau đó con cái sẽ đẻ trứng vào quả. Vì vậy, có thể sử dụng các biện pháp dẫn dụ để bắt nhốt con đực, từ đó sẽ kiểm soát được việc sinh sản và phát triển gây hại của ruồi vàng đục trái.\n- Tấm bẫy ruồi vàng: Kích thước 21,5cm x 38,5cm, được thiết kế với màu sắc và bề mặt đặc biệt thu hút ruồi đực. Khi đậu vào bẫy, ruồi sẽ bị dính lại."
        },
        {
          title: "Sử dụng bẫy dẫn dụ",
          content: "- Bẫy methyl eugenol: Chất dẫn dụ methyl eugenol có khả năng thu hút ruồi đục trái đực từ xa, giúp giảm đáng kể mật độ ruồi trong vườn.\n- Cách lắp đặt: Treo bẫy cách mặt đất 1,5-2m, phân bố đều trong vườn với mật độ 10-15 bẫy/ha.\n- Thời điểm: Lắp đặt bẫy ngay từ khi cây bắt đầu ra hoa, duy trì liên tục trong suốt quá trình phát triển của quả."
        },
        {
          title: "Giải pháp sinh học",
          content: "- Sử dụng thiên địch: Khuyến khích sự hiện diện của các loài thiên địch như kiến, ong ký sinh, nhện... bằng cách hạn chế sử dụng thuốc hóa học diện rộng.\n- Áp dụng kỹ thuật côn trùng bất dục (SIT): Thả ruồi đục trái đực đã được chiếu xạ để làm bất dục vào môi trường, khi giao phối với ruồi cái trong tự nhiên sẽ không sinh sản được."
        },
        {
          title: "Giải pháp hóa học",
          content: "- Chỉ sử dụng thuốc hóa học khi thật sự cần thiết và theo ngưỡng phòng trừ.\n- Ưu tiên chọn các loại thuốc có nguồn gốc sinh học, ít độc hại với môi trường và thiên địch.\n- Phun thuốc đúng thời điểm, tập trung vào giai đoạn ruồi trưởng thành hoạt động mạnh.\n- Luân phiên sử dụng các loại thuốc có hoạt chất khác nhau để tránh hiện tượng kháng thuốc."
        },
        {
          title: "Quản lý tổng hợp (IPM)",
          content: "- Kết hợp đồng bộ nhiều biện pháp: cơ học, sinh học, dẫn dụ và hóa học để đạt hiệu quả cao nhất.\n- Theo dõi thường xuyên mật độ ruồi trong vườn thông qua hệ thống bẫy giám sát.\n- Áp dụng biện pháp phòng trừ theo ngưỡng kinh tế, chỉ xử lý khi mật độ ruồi vượt ngưỡng.\n- Phối hợp với các vườn lân cận để thực hiện đồng bộ các biện pháp phòng trừ trên diện rộng."
        }
      ]
    }
  }
];
```

- Trang danh sách tài liệu kỹ thuật:
```14:46:src/pages/TechnicalDocuments.jsx
  return (
    <>
      <Header />
      
      <Container className="py-3">
        <Section id="technical-documents" title="TÀI LIỆU KỸ THUẬT">
          <div className="youtube-list">
            {technicalDocs.map(doc => (
              <div key={doc.id} className="youtube-list-item">
                <Row>
                  <Col xs={12} sm={4} md={3}>
                    <Link to={`/tai-lieu-ky-thuat/${doc.id}`}>
                      <div className="tech-doc-thumbnail-container">
                        <img 
                          src={doc.image} 
                          alt={doc.title}
                          className="tech-doc-thumbnail" 
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col xs={12} sm={8} md={9}>
                    <div className="tech-doc-info">
                      <Link to={`/tai-lieu-ky-thuat/${doc.id}`} className="text-decoration-none">
                        <h5 className="tech-doc-title">{doc.title}</h5>
                      </Link>
                      <p className="tech-doc-description">{doc.description}</p>
                      <div className="mt-2">
                        <Link to={`/tai-lieu-ky-thuat/${doc.id}`} className="btn btn-sm btn-outline-primary">
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
```

- Trang chi tiết tài liệu kỹ thuật (lấy theo `:id`):
```10:23:src/pages/TechnicalDocDetail.jsx
function TechnicalDocDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [relatedDocs, setRelatedDocs] = useState([]);
  // Sử dụng hook usePageTitle để thiết lập tiêu đề trang
  usePageTitle(doc ? doc.title : 'Chi tiết tài liệu kỹ thuật');
```


## 2) Liên hệ mua hàng (Contact)

- Route trang Liên hệ:
```61:71:src/routes/index.js
  {
    path: '/lien-he',
    element: <Contact />,
    label: 'Liên hệ',
    showInNav: true
  }
];
```

- Trang Liên hệ (nội dung đầy đủ hiển thị):
```8:41:src/pages/Contact.jsx
function Contact() {
  // Sử dụng hook usePageTitle để thiết lập tiêu đề trang
  usePageTitle('Liên hệ mua hàng');
  
  return (
    <>
      <Header />
      
      <Container className="py-4">
        <Section id="contact" title="LIÊN HỆ">
          <Row>
            <Col lg={6} className="mb-4">
              <h4 className="mb-4">Thông tin liên hệ</h4>
              
              <div className="contact-info">
                <div className="mb-4">
                  <h5><i className="fas fa-map-marker-alt me-2 text-success"></i>Địa chỉ:</h5>
                  <p className="ms-4">Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam</p>
                </div>
                
                <div className="mb-4">
                  <h5><i className="fas fa-phone me-2 text-success"></i>Hotline:</h5>
                  <p className="ms-4">0853.991.995</p>
                </div>
                
                <div className="mb-4">
                  <h5><i className="fab fa-whatsapp me-2 text-success"></i>Zalo:</h5>
                  <p className="ms-4">0853.991.995</p>
                </div>
                
                <div className="mb-4">
                  <h5><i className="fab fa-facebook me-2 text-success"></i>Fanpage:</h5>
                  <p className="ms-4"><a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener">MiMo Agriculture</a></p>
                </div>
```

- Component `ContactInfo` dùng chung (đọc từ constants, có map embed):
```1:22:src/components/molecules/ContactInfo/ContactInfo.jsx
import React from 'react';
import styles from './ContactInfo.module.css';
import { CONTACT_INFO } from '../../../constants';
import Icon from '../../atoms/Icon';

/**
 * ContactInfo component for displaying business contact information
 * 
 * @param {Object} props - Component props
 * @param {Object} [props.contactInfo] - Contact information object (defaults to CONTACT_INFO)
 * @param {boolean} [props.showMap=false] - Whether to show the map embed
 * @param {boolean} [props.showFullAddress=true] - Whether to show the full address or short version
 * @param {string} [props.variant='default'] - Variant style (default, header, footer, widget)
 * @param {string} [props.className=''] - Additional CSS classes
 */
function ContactInfo({
  contactInfo = CONTACT_INFO,
  showMap = false,
  showFullAddress = true,
  variant = 'default',
  className = '',
  ...props
}) {
```

- Cấu hình `CONTACT_INFO` (địa chỉ, phone, email, website, Google Map embed):
```36:48:src/constants/index.js
export const CONTACT_INFO = {
  address: {
    full: 'Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam',
    short: 'Hà Đông, Hà Nội'
  },
  phone: '085 399 1995',
  email: 'mimoagriculture@gmail.com',
  website: 'abc.com',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d245.8737426403957!2d105.79678325846075!3d20.97673811420585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1742700098847!5m2!1svi!2s'
};
```

- TopBar (đầu trang có địa chỉ/điện thoại/email/website + icon):
```4:28:src/components/header/TopBar.jsx
function TopBar() {
  return (
    <div className="top-bar">
      <Container className="d-flex justify-content-between align-items-center flex-wrap py-2">
        <div className="d-flex align-items-center flex-wrap">
          <span className="me-3 mb-1">
            <i className="fas fa-map-marker-alt icon-color me-1"></i>
            <span className="d-none d-md-inline">Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam</span>
            <span className="d-inline d-md-none">Hà Đông, Hà Nội</span>
          </span>
          <span className="me-3 mb-1">
            <i className="fas fa-phone icon-color me-1"></i> 085 399 1995
          </span>
          <span className="me-3 mb-1">
            <i className="fas fa-envelope icon-color me-1"></i> mimoagriculture@gmail.com 
          </span>
          <span className="mb-1">
            <i className="fas fa-globe icon-color me-1"></i> bayruoivang.com
          </span>
        </div>
        <div className="social-icons mt-1">
          <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook mx-1"></i></a>
          <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok mx-1"></i></a>
          <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube mx-1"></i></a>
        </div>
      </Container>
    </div>
  );
}
```


## 3) Chính sách bán hàng (Sales Policy)

- Route + Trang nội dung chi tiết (tabs: đổi trả, vận chuyển, hỗ trợ):
```1:126:src/pages/SalesPolicy.jsx
import React from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePageTitle } from '../hooks';

function SalesPolicy() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("exchange");
  
  // Sử dụng hook usePageTitle để thiết lập tiêu đề trang
  usePageTitle('Chính sách bán hàng');
  
  useEffect(() => {
    // Check if there's a hash in the URL and set the active tab accordingly
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      setActiveTab(hash);
    }
  }, [location]);

  return (
    <>
      <Header />
      
      <Container className="py-4">
        <Section id="sales-policy" title="CHÍNH SÁCH BÁN HÀNG">
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Tab.Container id="policy-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav variant="tabs" className="mb-4">
                      <Nav.Item>
                        <Nav.Link eventKey="exchange">Chính sách đổi trả</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="shipping">Chính sách vận chuyển</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="support">Chính sách hỗ trợ</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    
                    <Tab.Content>
                      
                        <h4 className="mb-3">Cam kết đổi 1 Đổi 1 nếu có lỗi từ NSX</h4>
                        <p className="mb-3">Tại MiMo Agriculture, chúng tôi cam kết đảm bảo chất lượng sản phẩm cung cấp đến khách hàng. Trong trường hợp sản phẩm có lỗi từ nhà sản xuất, chúng tôi sẽ thực hiện chính sách đổi 1 Đổi 1 cho khách hàng.</p>
                        
                        <h5 className="mt-4">Điều kiện áp dụng:</h5>
                        <ul>
                          <li>Sản phẩm còn trong thời hạn bảo hành</li>
                          <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất, không do tác động bên ngoài</li>
                          <li>Sản phẩm còn nguyên tem, nhãn và phụ kiện đi kèm</li>
                        </ul>
                        
                        <h5 className="mt-4">Quy trình đổi trả:</h5>
                        <ol>
                          <li>Thông báo cho MiMo Agriculture qua hotline 0853.991.995 hoặc Zalo</li>
                          <li>Gửi hình ảnh hoặc video mô tả lỗi sản phẩm</li>
                          <li>Nhân viên kỹ thuật sẽ xác nhận lỗi và hướng dẫn thủ tục đổi trả</li>
                          <li>Gửi sản phẩm lỗi về MiMo Agriculture theo hướng dẫn</li>
                          <li>Nhận sản phẩm mới thay thế</li>
                        </ol>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="shipping">
                        
                      
                      <Tab.Pane eventKey="support">
                        <h4 className="mb-3">Hỗ trợ trả lời mọi thắc mắc</h4>
                        <p className="mb-3">MiMo Agriculture cam kết hỗ trợ và giải đáp mọi thắc mắc của khách hàng liên quan đến sản phẩm, đơn hàng và các dịch vụ của chúng tôi. Đội ngũ tư vấn viên chuyên nghiệp sẽ hỗ trợ quý khách một cách nhanh chóng và hiệu quả.</p>
                        
                        <h5 className="mt-4">Kênh hỗ trợ khách hàng:</h5>
                        <ul>
                          <li><strong>Hotline:</strong> 0853.991.995 (8:00 - 18:00, từ Thứ 2 - Chủ Nhật)</li>
                          <li><strong>Zalo:</strong> 0853.991.995</li>
                          <li><strong>Fanpage:</strong> <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener">MiMo Agriculture</a></li>
                          <li><strong>Email:</strong> mimoagriculture@gmail.com</li>
                        </ul>
                        
                        <h5 className="mt-4">Các vấn đề hỗ trợ:</h5>
                        <ul>
                          <li>Tư vấn sản phẩm và kỹ thuật sử dụng</li>
                          <li>Thông tin đơn hàng và vận chuyển</li>
                          <li>Hướng dẫn đổi/trả sản phẩm</li>
                          <li>Khiếu nại và góp ý</li>
                          <li>Tư vấn kỹ thuật trồng trọt và chăm sóc cây</li>
                        </ul>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Section>
      </Container>
      
      <Footer />
    </>
  );
}

export default SalesPolicy; 
```


## 4) Mạng xã hội và các nút/icon (vị trí + link gắn)

- Cấu hình trung tâm `SOCIAL_LINKS`:
```1:34:src/constants/index.js
/**
 * Social media links configuration
 */
export const SOCIAL_LINKS = [
  {
    id: 'facebook',
    url: 'https://www.facebook.com/www.mimo.agri',
    icon: 'fa-facebook',
    prefix: 'fab',
    label: 'Facebook'
  },
  {
    id: 'tiktok',
    url: 'https://www.tiktok.com/@mimo.agriculture',
    icon: 'fa-tiktok',
    prefix: 'fab',
    label: 'TikTok'
  },
  {
    id: 'youtube',
    url: 'https://www.youtube.com/@MiMoAgriculture',
    icon: 'fa-youtube',
    prefix: 'fab',
    label: 'Youtube'
  },
  {
    id: 'zalo',
    url: 'https://zalo.me/0853991995',
    icon: 'fa-comment',
    prefix: 'fas',
    label: 'Zalo',
    className: 'zalo-icon'
  }
];
```

- Component render icon/link theo cấu hình:
```1:49:src/components/molecules/SocialLinks/SocialLinks.jsx
function SocialLinks({
  links = SOCIAL_LINKS,
  variant = 'default',
  className = '',
  ...props
}) {
  // Map variant to style class
  const variantClass = variant !== 'default' ? styles[`${variant}Style`] : '';
  
  // Generate class names
  const containerClass = [
    styles.container,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass} {...props}>
      {links.map(link => (
        <a 
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.link} ${link.className || ''}`}
          aria-label={link.label}
        >
          <Icon
            name={link.icon}
            prefix={link.prefix || 'fab'}
            size={variant === 'footer' ? 'xl' : 'lg'}
          />
        </a>
      ))}
    </div>
  );
}
```

- Icon mạng xã hội tại TopBar:
```24:28:src/components/header/TopBar.jsx
        <div className="social-icons mt-1">
          <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook mx-1"></i></a>
          <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok mx-1"></i></a>
          <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube mx-1"></i></a>
        </div>
```

- Icon mạng xã hội tại Footer + nhúng Fanpage:
```16:44:src/components/footer/Footer.jsx
            <div className="d-flex mt-3 justify-content-center justify-content-lg-start">
              <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" className="me-3"><i className="fab fa-facebook-square fa-2x text-white"></i></a>
              <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener" className="me-3"><i className="fab fa-tiktok fa-2x text-white"></i></a>
              <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener" className="me-3"><i className="fab fa-youtube fa-2x text-white"></i></a>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb- text-white" style={{ whiteSpace: 'nowrap' }}>Fanpage Mimo Agriculture</h5>
            <div className="mt-2 map-responsive">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwww.mimo.agri&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="350"
              style={{ border: 'none', overflow: 'hidden' }}
              allowFullScreen={true}
              title="Facebook Page"
            ></iframe>
            </div>
```

- Nút mua hàng (button + icon + hành vi) tại trang chi tiết sản phẩm:
```28:55:src/components/product/ProductActions.jsx
      <div className="buy-now-btn-wrapper mb-4">
        <Row className="g-1">
          <Col xs={6} className="pe-1">
            <Button 
              variant="success" 
              className="w-100"
              onClick={onBuyNow}
              icon="fab fa-facebook-messenger"
              useBootstrap={true}
              isFullWidth={true}
              disabled={isOutOfStock}
            >
              <span className="d-none d-sm-inline">Mua qua </span>Messenger
            </Button>
          </Col>
          <Col xs={6} className="ps-1">
            <Button 
              variant="info" 
              className="w-100 text-white"
              onClick={onZaloBuy}
              icon="fas fa-comment-alt"
              useBootstrap={true}
              isFullWidth={true}
              disabled={isOutOfStock}
            >
              <span className="d-none d-sm-inline">Mua qua </span>Zalo
            </Button>
          </Col>
        </Row>
      </div>
```

- Link động mở Messenger/Zalo gắn theo sản phẩm, biến thể, số lượng, URL hiện tại:
```164:191:src/pages/ProductDetail.jsx
  const handleBuyNow = () => {
    // Get current product information
    const currentUrl = window.location.href;
    const variantText = formatVariantText();
    const priceText = getProductPrice().toLocaleString();
    const productInfo = `Tôi muốn mua sản phẩm: ${product.title}${variantText}\nGiá: ${priceText}đ\nSố lượng: ${quantity}\nLink: ${currentUrl}`;
    const encodedMessage = encodeURIComponent(productInfo);
    
    // Use direct Facebook Messenger URL that works better for both mobile and desktop
    const messengerUrl = `https://m.me/108621171549372?ref=${encodedMessage}`;
    
    // Open in new tab and ensure it opens
    window.open(messengerUrl, '_blank', 'noopener,noreferrer');
  };
  // Function to handle buying through Zalo
  const handleZaloBuy = () => {
    if (product) {
      // Create message with product info
      const currentUrl = window.location.href;
      const variantText = formatVariantText();
      const priceText = getProductPrice().toLocaleString();
      const message = encodeURIComponent(`Tôi muốn mua sản phẩm: ${product.title}${variantText}\nGiá: ${priceText}đ\nSố lượng: ${quantity}\nLink: ${currentUrl}`);
      
      // Open Zalo with the shop's phone number and template message
      const zaloUrl = `https://zalo.me/0853991995?text=${message}`;
      window.open(zaloUrl, '_blank', 'noopener,noreferrer');
    }
  };
```

- Google Maps Embed URL (có thể dùng trong iframe ở trang Liên hệ/Chân trang):
```39:47:src/constants/index.js
export const CONTACT_INFO = {
  address: {
    full: 'Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam',
    short: 'Hà Đông, Hà Nội'
  },
  phone: '085 399 1995',
  email: 'mimoagriculture@gmail.com',
  website: 'abc.com',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d245.8737426403957!2d105.79678325846075!3d20.97673811420585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1742700098847!5m2!1svi!2s'
};
```

## 5) Ghi chú clone
- Thay ID Messenger Page nếu cần: trong `ProductDetail.jsx` (`https://m.me/108621171549372?...`).
- Thay số Zalo trong `SOCIAL_LINKS` và `ProductDetail.jsx`: `0853991995`.
- Thay liên kết mạng xã hội trong `SOCIAL_LINKS`, `TopBar.jsx`, `Footer.jsx`.
- Nếu muốn dùng 1 nguồn cấu hình, ưu tiên `SOCIAL_LINKS` + `SocialLinks.jsx` cho cả Header/Footer.
- Map embed: dùng `CONTACT_INFO.mapEmbedUrl` nhúng iframe Google Maps.
