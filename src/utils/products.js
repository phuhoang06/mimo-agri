// Import product images
import product1 from '../assets/product/product1.png';
import product2 from '../assets/product/product2.png';
import product3 from '../assets/product/product3.png';
import product4 from '../assets/product/product4.png';

// Định nghĩa các danh mục sản phẩm
export const productCategories = [
  { id: 'bay-ruoi-vang', name: 'Bầy Ruồi Vàng - Côn Trùng' },
  { id: 'hat-giong-mua-he', name: 'Hạt Giống Mùa Hè' },
  { id: 'hat-giong-mua-thu', name: 'Hạt Giống Mùa Thu' },
  { id: 'hat-giong-mua-dong', name: 'Hạt Giống Mùa Đông' },
  { id: 'dung-cu', name: 'Dụng Cụ Cuốc - Xẻng - Kéo' },
  { id: 'voi-tuoi-cay', name: 'Vòi Tưới Cây' },
  { id: 'dat-phan-bon-thuoc', name: 'Đất - Phân Bón - Thuốc' },
];

// Danh sách tất cả sản phẩm với thông tin đầy đủ bao gồm cả danh mục
export const allProducts = [
  { 
    id: 1,
    img: product1, 
    images: [product1, product2, product3, product4],
    title: 'Chai Xịt Bẫy Ruồi Vàng', 
    price: 99000, 
    oldPrice: 120000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: false,
    description: 'Chai xịt bẫy ruồi vàng thế hệ mới, hiệu quả cao và thân thiện với môi trường.',
    detailedDescription: `
      <p>Chai xịt bẫy ruồi vàng thế hệ mới, hiệu quả cao và thân thiện với môi trường.</p>
      <ul>
        <li>Bẫy ruồi vàng hiệu quả nhất hiện nay</li>
        <li>Công nghệ Nhật Bản</li>
        <li>An toàn với cây trồng</li>
        <li>Không độc hại với con người và vật nuôi</li>
      </ul>
      <p>Hướng dẫn sử dụng:</p>
      <ol>
        <li>Lắc đều trước khi sử dụng</li>
        <li>Xịt đều và cách ly ruồi vàng 30 phút</li>
        <li>Sử dụng 2-3 lần/tuần để hiệu quả tốt nhất</li>
      </ol>
    `,
    videoUrl: 'https://example.com/videos/product1.mp4',
    specifications: [
      { name: "Xuất xứ", value: "Việt Nam" },
      { name: "Dung tích", value: "500ml" },
      { name: "Thành phần", value: "Chiết xuất thảo mộc" },
      { name: "Hạn sử dụng", value: "24 tháng" },
    ],
    tags: ['ruồi vàng', 'bẫy côn trùng', 'thuốc trừ sâu', 'nông nghiệp']
  },
  { 
    id: 2,
    img: product2, 
    images: [product2, product3, product4, product1],
    title: 'Vòi xịt phun sương', 
    price: 125000, 
    oldPrice: 145000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: false,
    description: 'Vòi xịt phun sương đa năng, phù hợp cho tưới cây và làm mát.',
    detailedDescription: `
      <p>Vòi xịt phun sương đa năng, phù hợp cho tưới cây và làm mát.</p>
      <ul>
        <li>Chất liệu nhựa ABS cao cấp</li>
        <li>Điều chỉnh được áp lực nước</li>
        <li>Phun sương đều mịn</li>
        <li>Kết nối với đa dạng loại ống nước</li>
      </ul>
      <p>Ứng dụng:</p>
      <ul>
        <li>Tưới cây trong nhà và ngoài vườn</li>
        <li>Phun sương làm mát trong mùa hè</li>
        <li>Rửa xe và các thiết bị ngoài trời</li>
      </ul>
    `,
    videoUrl: 'https://example.com/videos/product2.mp4',
    specifications: [
      { name: "Xuất xứ", value: "Đài Loan" },
      { name: "Chất liệu", value: "Nhựa ABS" },
      { name: "Kích thước", value: "25cm x 10cm" },
      { name: "Trọng lượng", value: "200g" },
    ],
    tags: ['vòi phun', 'phun sương', 'tưới cây', 'làm vườn']
  },
  { 
    id: 3,
    img: product3, 
    title: 'Bột rửa chén', 
    price: 89000, 
    oldPrice: 105000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: true,
    isNew: false,
    description: 'Bột rửa chén sinh học, an toàn cho người sử dụng và môi trường.',
    tags: ['bột rửa chén', 'sinh học', 'hóa chất', 'vệ sinh']
  },
  { 
    id: 4,
    img: product4, 
    title: 'Rau cải ngọt lùn', 
    price: 99000, 
    oldPrice: 120000, 
    categoryId: 'hat-giong-mua-he',
    isTopSelling: false,
    isNew: true,
    description: 'Hạt giống rau cải ngọt lùn, dễ trồng, năng suất cao, thích hợp cho vụ hè.',
    tags: ['hạt giống', 'rau cải', 'mùa hè', 'dễ trồng', 'vườn rau']
  },
  { 
    id: 5,
    img: product1, 
    title: 'Chai Xịt Bẫy Ruồi Vàng Loại 2', 
    price: 89000, 
    oldPrice: 110000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: false,
    description: 'Chai xịt bẫy ruồi vàng loại 2, giá cả phải chăng, hiệu quả ổn định.',
    tags: ['ruồi vàng', 'bẫy côn trùng', 'loại 2', 'giá rẻ']
  },
  { 
    id: 6,
    img: product2, 
    title: 'Vòi xịt phun sương cao cấp', 
    price: 145000, 
    oldPrice: 165000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: false,
    description: 'Vòi xịt phun sương cao cấp, điều chỉnh được áp lực nước, độ bền cao.',
    tags: ['vòi phun', 'cao cấp', 'điều chỉnh', 'áp lực nước', 'bền']
  },
  { 
    id: 7,
    img: product3, 
    title: 'Bột rửa chén hương chanh', 
    price: 95000, 
    oldPrice: 115000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: true,
    isNew: false,
    description: 'Bột rửa chén với hương chanh tự nhiên, tẩy sạch vết bẩn cứng đầu.',
    tags: ['bột rửa chén', 'hương chanh', 'tẩy rửa', 'vệ sinh']
  },
  { 
    id: 8,
    img: product4, 
    title: 'Rau cải ngọt mùa thu', 
    price: 88000, 
    oldPrice: 109000, 
    categoryId: 'hat-giong-mua-thu',
    isTopSelling: false,
    isNew: true,
    description: 'Hạt giống rau cải ngọt đặc biệt cho mùa thu, khả năng chống chịu sâu bệnh tốt.',
    tags: ['hạt giống', 'rau cải', 'mùa thu', 'chống sâu bệnh']
  },
  { 
    id: 9,
    img: product4, 
    title: 'Rau cải ngọt mùa đông', 
    price: 92000, 
    oldPrice: 112000, 
    categoryId: 'hat-giong-mua-dong',
    isTopSelling: false,
    isNew: true,
    description: 'Hạt giống rau cải ngọt chịu lạnh tốt, phù hợp với khí hậu mùa đông.',
    tags: ['hạt giống', 'rau cải', 'mùa đông', 'chịu lạnh']
  },
  { 
    id: 10,
    img: product2, 
    title: 'Cuốc làm vườn mini', 
    price: 78000, 
    oldPrice: 98000, 
    categoryId: 'dung-cu',
    isTopSelling: false,
    isNew: true,
    description: 'Cuốc làm vườn mini, nhỏ gọn, dễ sử dụng cho việc làm vườn hàng ngày.',
    tags: ['cuốc', 'làm vườn', 'mini', 'dụng cụ', 'nhỏ gọn']
  },
  { 
    id: 11,
    img: product1, 
    title: 'Bẫy Ruồi Dạng Lọ', 
    price: 115000, 
    oldPrice: 145000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: false,
    isNew: true,
    description: 'Bẫy ruồi vàng dạng lọ, hiệu quả lâu dài, dễ sử dụng.',
    tags: ['bẫy ruồi', 'lọ', 'lâu dài', 'dễ sử dụng']
  },
  { 
    id: 12,
    img: product2, 
    title: 'Vòi Tưới Cây Mini', 
    price: 85000, 
    oldPrice: 110000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: false,
    isNew: true,
    description: 'Vòi tưới cây mini tiện lợi, dễ sử dụng trong nhà và ban công.',
    tags: ['vòi tưới', 'mini', 'trong nhà', 'ban công']
  },
  { 
    id: 13,
    img: product3, 
    title: 'Phân Bón Hữu Cơ', 
    price: 120000, 
    oldPrice: 150000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: true,
    isNew: false,
    description: 'Phân bón hữu cơ cao cấp, giúp cây phát triển khỏe mạnh và bền vững.',
    tags: ['phân bón', 'hữu cơ', 'cao cấp', 'cây trồng']
  },
  { 
    id: 14,
    img: product4, 
    title: 'Hạt Giống Cà Chua Cherry', 
    price: 65000, 
    oldPrice: 85000, 
    categoryId: 'hat-giong-mua-he',
    isTopSelling: true,
    isNew: false,
    description: 'Hạt giống cà chua cherry chất lượng cao, dễ trồng và cho năng suất tốt.',
    tags: ['hạt giống', 'cà chua cherry', 'mùa hè', 'dễ trồng']
  },
  { 
    id: 15,
    img: product1, 
    title: 'Kéo Cắt Cành Nhỏ', 
    price: 135000, 
    oldPrice: 160000, 
    categoryId: 'dung-cu',
    isTopSelling: true,
    isNew: false,
    description: 'Kéo cắt cành nhỏ chất lượng cao, lưỡi sắc bén và bền lâu.',
    tags: ['kéo', 'cắt cành', 'dụng cụ', 'lưỡi sắc']
  },
  { 
    id: 16,
    img: product2, 
    title: 'Hạt Giống Bí Ngòi', 
    price: 75000, 
    oldPrice: 95000, 
    categoryId: 'hat-giong-mua-thu',
    isTopSelling: false,
    isNew: true,
    description: 'Hạt giống bí ngòi chất lượng cao, thích hợp trồng vào mùa thu.',
    tags: ['hạt giống', 'bí ngòi', 'mùa thu', 'dễ trồng']
  },
  { 
    id: 17,
    img: product3, 
    title: 'Thuốc Diệt Sâu Sinh Học', 
    price: 139000, 
    oldPrice: 170000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: false,
    isNew: true,
    description: 'Thuốc diệt sâu sinh học an toàn cho cây trồng và người sử dụng.',
    tags: ['thuốc diệt sâu', 'sinh học', 'an toàn', 'bảo vệ thực vật']
  },
  { 
    id: 18,
    img: product4, 
    title: 'Hạt Giống Củ Cải Trắng', 
    price: 55000, 
    oldPrice: 70000, 
    categoryId: 'hat-giong-mua-dong',
    isTopSelling: true,
    isNew: false,
    description: 'Hạt giống củ cải trắng chất lượng cao, thích hợp trồng vào mùa đông.',
    tags: ['hạt giống', 'củ cải trắng', 'mùa đông', 'chịu lạnh']
  },
  { 
    id: 19,
    img: product1, 
    title: 'Bẫy Côn Trùng Tự Động', 
    price: 320000, 
    oldPrice: 380000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: true,
    description: 'Bẫy côn trùng tự động với đèn LED, hoạt động bằng năng lượng mặt trời.',
    tags: ['bẫy côn trùng', 'tự động', 'LED', 'năng lượng mặt trời']
  },
  { 
    id: 20,
    img: product2, 
    title: 'Xẻng Làm Vườn', 
    price: 95000, 
    oldPrice: 125000, 
    categoryId: 'dung-cu',
    isTopSelling: false,
    isNew: false,
    description: 'Xẻng làm vườn chất lượng cao, tay cầm chắc chắn, dễ sử dụng.',
    tags: ['xẻng', 'làm vườn', 'dụng cụ', 'chắc chắn']
  },
  { 
    id: 21,
    img: product3, 
    title: 'Đất Trồng Cây Kiểng', 
    price: 65000, 
    oldPrice: 80000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: false,
    isNew: false,
    description: 'Đất trồng cây kiểng chất lượng cao, giàu dinh dưỡng, thoát nước tốt.',
    tags: ['đất trồng', 'cây kiểng', 'dinh dưỡng', 'thoát nước']
  },
  { 
    id: 22,
    img: product4, 
    title: 'Hạt Giống Cải Thìa', 
    price: 45000, 
    oldPrice: 60000, 
    categoryId: 'hat-giong-mua-he',
    isTopSelling: true,
    isNew: false,
    description: 'Hạt giống cải thìa chất lượng cao, dễ trồng và chăm sóc.',
    tags: ['hạt giống', 'cải thìa', 'mùa hè', 'dễ trồng']
  },
  { 
    id: 23,
    img: product1, 
    title: 'Vòi Phun Nước Tự Động', 
    price: 185000, 
    oldPrice: 220000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: false,
    description: 'Vòi phun nước tự động với hẹn giờ, tiện lợi cho việc tưới cây.',
    tags: ['vòi phun', 'tự động', 'hẹn giờ', 'tiện lợi']
  },
  { 
    id: 24,
    img: product2, 
    title: 'Hạt Giống Bắp Cải Tím', 
    price: 68000, 
    oldPrice: 85000, 
    categoryId: 'hat-giong-mua-thu',
    isTopSelling: false,
    isNew: true,
    description: 'Hạt giống bắp cải tím nhập khẩu, thích hợp trồng vào mùa thu.',
    tags: ['hạt giống', 'bắp cải tím', 'mùa thu', 'nhập khẩu']
  },
  { 
    id: 25,
    img: product3, 
    title: 'Phân Bón Lá', 
    price: 75000, 
    oldPrice: 95000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: false,
    isNew: true,
    description: 'Phân bón lá chất lượng cao, giúp cây phát triển xanh tốt.',
    tags: ['phân bón', 'bón lá', 'chất lượng cao', 'phát triển']
  },
  { 
    id: 26,
    img: product4, 
    title: 'Hạt Giống Su Hào', 
    price: 52000, 
    oldPrice: 70000, 
    categoryId: 'hat-giong-mua-dong',
    isTopSelling: false,
    isNew: false,
    description: 'Hạt giống su hào chất lượng cao, thích hợp trồng vào mùa đông.',
    tags: ['hạt giống', 'su hào', 'mùa đông', 'chịu lạnh']
  },
  { 
    id: 27,
    img: product1, 
    title: 'Miếng Dán Bẫy Ruồi', 
    price: 45000, 
    oldPrice: 60000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: false,
    isNew: false,
    description: 'Miếng dán bẫy ruồi hiệu quả, dễ sử dụng, không độc hại.',
    tags: ['miếng dán', 'bẫy ruồi', 'hiệu quả', 'không độc hại']
  },
  { 
    id: 28,
    img: product2, 
    title: 'Cào Làm Vườn Mini', 
    price: 65000, 
    oldPrice: 85000, 
    categoryId: 'dung-cu',
    isTopSelling: false,
    isNew: true,
    description: 'Cào làm vườn mini chất lượng cao, tiện lợi cho việc làm vườn nhỏ.',
    tags: ['cào', 'làm vườn', 'mini', 'tiện lợi']
  },
  { 
    id: 29,
    img: product3, 
    title: 'Thuốc Kích Thích Tăng Trưởng', 
    price: 115000, 
    oldPrice: 140000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: true,
    isNew: true,
    description: 'Thuốc kích thích tăng trưởng cho cây, giúp cây phát triển nhanh và khỏe mạnh.',
    tags: ['kích thích', 'tăng trưởng', 'phát triển', 'cây trồng']
  },
  { 
    id: 30,
    img: product4, 
    title: 'Hạt Giống Xà Lách', 
    price: 35000, 
    oldPrice: 45000, 
    categoryId: 'hat-giong-mua-he',
    isTopSelling: true,
    isNew: false,
    description: 'Hạt giống xà lách chất lượng cao, dễ trồng và thu hoạch nhanh.',
    tags: ['hạt giống', 'xà lách', 'mùa hè', 'thu hoạch nhanh']
  },
  { 
    id: 31,
    img: product1, 
    title: 'Hệ Thống Tưới Nhỏ Giọt', 
    price: 250000, 
    oldPrice: 300000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: true,
    description: 'Hệ thống tưới nhỏ giọt tự động, tiết kiệm nước và công sức.',
    tags: ['tưới nhỏ giọt', 'tự động', 'tiết kiệm nước', 'hiệu quả']
  },
  { 
    id: 32,
    img: product2, 
    title: 'Hạt Giống Cà Rốt', 
    price: 40000, 
    oldPrice: 55000, 
    categoryId: 'hat-giong-mua-thu',
    isTopSelling: false,
    isNew: false,
    description: 'Hạt giống cà rốt chất lượng cao, thích hợp trồng vào mùa thu.',
    tags: ['hạt giống', 'cà rốt', 'mùa thu', 'chất lượng']
  },
  { 
    id: 33,
    img: product3, 
    title: 'Thuốc Phòng Nấm Bệnh', 
    price: 130000, 
    oldPrice: 160000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: false,
    isNew: true,
    description: 'Thuốc phòng nấm bệnh cho cây trồng, hiệu quả và an toàn.',
    tags: ['thuốc', 'phòng nấm', 'bệnh', 'cây trồng']
  },
  { 
    id: 34,
    img: product4, 
    title: 'Hạt Giống Cải Bắp', 
    price: 50000, 
    oldPrice: 65000, 
    categoryId: 'hat-giong-mua-dong',
    isTopSelling: true,
    isNew: false,
    description: 'Hạt giống cải bắp chất lượng cao, thích hợp trồng vào mùa đông.',
    tags: ['hạt giống', 'cải bắp', 'mùa đông', 'chịu lạnh']
  },
  { 
    id: 35,
    img: product1, 
    title: 'Keo Bẫy Chuột', 
    price: 70000, 
    oldPrice: 90000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: false,
    isNew: true,
    description: 'Keo bẫy chuột hiệu quả, không độc hại cho con người và vật nuôi.',
    tags: ['keo', 'bẫy chuột', 'hiệu quả', 'không độc hại']
  },
  { 
    id: 36,
    img: product2, 
    title: 'Bình Xịt Tay', 
    price: 85000, 
    oldPrice: 105000, 
    categoryId: 'dung-cu',
    isTopSelling: true,
    isNew: false,
    description: 'Bình xịt tay chất lượng cao, dung tích lớn, dễ sử dụng.',
    tags: ['bình xịt', 'tay', 'dung tích lớn', 'dễ sử dụng']
  },
  { 
    id: 37,
    img: product3, 
    title: 'Đất Trồng Rau Sạch', 
    price: 55000, 
    oldPrice: 70000, 
    categoryId: 'dat-phan-bon-thuoc',
    isTopSelling: true,
    isNew: false,
    description: 'Đất trồng rau sạch chất lượng cao, không chứa hóa chất độc hại.',
    tags: ['đất trồng', 'rau sạch', 'không hóa chất', 'chất lượng cao']
  },
  { 
    id: 38,
    img: product4, 
    title: 'Hạt Giống Dưa Leo', 
    price: 45000, 
    oldPrice: 60000, 
    categoryId: 'hat-giong-mua-he',
    isTopSelling: false,
    isNew: true,
    description: 'Hạt giống dưa leo chất lượng cao, thích hợp trồng vào mùa hè.',
    tags: ['hạt giống', 'dưa leo', 'mùa hè', 'dễ trồng']
  },
  { 
    id: 39,
    img: product1, 
    title: 'Đầu Vòi Tưới Đa Năng', 
    price: 95000, 
    oldPrice: 125000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: false,
    isNew: true,
    description: 'Đầu vòi tưới đa năng với nhiều chế độ phun khác nhau.',
    tags: ['đầu vòi', 'tưới', 'đa năng', 'nhiều chế độ']
  },
  { 
    id: 40,
    img: product2, 
    title: 'Hạt Giống Ớt Chuông', 
    price: 60000, 
    oldPrice: 80000, 
    categoryId: 'hat-giong-mua-thu',
    isTopSelling: true,
    isNew: true,
    description: 'Hạt giống ớt chuông nhiều màu, thích hợp trồng vào mùa thu.',
    tags: ['hạt giống', 'ớt chuông', 'nhiều màu', 'mùa thu']
  }
];

