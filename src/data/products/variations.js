// Import ảnh sản phẩm
import { productImages } from './images';
const { chaiXit, tamBayCT } = productImages;

// Biến thể sản phẩm
export const productVariations = {
  // ID 1: Bẫy ruồi vàng dạng chai
  1: {
    options: [
      {
        name: "Dung tích", 
        values: ["750ml"]
      }
    ],
    variants: [
      { 
        id: "1-1", 
        attributes: ["750ml"], 
        price: 128500, 
        oldPrice: 200000,
        stock: 50,
        image: chaiXit
      }
    ]
  },
  
  // ID 2: Bẫy ruồi vàng tấm / Bẫy côn trùng
  2: {
    options: [
      {
        name: "Loại", 
        values: ["Bẫy ruồi vàng", "Bẫy côn trùng-vàng", "Bẫy côn trùng-xanh"]
      },
      {
        name: "Kích thước",
        values: ["21,5x38,5(cm)", "20x10(cm)", "20x25(cm)", "20x30(cm)"]
      }
    ],
    variants: [
      { 
        id: "2-1", 
        attributes: ["Bẫy ruồi vàng", "21,5x38,5(cm)"], 
        price: 6900, 
        oldPrice: 9900,
        stock: 40,
        image: tamBayCT
      },
      { 
        id: "2-2", 
        attributes: ["Bẫy côn trùng-vàng", "20x10(cm)"], 
        price: 1990, 
        oldPrice: 3000,
        stock: 35,
        image: tamBayCT
      },
      { 
        id: "2-3", 
        attributes: ["Bẫy côn trùng-vàng", "20x25(cm)"], 
        price: 3500, 
        oldPrice: 5000,
        stock: 30,
        image: tamBayCT
      },
      { 
        id: "2-4", 
        attributes: ["Bẫy côn trùng-vàng", "20x30(cm)"], 
        price: 4500, 
        oldPrice: 7000,
        stock: 25,
        image: tamBayCT
      },
      { 
        id: "2-5", 
        attributes: ["Bẫy côn trùng-xanh", "20x10(cm)"], 
        price: 1990, 
        oldPrice: 3000,
        stock: 35,
        image: tamBayCT
      },
      { 
        id: "2-6", 
        attributes: ["Bẫy côn trùng-xanh", "20x25(cm)"], 
        price: 3500, 
        oldPrice: 5000,
        stock: 30,
        image: tamBayCT
      },
      { 
        id: "2-7", 
        attributes: ["Bẫy côn trùng-xanh", "20x30(cm)"], 
        price: 4500, 
        oldPrice: 7000,
        stock: 25,
        image: tamBayCT
      }
    ]
  },
  
  // ID 3: Nắp bẫy ruồi vàng
  3: {
    options: [
      {
        name: "Loại", 
        values: ["Nắp bẫy + tinh dầu(2ml)", "Nắp bẫy", "tinh dầu(2ml)"]
      }
    ],
    variants: [
      { 
        id: "3-1", 
        attributes: ["Nắp bẫy + tinh dầu(2ml)"], 
        price: 14900, 
        oldPrice: 19900,
        stock: 45,
        image: null
      },
      { 
        id: "3-2", 
        attributes: ["Nắp bẫy"], 
        price: 11000, 
        oldPrice: 15000,
        stock: 50,
        image: null
      },
      { 
        id: "3-3", 
        attributes: ["tinh dầu(2ml)"], 
        price: 4290, 
        oldPrice: 7900,
        stock: 60,
        image: null
      }
    ]
  },
  
  // ID 5: Bẫy côn trùng dạng cuộn
  5: {
    options: [
      {
        name: "Màu sắc", 
        values: ["Vàng", "Xanh"]
      }
    ],
    variants: [
      { 
        id: "5-1", 
        attributes: ["Vàng"], 
        price: 589000, 
        oldPrice: 999000,
        stock: 25,
        image: null
      },
      { 
        id: "5-2", 
        attributes: ["Xanh"], 
        price: 589000, 
        oldPrice: 999000,
        stock: 25,
        image: null
      }
    ]
  },
  
  // ID 7: Vòi sen 2000 lỗ
  7: {
    options: [
      {
        name: "Loại", 
        values: ["Ống mềm ø17 - ø24", "Ống mềm ø12 - ø16","Ống mềm ø25 - ø30"]
      }
    ],
    variants: [
  
      { 
        id: "7-2", 
        attributes: ["Ống mềm ø12 - ø16"], 
        price: 59000, 
        oldPrice: 90000,
        stock: 30,
        image: null
      },
      { 
        id: "7-3", 
        attributes: ["Ống mềm ø25 - ø30"], 
        price: 109000, 
        oldPrice: 150000,
      },
      { 
        id: "7-4", 
        attributes: ["Ống mềm ø17 - ø24"], 
        price: 109000, 
        oldPrice: 150000,
      }
    ]
  },
  
  // ID 8: Vòi sen 1000 lỗ
  8: {
  
  },
  
  // ID 9: Vòi phun sương điện
  9: {
    options: [
      {
        name: "Loại", 
        values: ["Tiêu chuẩn", "Tiêu chuẩn(10m dây)", "Cao Cấp", "Cao Cấp(10m dây)"]
      }
    ],
    variants: [
      { 
        id: "9-1", 
        attributes: ["Tiêu chuẩn"], 
        price: 264000, 
        oldPrice: 450000,
        stock: 25,
        image: null
      },
      { 
        id: "9-2", 
        attributes: ["Tiêu chuẩn(10m dây)"], 
        price: 314000, 
        oldPrice: 500000,
        stock: 20,
        image: null
      },
      { 
        id: "9-3", 
        attributes: ["Cao Cấp"], 
        price: 334000, 
        oldPrice: 550000,
        stock: 20,
        image: null
      },
      { 
        id: "9-4", 
        attributes: ["Cao Cấp(10m dây)"], 
        price: 359000, 
        oldPrice: 600000,
        stock: 15,
        image: null
      }
    ]
  },
  
  // ID 10: Vòi phun sương xịt nước
  10: {
    options: [
      {
        name: "Loại", 
        values: ["Cao cấp","Mini"]
      }
    ],
    variants: [
      { 
        id: "10-1", 
        attributes: ["Cao cấp"], 
        price: 9900, 
        oldPrice: 15000,
        stock: 50,
        image: null
      },
      { 
        id: "10-2", 
        attributes: ["Mini"], 
        price: 9900, 
        oldPrice: 15000,
      }
    ]
  },
  
  // ID 11: Vòi tưới cây đa năng
  11: {
  
  },
  
  // ID 12: Kéo cắt cành tỉa cây V8
  12: {
 
  },
  
  // ID 13: Kéo cắt cành tỉa cây siêu sắc
  13: {
    options: [
      {
        name: "Loại", 
        values: ["Kéo cắt tỉa", "Kéo thu hoạch"]
      }
    ],
    variants: [
      { 
        id: "13-1", 
        attributes: ["Kéo cắt tỉa"], 
        price: 42000, 
        oldPrice: 70000,
        stock: 35,
        image: null
      },
      { 
        id: "13-2", 
        attributes: ["Kéo thu hoạch"], 
        price: 42000, 
        oldPrice: 70000,
        stock: 35,
        image: null
      }
    ]
  },
  
  // ID 14: Kéo mũi nhọn cắt tỉa quả, lá dăm
  14: {
  },
  
  // ID 15: Khay trồng rau mầm
  15: {
    options: [
      {
        name: "Loại", 
        values: ["Bộ khay - Không nắp", "Bộ khay - Có nắp"]
      }
    ],
    variants: [
      { 
        id: "15-1", 
        attributes: ["Bộ khay - Không nắp"], 
        price: 22900, 
        oldPrice: 35000,
        stock: 50,
        image: null
      },
      { 
        id: "15-2", 
        attributes: ["Bộ khay - Có nắp"], 
        price: 32900, 
        oldPrice: 50000,
        stock: 40,
        image: null
      }
    ]
  },
  
  // ID 16: Chậu vải trồng rau
  16: {
    options: [
      {
        name: "Kích thước", 
        values: ["20x18(không quai)", "25x20(không quai)", "25x25(không quai)", "30x25(2 quai)", "30x30(2 quai)", "35x30(2 quai)", "40x35(2 quai)", "45x35(2 quai)", "50x40(2 quai)"]
      }
    ],
    variants: [
      { 
        id: "16-1", 
        attributes: ["20x18(không quai)"], 
        price: 3900, 
        oldPrice: 6000,
        stock: 40,
        image: null
      },
      { 
        id: "16-2", 
        attributes: ["25x20(không quai)"], 
        price: 4500, 
        oldPrice: 6500,
        stock: 40,
        image: null
      },
      { 
        id: "16-3", 
        attributes: ["25x25(không quai)"], 
        price: 4900, 
        oldPrice: 7000,
        stock: 40,
        image: null
      },
      { 
        id: "16-4", 
        attributes: ["30x25(2 quai)"], 
        price: 6900, 
        oldPrice: 9000,
        stock: 35,
        image: null
      },
      { 
        id: "16-5", 
        attributes: ["30x30(2 quai)"], 
        price: 7900, 
        oldPrice: 11000,
        stock: 35,
        image: null
      },
      { 
        id: "16-6", 
        attributes: ["35x30(2 quai)"], 
        price: 8900, 
        oldPrice: 13000,
        stock: 30,
        image: null
      },
      { 
        id: "16-7", 
        attributes: ["40x35(2 quai)"], 
        price: 10900, 
        oldPrice: 17000,
        stock: 30,
        image: null
      },
      { 
        id: "16-8", 
        attributes: ["45x35(2 quai)"], 
        price: 12900, 
        oldPrice: 19000,
        stock: 25,
        image: null
      },
      { 
        id: "16-9", 
        attributes: ["50x40(2 quai)"], 
        price: 15900, 
        oldPrice: 21000,
        stock: 25,
        image: null
      }
    ]
  },
  
  // ID 17: Lưới trồng cây
  17: {
    options: [
      {
        name: "Kích thước", 
        values: ["1,8x0,9 mét", "1,8x1,8 mét", "1,8x3,6 mét", "1,8x5,0 mét"]
      }
    ],
    variants: [
      { 
        id: "17-1", 
        attributes: ["1,8x0,9 mét"], 
        price: 19990, 
        oldPrice: 39000,
        stock: 40,
        image: null
      },
      { 
        id: "17-2", 
        attributes: ["1,8x1,8 mét"], 
        price: 39900, 
        oldPrice: 69000,
        stock: 35,
        image: null
      },
      { 
        id: "17-3", 
        attributes: ["1,8x3,6 mét"], 
        price: 58900, 
        oldPrice: 99000,
        stock: 30,
        image: null
      },
      { 
        id: "17-4", 
        attributes: ["1,8x5,0 mét"], 
        price: 78900, 
        oldPrice: 129000,
        stock: 25,
        image: null
      }
    ]
  },
  
  // ID 19: Găng tay làm vườn
  19: {
    options: [
      {
        name: "Kiểu dáng", 
        values: ["có móng vuốt", "không móng vuốt"]
      },
      {
        name: "Màu sắc", 
        values: ["xanh", "nâu", "xanh rêu"]
      }
    ],
    variants: [
      { 
        id: "19-1", 
        attributes: ["có móng vuốt", "xanh"], 
        price: 29900, 
        oldPrice: 39900,
        stock: 40,
        image: null
      },
      { 
        id: "19-2", 
        attributes: ["có móng vuốt", "nâu"], 
        price: 29900, 
        oldPrice: 39900,
        stock: 40,
        image: null
      },
      { 
        id: "19-3", 
        attributes: ["có móng vuốt", "xanh rêu"], 
        price: 29900, 
        oldPrice: 39900,
        stock: 40,
        image: null
      },
      { 
        id: "19-4", 
        attributes: ["không móng vuốt", "xanh"], 
        price: 19900, 
        oldPrice: 29900,
        stock: 45,
        image: null
      },
      { 
        id: "19-5", 
        attributes: ["không móng vuốt", "nâu"], 
        price: 19900, 
        oldPrice: 29900,
        stock: 45,
        image: null
      },
      { 
        id: "19-6", 
        attributes: ["không móng vuốt", "xanh rêu"], 
        price: 19900, 
        oldPrice: 29900,
        stock: 45,
        image: null
      }
    ]
  }
};

export default productVariations; 