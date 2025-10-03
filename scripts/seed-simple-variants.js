// Script để thêm products với variant system đơn giản (JSON field)
// Chạy: node scripts/seed-simple-variants.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedSimpleVariants() {
  console.log('🌱 Thêm products với variant system đơn giản...')

  try {
    // Lấy category IDs
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name')
      .eq('type', 'product')

    const dungCuLamVuonId = categories.find(c => c.name === 'Dụng Cụ Làm Vườn')?.id
    const batRuoiVangId = categories.find(c => c.name === 'Bẫy Ruồi Vàng')?.id
    const hatGiongId = categories.find(c => c.name === 'Hạt Giống Mùa Hè')?.id

    // 1. Găng tay làm vườn với variant system
    console.log('🧤 Thêm găng tay làm vườn với variants...')
    
    const gangTayProduct = {
      name: 'Găng Tay Làm Vườn Chuyên Nghiệp',
      description: 'Găng tay làm vườn chất lượng cao, bền đẹp, phù hợp cho mọi công việc làm vườn',
      min_price: 45000,
      max_price: 50000,
      category_id: dungCuLamVuonId,
      image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg',
      // Sử dụng JSON field để lưu variant data
      variant_data: JSON.stringify({
        variant_types: [
          {
            id: 'loai-gang-tay',
            name: 'Loại găng tay',
            options: [
              { id: 'co-mong-fullbox', name: 'Có móng - Fullbox', price_modifier: 5000 },
              { id: 'co-mong-thuong', name: 'Có móng - Thường', price_modifier: 0 },
              { id: 'khong-mong-fullbox', name: 'Không móng - Fullbox', price_modifier: 5000 },
              { id: 'khong-mong-thuong', name: 'Không móng - Thường', price_modifier: 0 }
            ]
          },
          {
            id: 'kich-thuoc',
            name: 'Kích thước',
            options: [
              { id: 's', name: 'S', price_modifier: 0 },
              { id: 'm', name: 'M', price_modifier: 0 },
              { id: 'l', name: 'L', price_modifier: 0 },
              { id: 'xl', name: 'XL', price_modifier: 0 }
            ]
          },
          {
            id: 'mau-sac',
            name: 'Màu sắc',
            options: [
              { id: 'xanh-la', name: 'Xanh lá', price_modifier: 0 },
              { id: 'xanh-duong', name: 'Xanh dương', price_modifier: 0 },
              { id: 'do', name: 'Đỏ', price_modifier: 0 },
              { id: 'vang', name: 'Vàng', price_modifier: 0 }
            ]
          }
        ],
        variant_combinations: [
          {
            id: 'co-mong-fullbox-m-xanh-la',
            combination: ['co-mong-fullbox', 'm', 'xanh-la'],
            price_modifier: 5000,
            stock: 50,
            sku: 'GANGTAY-CO-MONG-FULLBOX-M-XANH-LA'
          },
          {
            id: 'co-mong-fullbox-l-xanh-la',
            combination: ['co-mong-fullbox', 'l', 'xanh-la'],
            price_modifier: 5000,
            stock: 30,
            sku: 'GANGTAY-CO-MONG-FULLBOX-L-XANH-LA'
          },
          {
            id: 'co-mong-thuong-m-xanh-la',
            combination: ['co-mong-thuong', 'm', 'xanh-la'],
            price_modifier: 0,
            stock: 100,
            sku: 'GANGTAY-CO-MONG-THUONG-M-XANH-LA'
          },
          {
            id: 'khong-mong-fullbox-m-xanh-duong',
            combination: ['khong-mong-fullbox', 'm', 'xanh-duong'],
            price_modifier: 5000,
            stock: 25,
            sku: 'GANGTAY-KHONG-MONG-FULLBOX-M-XANH-DUONG'
          },
          {
            id: 'khong-mong-thuong-l-do',
            combination: ['khong-mong-thuong', 'l', 'do'],
            price_modifier: 0,
            stock: 75,
            sku: 'GANGTAY-KHONG-MONG-THUONG-L-DO'
          }
        ]
      })
    }

    const { error: gangTayError } = await supabase
      .from('products')
      .insert([gangTayProduct])

    if (gangTayError) {
      console.error('❌ Lỗi thêm găng tay:', gangTayError)
    } else {
      console.log('✅ Đã thêm găng tay làm vườn với variant system')
    }

    // 2. Bẫy ruồi vàng với variant system
    console.log('🪰 Thêm bẫy ruồi vàng với variants...')
    
    const batRuoiProduct = {
      name: 'Bẫy Ruồi Vàng Đa Dạng',
      description: 'Bẫy ruồi vàng hiệu quả với nhiều loại và kích thước khác nhau',
      min_price: 25000,
      max_price: 50000,
      category_id: batRuoiVangId,
      image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg',
      variant_data: JSON.stringify({
        variant_types: [
          {
            id: 'loai-bay',
            name: 'Loại bẫy',
            options: [
              { id: 'bay-dinh', name: 'Bẫy dính', price_modifier: 0 },
              { id: 'keo-xit', name: 'Keo xịt', price_modifier: 10000 },
              { id: 'tam-bay', name: 'Tấm bẫy', price_modifier: 5000 }
            ]
          },
          {
            id: 'kich-thuoc',
            name: 'Kích thước',
            options: [
              { id: 'nho', name: 'Nhỏ (10x15cm)', price_modifier: 0 },
              { id: 'trung', name: 'Trung (20x30cm)', price_modifier: 5000 },
              { id: 'lon', name: 'Lớn (30x45cm)', price_modifier: 10000 }
            ]
          },
          {
            id: 'so-luong',
            name: 'Số lượng',
            options: [
              { id: '1-cai', name: '1 cái', price_modifier: 0 },
              { id: '5-cai', name: '5 cái', price_modifier: 0 },
              { id: '10-cai', name: '10 cái', price_modifier: 0 }
            ]
          }
        ],
        variant_combinations: [
          {
            id: 'bay-dinh-trung-5-cai',
            combination: ['bay-dinh', 'trung', '5-cai'],
            price_modifier: 5000,
            stock: 200,
            sku: 'BAY-DINH-TRUNG-5-CAI'
          },
          {
            id: 'keo-xit-lon-1-cai',
            combination: ['keo-xit', 'lon', '1-cai'],
            price_modifier: 10000,
            stock: 50,
            sku: 'KEO-XIT-LON-1-CAI'
          },
          {
            id: 'tam-bay-nho-10-cai',
            combination: ['tam-bay', 'nho', '10-cai'],
            price_modifier: 5000,
            stock: 100,
            sku: 'TAM-BAY-NHO-10-CAI'
          }
        ]
      })
    }

    const { error: batRuoiError } = await supabase
      .from('products')
      .insert([batRuoiProduct])

    if (batRuoiError) {
      console.error('❌ Lỗi thêm bẫy ruồi:', batRuoiError)
    } else {
      console.log('✅ Đã thêm bẫy ruồi vàng với variant system')
    }

    // 3. Hạt giống với variant system
    console.log('🌱 Thêm hạt giống với variants...')
    
    const hatGiongProduct = {
      name: 'Hạt Giống Cà Chua Cherry',
      description: 'Hạt giống cà chua cherry ngọt, năng suất cao với nhiều loại đóng gói',
      min_price: 15000,
      max_price: 25000,
      category_id: hatGiongId,
      image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg',
      variant_data: JSON.stringify({
        variant_types: [
          {
            id: 'loai-dong-goi',
            name: 'Loại đóng gói',
            options: [
              { id: 'goi-nho', name: 'Gói nhỏ (10 hạt)', price_modifier: 0 },
              { id: 'goi-trung', name: 'Gói trung (50 hạt)', price_modifier: 5000 },
              { id: 'goi-lon', name: 'Gói lớn (100 hạt)', price_modifier: 10000 }
            ]
          },
          {
            id: 'chat-luong',
            name: 'Chất lượng',
            options: [
              { id: 'thuong', name: 'Thường', price_modifier: 0 },
              { id: 'cao-cap', name: 'Cao cấp', price_modifier: 5000 },
              { id: 'organic', name: 'Organic', price_modifier: 10000 }
            ]
          }
        ],
        variant_combinations: [
          {
            id: 'goi-trung-cao-cap',
            combination: ['goi-trung', 'cao-cap'],
            price_modifier: 10000,
            stock: 150,
            sku: 'HAT-GIONG-GOI-TRUNG-CAO-CAP'
          },
          {
            id: 'goi-lon-organic',
            combination: ['goi-lon', 'organic'],
            price_modifier: 20000,
            stock: 80,
            sku: 'HAT-GIONG-GOI-LON-ORGANIC'
          },
          {
            id: 'goi-nho-thuong',
            combination: ['goi-nho', 'thuong'],
            price_modifier: 0,
            stock: 300,
            sku: 'HAT-GIONG-GOI-NHO-THUONG'
          }
        ]
      })
    }

    const { error: hatGiongError } = await supabase
      .from('products')
      .insert([hatGiongProduct])

    if (hatGiongError) {
      console.error('❌ Lỗi thêm hạt giống:', hatGiongError)
    } else {
      console.log('✅ Đã thêm hạt giống với variant system')
    }

    console.log('🎉 Seed simple variants thành công!')
    console.log('💡 Products đã có variant system linh hoạt:')
    console.log('  - Găng tay làm vườn: Loại găng tay + Kích thước + Màu sắc')
    console.log('  - Bẫy ruồi vàng: Loại bẫy + Kích thước + Số lượng')
    console.log('  - Hạt giống: Loại đóng gói + Chất lượng')

  } catch (error) {
    console.error('❌ Lỗi seed simple variants:', error)
  }
}

// Chạy seed
seedSimpleVariants()