// Lấy danh sách sản phẩm bán chạy
export const topSellingProducts = allProducts.filter(product => product.isTopSelling);

// Lấy danh sách sản phẩm mới
export const newProducts = allProducts.filter(product => product.isNew);

// Các hàm helper

// Lấy danh sách sản phẩm theo danh mục
export const getProductsByCategory = (categoryId) => {
  return allProducts.filter(product => product.categoryId === categoryId);
};

// Lấy sản phẩm theo ID
export const getProductById = (productId) => {
  return allProducts.find(product => product.id === parseInt(productId));
};

/**
 * Tìm kiếm sản phẩm dựa trên từ khóa
 * @param {string} keyword Từ khóa tìm kiếm
 * @param {number} limit Số lượng sản phẩm tối đa trả về
 * @returns {Array} Danh sách sản phẩm phù hợp với từ khóa
 */
export function searchProducts(keyword, limit = 50) {
  if (!keyword || typeof keyword !== 'string') {
    return [];
  }

  // Chuyển từ khóa sang chữ thường và tách thành các từ riêng lẻ
  const searchTerms = keyword.toLowerCase().trim().split(/\s+/);
  
  // Tạo một object để lưu trữ điểm số cho mỗi sản phẩm
  const productScores = {};
  
  // Duyệt qua từng sản phẩm và tính điểm dựa trên mức độ phù hợp
  allProducts.forEach(product => {
    let score = 0;
    
    // Chuyển các thuộc tính của sản phẩm sang chữ thường để so sánh
    const title = product.title.toLowerCase();
    const description = product.description ? product.description.toLowerCase() : '';
    const tags = product.tags ? product.tags.map(tag => tag.toLowerCase()) : [];
    
    // Lấy thông tin danh mục của sản phẩm
    const category = productCategories.find(cat => cat.id === product.categoryId);
    const categoryName = category ? category.name.toLowerCase() : '';
    
    // Tính điểm cho từng từ khóa tìm kiếm
    searchTerms.forEach(term => {
      // Khớp chính xác trong tiêu đề (+10 điểm)
      if (title === term) {
        score += 10;
      }
      // Tiêu đề bắt đầu bằng từ khóa (+8 điểm)
      else if (title.startsWith(term)) {
        score += 8;
      }
      // Từ khóa xuất hiện trong tiêu đề (+5 điểm)
      else if (title.includes(term)) {
        score += 5;
      }
      
      // Từ khóa xuất hiện trong mô tả (+3 điểm)
      if (description.includes(term)) {
        score += 3;
      }
      
      // Từ khóa xuất hiện trong tags (+4 điểm)
      if (tags.some(tag => tag.includes(term) || term.includes(tag))) {
        score += 4;
      }
      
      // Từ khóa xuất hiện trong tên danh mục (+2 điểm)
      if (categoryName.includes(term)) {
        score += 2;
      }
      
      // Điểm thưởng cho các sản phẩm bán chạy hoặc mới
      if (topSellingProducts.some(p => p.id === product.id)) {
        score += 1;
      }
      
      if (newProducts.some(p => p.id === product.id)) {
        score += 0.5;
      }
    });
    
    // Lưu điểm của sản phẩm nếu có điểm số lớn hơn 0
    if (score > 0) {
      productScores[product.id] = { product, score };
    }
  });
  
  // Chuyển đổi điểm số thành mảng và sắp xếp theo điểm giảm dần
  const scoredProducts = Object.values(productScores)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
  
  // Trả về số lượng sản phẩm theo giới hạn
  return scoredProducts.slice(0, limit);
}

