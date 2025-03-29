/**
 * Technical documents data for HƯỚNG DẪN VÀ CHĂM SÓC section
 */
import productImg1 from '../assets/product/product1.png';
import productImg2 from '../assets/product/product2.png';
import productImg3 from '../assets/product/product3.png';
import productImg4 from '../assets/product/product4.png';

export const technicalDocs = [
  {
    id: 1,
    title: "Hướng dẫn sử dụng bẫy ruồi vàng",
    image: productImg1,
    description: "Hướng dẫn chi tiết cách sử dụng bẫy ruồi vàng hiệu quả cho vườn cây của bạn."
  },
  {
    id: 2,
    title: "Kỹ thuật trồng dưa lưới trong nhà kính",
    image: productImg2,
    description: "Tìm hiểu các kỹ thuật trồng dưa lưới trong nhà kính mang lại năng suất cao."
  },
  {
    id: 3,
    title: "Cách xử lý bệnh trên cây trồng",
    image: productImg3,
    description: "Phương pháp phát hiện và xử lý các loại bệnh thường gặp trên cây trồng."
  },
  {
    id: 4,
    title: "Kỹ thuật trồng và chăm sóc cà chua",
    image: productImg4,
    description: "Hướng dẫn từ A-Z về trồng và chăm sóc cà chua đạt năng suất cao."
  },
  {
    id: 5,
    title: "Phân bón hữu cơ và ứng dụng",
    image: productImg1,
    description: "Tìm hiểu về các loại phân bón hữu cơ và cách ứng dụng hiệu quả."
  },
  {
    id: 6,
    title: "Kỹ thuật trồng rau thủy canh",
    image: productImg2,
    description: "Hướng dẫn chi tiết cách trồng rau bằng phương pháp thủy canh tại nhà."
  },
  {
    id: 7,
    title: "Hướng dẫn sử dụng thuốc bảo vệ thực vật",
    image: productImg3,
    description: "Cách sử dụng thuốc bảo vệ thực vật an toàn và đúng cách."
  },
  {
    id: 8,
    title: "Kỹ thuật ghép cây ăn quả",
    image: productImg4,
    description: "Phương pháp ghép cây ăn quả hiệu quả để tăng năng suất."
  },
  {
    id: 9,
    title: "Chăm sóc cây trong mùa nắng nóng",
    image: productImg1,
    description: "Các biện pháp bảo vệ cây trồng trong điều kiện thời tiết nắng nóng khắc nghiệt."
  },
  {
    id: 10,
    title: "Kỹ thuật làm đất trồng cây",
    image: productImg2,
    description: "Hướng dẫn chi tiết cách làm đất chuẩn bị cho việc trồng cây."
  }
];

/**
 * Function to get a subset of technical documents
 * @param {number} limit - Number of documents to return
 * @returns Array of documents limited by the specified count
 */
export const getTechnicalDocs = (limit = 5) => {
  return technicalDocs.slice(0, limit);
};

/**
 * Function to get document by ID
 * @param {number} id - Document ID
 * @returns Document object or undefined if not found
 */
export const getTechnicalDocById = (id) => {
  return technicalDocs.find(doc => doc.id === id);
}; 