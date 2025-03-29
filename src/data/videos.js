/**
 * Video data for the application
 */
export const videos = [
  {
    id: 1,
    title: "Hướng dẫn sử dụng bẫy ruồi vàng",
    videoId: "osD0RAxQsbE",
    thumbnail: `https://img.youtube.com/vi/osD0RAxQsbE/mqdefault.jpg`,
    description: "Hướng dẫn chi tiết cách sử dụng bẫy ruồi vàng hiệu quả cho vườn cây của bạn."
  },
  {
    id: 2,
    title: "Kỹ thuật trồng dưa lưới trong nhà kính",
    videoId: "OHqcNAyqV2A",
    thumbnail: `https://img.youtube.com/vi/OHqcNAyqV2A/mqdefault.jpg`,
    description: "Tìm hiểu các kỹ thuật trồng dưa lưới trong nhà kính mang lại năng suất cao."
  },
  {
    id: 3,
    title: "Cách xử lý bệnh trên cây trồng",
    videoId: "osD0RAxQsbE",
    thumbnail: `https://img.youtube.com/vi/osD0RAxQsbE/mqdefault.jpg`,
    description: "Phương pháp phát hiện và xử lý các loại bệnh thường gặp trên cây trồng."
  },
  {
    id: 4,
    title: "Kỹ thuật trồng và chăm sóc cà chua",
    videoId: "OHqcNAyqV2A",
    thumbnail: `https://img.youtube.com/vi/OHqcNAyqV2A/mqdefault.jpg`,
    description: "Hướng dẫn từ A-Z về trồng và chăm sóc cà chua đạt năng suất cao."
  },
  {
    id: 5,
    title: "Phân bón hữu cơ và ứng dụng",
    videoId: "osD0RAxQsbE",
    thumbnail: `https://img.youtube.com/vi/osD0RAxQsbE/mqdefault.jpg`,
    description: "Tìm hiểu về các loại phân bón hữu cơ và cách ứng dụng hiệu quả."
  },
  {
    id: 6,
    title: "Kỹ thuật trồng rau thủy canh",
    videoId: "OHqcNAyqV2A",
    thumbnail: `https://img.youtube.com/vi/OHqcNAyqV2A/mqdefault.jpg`,
    description: "Hướng dẫn chi tiết cách trồng rau bằng phương pháp thủy canh tại nhà."
  },
  {
    id: 7,
    title: "Hướng dẫn sử dụng thuốc bảo vệ thực vật",
    videoId: "osD0RAxQsbE",
    thumbnail: `https://img.youtube.com/vi/osD0RAxQsbE/mqdefault.jpg`,
    description: "Cách sử dụng thuốc bảo vệ thực vật an toàn và đúng cách."
  },
  {
    id: 8,
    title: "Kỹ thuật ghép cây ăn quả",
    videoId: "OHqcNAyqV2A",
    thumbnail: `https://img.youtube.com/vi/OHqcNAyqV2A/mqdefault.jpg`,
    description: "Phương pháp ghép cây ăn quả hiệu quả để tăng năng suất."
  },
  {
    id: 9,
    title: "Chăm sóc cây trong mùa nắng nóng",
    videoId: "osD0RAxQsbE",
    thumbnail: `https://img.youtube.com/vi/osD0RAxQsbE/mqdefault.jpg`,
    description: "Các biện pháp bảo vệ cây trồng trong điều kiện thời tiết nắng nóng khắc nghiệt."
  },
  {
    id: 10,
    title: "Kỹ thuật làm đất trồng cây",
    videoId: "OHqcNAyqV2A",
    thumbnail: `https://img.youtube.com/vi/OHqcNAyqV2A/mqdefault.jpg`,
    description: "Hướng dẫn chi tiết cách làm đất chuẩn bị cho việc trồng cây."
  }
];

/**
 * Function to get a subset of videos
 * @param {number} limit - Number of videos to return
 * @returns Array of videos limited by the specified count
 */
export const getVideos = (limit = 5) => {
  return videos.slice(0, limit);
};

/**
 * Function to get video by ID
 * @param {number} id - Video ID
 * @returns Video object or undefined if not found
 */
export const getVideoById = (id) => {
  return videos.find(video => video.id === id);
}; 