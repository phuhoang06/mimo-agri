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
    ]
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
    ]
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
    description: 'Bột rửa chén sinh học, an toàn cho người sử dụng và môi trường.'
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
    description: 'Hạt giống rau cải ngọt lùn, dễ trồng, năng suất cao, thích hợp cho vụ hè.'
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
    description: 'Chai xịt bẫy ruồi vàng loại 2, giá cả phải chăng, hiệu quả ổn định.'
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
    description: 'Vòi xịt phun sương cao cấp, điều chỉnh được áp lực nước, độ bền cao.'
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
    description: 'Bột rửa chén với hương chanh tự nhiên, tẩy sạch vết bẩn cứng đầu.'
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
    description: 'Hạt giống rau cải ngọt đặc biệt cho mùa thu, khả năng chống chịu sâu bệnh tốt.'
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
    description: 'Hạt giống rau cải ngọt chịu lạnh tốt, phù hợp với khí hậu mùa đông.'
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
    description: 'Cuốc làm vườn mini, nhỏ gọn, dễ sử dụng cho việc làm vườn hàng ngày.'
  },
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
  return allProducts.find(product => product.id === productId);
};

// Lọc sản phẩm theo từ khóa tìm kiếm
export const searchProducts = (keyword) => {
  if (!keyword) return allProducts;
  
  const searchTerm = keyword.toLowerCase();
  return allProducts.filter(product => 
    product.title.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
};

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
    default:
      return productsCopy;
  }
};

// Loại bỏ sản phẩm trùng lặp, sử dụng id để đảm bảo tính duy nhất
export const getUniqueProducts = (products) => {
  // Sử dụng id thay vì title để tránh trường hợp trùng tên nhưng là sản phẩm khác nhau
  return Array.from(new Map(products.map(item => [item.id, item])).values());
};