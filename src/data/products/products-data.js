// Thông tin cơ bản sản phẩm
export const productsData = [
  { 
    id: 1,
    title: 'Bẫy ruồi vàng dạng chai - Chất lượng cao, hiệu quả 45-60 ngày', 
    price: 129000, 
    oldPrice: 200000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: false,
    stock: 100,
    rating: 4.8,
    reviews: 156,
    createdAt: '2023-01-15',
    updatedAt: '2023-12-20',
    description: 'Bẫy ruồi vàng dạng chai - Sử dụng chất dẫn dụ sinh học, chống thấm nước tới 45-60 ngày, hiệu quả với ruồi vàng, bướm và côn trùng chích hút gây hại cho cây ăn trái và rau hoa màu',
    tags: ['bẫy ruồi vàng', 'chai xịt bẫy ruồi vàng', 'ruồi vàng', 'ruồi đục trái', 'pheromone']
  },
  { 
    id: 2,
    title: 'Bẫy ruồi vàng, bẫy màu côn trùng 2 mặt - Hiệu quả với nhiều loài gây hại cho vườn lan, rau hoa màu và cây ăn trái', 
    price: 1990, 
    oldPrice: 3000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: false,
    stock: 500,
    rating: 4.5,
    reviews: 89,
    createdAt: '2023-02-10',
    updatedAt: '2023-12-15',
    description: 'Bẫy ruồi vàng, côn trùng có nhiều kích cỡ và màu sắc khác nhau phù hợp với từng loại cây trồng.',
    tags: ['bẫy ruồi vàng', 'bẫy côn trùng', 'tấm bẫy', 'bẫy 2 mặt']
  },
  { 
    id: 3,
    title: 'Dụng cụ nắp bẫy ruồi vàng', 
    price: 4290, 
    oldPrice: 8000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: false,
    stock: 200,
    rating: 4.7,
    reviews: 45,
    createdAt: '2023-03-05',
    updatedAt: '2023-12-10',
    description: 'Bẫy ruồi vàng hại trái cây thế hệ mới - Hiệu quả, tiết kiệm chi phí, siêu bền (có thể mua riêng nắp hoặc tinh dầu)',
    tags: ['bẫy ruồi vàng', 'bẫy côn trùng']
  },
  { 
    id: 4,
    title: 'Combo 10 ống tinh dầu dẫn dụ bẫy ruồi vàng 2ml', 
    price: 42900, 
    oldPrice: 79000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: false,
    stock: 150,
    rating: 4.6,
    reviews: 78,
    createdAt: '2023-04-20',
    updatedAt: '2023-12-05',
    description: 'Tinh dầu dẫn dụ có chiết xuất sinh học giúp thu hút ruồi vàng, an toàn, bền mùi',
    tags: ['bẫy ruồi vàng', 'bẫy côn trùng']
  },
  { 
    id: 5,
    title: 'Bẫy côn trùng 2 mặt dạng cuộn 100m (vàng/xanh) - Hàng nhập khẩu', 
    price: 589000, 
    oldPrice: 999000, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: true,
    isNew: false,
    stock: 50,
    rating: 4.9,
    reviews: 32,
    createdAt: '2023-05-15',
    updatedAt: '2023-12-01',
    description: 'Bẫy côn trùng - Vàng: Thu hút và bám dính các loại côn trùng gây hại: bọ nhảy, rầy, rệp nhiều loại, bọ cánh phấn trắng, bọ xít, ruồi đục lá, bướm ngài chích hút.....***** Bẫy côn trùng - Xanh: Thu hút và bám dính các loại côn trùng gây hại: bọ trĩ các loại, sâu tơ, sâu xanh bướm trắng.....',
    tags: ['bẫy ruồi vàng', 'bẫy côn trùng']
  },
  { 
    id: 6,
    title: 'Bẫy ruồi vàng 21.5x38.5(cm)', 
    price: 6900, 
    oldPrice: 9900, 
    categoryId: 'bay-ruoi-vang',
    isTopSelling: false,
    isNew: true,
    stock: 300,
    rating: 4.4,
    reviews: 67,
    createdAt: '2023-06-10',
    updatedAt: '2023-11-25',
    description: 'Bẫy ruồi vàng, côn trùng dạng tấm - Hiệu quả với nhiều loài gây hại cho cây trồng.',
    tags: ['bẫy ruồi vàng', 'bẫy côn trùng']
  },
  { 
    id: 7,
    title: 'Vòi sen 2000 lỗ', 
    price: 48900, 
    oldPrice: 75000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: true,
    stock: 250,
    rating: 4.7,
    reviews: 112,
    createdAt: '2023-07-05',
    updatedAt: '2023-11-20',
    description: 'Vòi sen tưới cây 2000 lỗ làm tia nước nhỏ và bông mềm mịn hơn giúp quá trình khi tưới cây hạn chế bị táp lá, xô nén đất thích hợp để tưới lan, rau, hoa',
    tags: ['vòi tưới cây']
  },
  { 
    id: 8,
    title: 'Vòi sen 1000 lỗ', 
    price: 48900, 
    oldPrice: 79000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: true,
    stock: 200,
    rating: 4.6,
    reviews: 98,
    createdAt: '2023-08-15',
    updatedAt: '2023-11-15',
    description: 'Vòi sen tưới cây 1000 lỗ làm tia nước nhỏ và bông mềm mịn hơn giúp quá trình khi tưới cây hạn chế bị táp lá, xô nén đất thích hợp để tưới lan, rau, hoa',
    tags: ['vòi tưới cây']
  },
  { 
    id: 9,
    title: 'Vòi phun sương điện', 
    price: 264000, 
    oldPrice: 450000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: true,
    stock: 100,
    rating: 4.8,
    reviews: 45,
    createdAt: '2023-09-20',
    updatedAt: '2023-11-10',
    description: 'Vòi điện phun sương, tưới cây thông minh, tiện ích giúp làm vườn dễ dàng hơn thay thế các bình bơm bằng tay truyền thống trên thị trường thay vì phải bê vác nặng và dùng sức.',
    tags: ['vòi tưới cây']
  },
  { 
    id: 10,
    title: 'Vòi phun sương xịt nước thông minh thay thế bình phun xịt nước tưới cây', 
    price: 9900, 
    oldPrice: 15000, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: true,
    stock: 400,
    rating: 4.5,
    reviews: 156,
    createdAt: '2023-10-05',
    updatedAt: '2023-11-05',
    description: 'Vòi phun sương, xịt nước thông minh thay thế bình phun sương, bình xịt nước tưới cây bền, đẹp, chắc chắn.',
    tags: ['vòi tưới cây']
  },
  { 
    id: 11,
    title: 'Vòi tưới cây đa năng thay đổi tia nước (bền, hiệu quả, tiết kiệm)', 
    price: 5990, 
    oldPrice: 7900, 
    categoryId: 'voi-tuoi-cay',
    isTopSelling: true,
    isNew: true,
    stock: 300,
    rating: 4.7,
    reviews: 89,
    createdAt: '2023-10-15',
    updatedAt: '2023-11-01',
    description: 'Vòi tưới cây đa năng thông minh thay đổi tia nước bền, hiệu quả, tiết kiệm',
    tags: ['vòi tưới cây']
  },
  { 
    id: 12,
    title: 'Kéo cắt cành tỉa cây V8 SK5 siêu sắc kèm lò xo trợ lực, dễ sử dụng', 
    price: 149000, 
    oldPrice: 250000, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: true,
    isNew: true,
    stock: 150,
    rating: 4.9,
    reviews: 67,
    createdAt: '2023-10-25',
    updatedAt: '2023-10-30',
    description: 'Kéo cắt tỉa cành cây: Lưỡi hơi cong phù hợp nhất cho việc cắt tỉa cành cây. Có thể cắt được cành cây có đường kính lên đến ~ 3cm',
    tags: ['kéo cắt tỉa', 'dụng cụ làm vườn']
  },
  { 
    id: 13,
    title: 'Kéo cắt cành tỉa cây siêu sắc - Thép không gỉ, thon gọn đa năng dễ sử dụng', 
    price: 39900, 
    oldPrice: 65000, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: true,
    isNew: true,
    stock: 200,
    rating: 4.6,
    reviews: 45,
    createdAt: '2023-11-05',
    updatedAt: '2023-11-10',
    description: 'Kéo cắt tỉa cành cây: Lưỡi hơi cong phù hợp nhất cho việc cắt tỉa cành cây.',
    tags: ['kéo cắt tỉa', 'dụng cụ làm vườn']
  },
  { 
    id: 14,
    title: 'Kéo mũi nhọn cắt tỉa quả, lá dăm, cành nhỏ (thép không gỉ cao cấp)', 
    price: 29900, 
    oldPrice: 49900, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: true,
    isNew: true,
    stock: 250,
    rating: 4.7,
    reviews: 78,
    createdAt: '2023-11-15',
    updatedAt: '2023-11-20',
    description: 'Kéo mũi nhọn cắt tỉa quả, lá dăm, cành nhỏ (thép không gỉ cao cấp)',
    tags: ['kéo cắt tỉa', 'dụng cụ làm vườn']
  },
  { 
    id: 15,
    title: 'Khay trồng rau mầm Loại 1, không mùi, bền, đẹp làm từ nhựa nguyên sinh', 
    price: 22900, 
    oldPrice: 35000, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: false,
    isNew: true,
    stock: 200,
    rating: 4.5,
    reviews: 45,
    createdAt: '2023-11-25',
    updatedAt: '2023-12-01',
    description: 'Khay trồng rau mầm chất lượng cao. Có hai loại: Bộ khay không nắp (22.900đ) và Bộ khay có nắp (32.900đ).',
    tags: ['khay ươm rau mầm', 'dụng cụ làm vườn']
  },
  { 
    id: 16,
    title: 'Chậu vải trồng rau, túi vải trồng cây nhiều kích cỡ (độ bền cao, thông thoáng, thoát nước tốt)', 
    price: 3900, 
    oldPrice: 6000, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: false,
    isNew: true,
    stock: 300,
    rating: 4.6,
    reviews: 55,
    createdAt: '2023-11-30',
    updatedAt: '2023-12-05',
    description: 'Túi vải trồng cây, chậu trồng rau có nhiều kích thước từ 20x18cm đến 50x40cm, loại không quai và loại 2 quai, giá từ 3.900đ đến 15.900đ.',
    tags: ['chậu trồng rau', 'dụng cụ làm vườn']
  },
  { 
    id: 17,
    title: 'Lưới trồng cây, lưới làm giàn leo mướp, nho, bầu bí, cây hoa, dưa chuột (Siêu bền, đẹp, chắc chắn)', 
    price: 19990, 
    oldPrice: 39000, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: false,
    isNew: true,
    stock: 150,
    rating: 4.7,
    reviews: 40,
    createdAt: '2023-12-01',
    updatedAt: '2023-12-10',
    description: 'Lưới trồng cây, lưới làm giàn leo cao cấp, siêu bền, đẹp, chắc chắn. Có nhiều kích thước: 1,8x0,9m, 1,8x1,8m, 1,8x3,6m và 1,8x5,0m với giá từ 19.990đ đến 78.900đ.',
    tags: ['lưới trồng cây', 'dụng cụ làm vườn']
  },
  { 
    id: 18,
    title: 'Dây buộc cành cây 50m - Kẽm bọc nhựa - Tích hợp đầu cắt tiện lợi, cố định thân cây', 
    price: 19900, 
    oldPrice: 35000, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: false,
    isNew: true,
    stock: 100,
    rating: 4.8,
    reviews: 35,
    createdAt: '2023-12-05',
    updatedAt: '2023-12-15',
    description: 'Cuộn dây buộc cành cây 50m',
    tags: ['dây buộc cành cây', 'dụng cụ làm vườn']
  },
  { 
    id: 19,
    title: 'Găng tay làm vườn chuyên dụng (1 đôi) bảo vệ đôi bàn tay, co giãn đàn hồi tốt', 
    price: 19900, 
    oldPrice: 29900, 
    categoryId: 'dung-cu-lam-vuon',
    isTopSelling: false,
    isNew: true,
    stock: 200,
    rating: 4.6,
    reviews: 50,
    createdAt: '2023-12-10',
    updatedAt: '2023-12-20',
    description: 'Găng tay làm vườn chuyên dụng bảo vệ đôi bàn tay, co giãn đàn hồi tốt. Có loại có móng vuốt và không móng vuốt, với nhiều màu sắc: xanh, nâu, xanh rêu.',
    tags: ['găng tay làm vườn', 'dụng cụ làm vườn']
  }
];

export default productsData; 