// Lọc sản phẩm theo khoảng giá
export const filterProductsByPrice = (products, minPrice, maxPrice) => {
  return products.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};

// Sắp xếp sản phẩm
export const sortProducts = (products, sortType) => {
  const productsCopy = [...products];
  
  switch (sortType) {
    case 'price-asc':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
    case 'newest':
      return productsCopy.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
    case 'popular':
      return productsCopy.sort((a, b) => (a.isTopSelling === b.isTopSelling) ? 0 : a.isTopSelling ? -1 : 1);
    default:
      return productsCopy;
  }
};

// Loại bỏ sản phẩm trùng lặp, sử dụng id để đảm bảo tính duy nhất
export const getUniqueProducts = (products) => {
  // Sử dụng id thay vì title để tránh trường hợp trùng tên nhưng là sản phẩm khác nhau
  return Array.from(new Map(products.map(item => [item.id, item])).values());
};

/**
 * Lấy sản phẩm liên quan đến một sản phẩm cụ thể
 * @param {number|string} productId ID của sản phẩm cần tìm sản phẩm liên quan
 * @param {number} limit Số lượng sản phẩm tối đa trả về
 * @returns {Array} Danh sách sản phẩm liên quan
 */
export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  
  // Tạo một object để lưu trữ điểm số cho mỗi sản phẩm
  const relatedScores = {};
  
  // Lấy thông tin danh mục của sản phẩm
  const productCategory = product.categoryId;
  
  // Duyệt qua từng sản phẩm và tính điểm dựa trên mức độ liên quan
  allProducts.forEach(p => {
    // Bỏ qua chính sản phẩm đang xét
    if (p.id === product.id) return;
    
    let score = 0;
    
    // Cùng danh mục (+5 điểm)
    if (p.categoryId === productCategory) {
      score += 5;
    }
    
    // Khoảng giá tương tự (±20%) (+3 điểm)
    const priceDiff = Math.abs(p.price - product.price);
    const priceThreshold = product.price * 0.2;
    if (priceDiff <= priceThreshold) {
      score += 3;
    }
    
    // Có tags chung (+2 điểm mỗi tag)
    if (product.tags && p.tags) {
      const productTags = product.tags.map(tag => tag.toLowerCase());
      const pTags = p.tags.map(tag => tag.toLowerCase());
      
      const matchingTags = productTags.filter(tag => pTags.includes(tag));
      score += matchingTags.length * 2;
    }
    
    // Lưu điểm của sản phẩm nếu có điểm số lớn hơn 0
    if (score > 0) {
      relatedScores[p.id] = { product: p, score };
    }
  });
  
  // Chuyển đổi điểm số thành mảng và sắp xếp theo điểm giảm dần
  const scoredRelated = Object.values(relatedScores)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
  
  // Trả về số lượng sản phẩm theo giới hạn
  return scoredRelated.slice(0, limit);
}

/**
 * Lấy sản phẩm tương tự dựa trên các tags
 * @param {number|string} productId ID của sản phẩm cần tìm sản phẩm tương tự
 * @param {number} limit Số lượng sản phẩm tối đa trả về
 * @returns {Array} Danh sách sản phẩm tương tự
 */
export function getSimilarProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product || !product.tags || product.tags.length === 0) return [];
  
  // Chuyển các tags sang chữ thường
  const productTags = product.tags.map(tag => tag.toLowerCase());
  
  // Tạo một object để lưu trữ điểm số cho mỗi sản phẩm
  const similarScores = {};
  
  // Duyệt qua từng sản phẩm và tính điểm dựa trên mức độ tương tự
  allProducts.forEach(p => {
    // Bỏ qua chính sản phẩm đang xét
    if (p.id === product.id) return;
    
    // Bỏ qua nếu sản phẩm không có tags
    if (!p.tags || p.tags.length === 0) return;
    
    let score = 0;
    const pTags = p.tags.map(tag => tag.toLowerCase());
    
    // Tính số lượng tags trùng khớp
    const matchingTags = productTags.filter(tag => pTags.includes(tag));
    score = matchingTags.length * 2;
    
    // Lưu điểm của sản phẩm nếu có điểm số lớn hơn 0
    if (score > 0) {
      similarScores[p.id] = { product: p, score };
    }
  });
  
  // Chuyển đổi điểm số thành mảng và sắp xếp theo điểm giảm dần
  const scoredSimilar = Object.values(similarScores)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
  
  // Trả về số lượng sản phẩm theo giới hạn
  return scoredSimilar.slice(0, limit);
}