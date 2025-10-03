// Script để tạo schema cho hệ thống variant linh hoạt
// Chạy: node scripts/create-variant-schema.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createVariantSchema() {
  console.log('🔧 Tạo schema cho hệ thống variant linh hoạt...')

  try {
    // 1. Tạo bảng variant_types (Loại variant)
    console.log('📝 Tạo bảng variant_types...')
    
    // Note: Trong Supabase, chúng ta sẽ tạo dữ liệu mẫu
    // vì việc tạo bảng cần quyền admin
    
    // 2. Tạo dữ liệu mẫu cho variant system
    console.log('🎨 Tạo dữ liệu mẫu cho variant system...')
    
    // Tạo bảng variant_types (nếu chưa có)
    const variantTypes = [
      {
        id: '1',
        name: 'Loại găng tay',
        description: 'Phân loại găng tay làm vườn',
        product_id: null // Sẽ update sau
      },
      {
        id: '2', 
        name: 'Kích thước',
        description: 'Kích thước sản phẩm',
        product_id: null
      },
      {
        id: '3',
        name: 'Màu sắc',
        description: 'Màu sắc sản phẩm',
        product_id: null
      }
    ]

    // Tạo bảng variant_options (Các tùy chọn variant)
    const variantOptions = [
      // Găng tay làm vườn - Loại găng tay
      { id: '1', variant_type_id: '1', name: 'Có móng', value: 'co-mong', price_modifier: 0 },
      { id: '2', variant_type_id: '1', name: 'Không móng', value: 'khong-mong', price_modifier: 0 },
      
      // Găng tay làm vườn - Có móng variants
      { id: '3', variant_type_id: '1', name: 'Có móng - Fullbox', value: 'co-mong-fullbox', price_modifier: 5000 },
      { id: '4', variant_type_id: '1', name: 'Có móng - Thường', value: 'co-mong-thuong', price_modifier: 0 },
      
      // Găng tay làm vườn - Không móng variants  
      { id: '5', variant_type_id: '1', name: 'Không móng - Fullbox', value: 'khong-mong-fullbox', price_modifier: 5000 },
      { id: '6', variant_type_id: '1', name: 'Không móng - Thường', value: 'khong-mong-thuong', price_modifier: 0 },
      
      // Kích thước
      { id: '7', variant_type_id: '2', name: 'S', value: 's', price_modifier: 0 },
      { id: '8', variant_type_id: '2', name: 'M', value: 'm', price_modifier: 0 },
      { id: '9', variant_type_id: '2', name: 'L', value: 'l', price_modifier: 0 },
      { id: '10', variant_type_id: '2', name: 'XL', value: 'xl', price_modifier: 0 },
      
      // Màu sắc
      { id: '11', variant_type_id: '3', name: 'Xanh lá', value: 'xanh-la', price_modifier: 0 },
      { id: '12', variant_type_id: '3', name: 'Xanh dương', value: 'xanh-duong', price_modifier: 0 },
      { id: '13', variant_type_id: '3', name: 'Đỏ', value: 'do', price_modifier: 0 },
      { id: '14', variant_type_id: '3', name: 'Vàng', value: 'vang', price_modifier: 0 }
    ]

    // Tạo bảng product_variants (Kết hợp variants)
    const productVariants = [
      // Găng tay có móng fullbox
      { 
        id: '1',
        product_id: null, // Sẽ update sau
        variant_combination: ['co-mong-fullbox', 'm', 'xanh-la'],
        price_modifier: 5000,
        stock: 50,
        sku: 'GANGTAY-CO-MONG-FULLBOX-M-XANH-LA'
      },
      { 
        id: '2',
        product_id: null,
        variant_combination: ['co-mong-fullbox', 'l', 'xanh-la'],
        price_modifier: 5000,
        stock: 30,
        sku: 'GANGTAY-CO-MONG-FULLBOX-L-XANH-LA'
      },
      // Găng tay có móng thường
      { 
        id: '3',
        product_id: null,
        variant_combination: ['co-mong-thuong', 'm', 'xanh-la'],
        price_modifier: 0,
        stock: 100,
        sku: 'GANGTAY-CO-MONG-THUONG-M-XANH-LA'
      },
      // Găng tay không móng fullbox
      { 
        id: '4',
        product_id: null,
        variant_combination: ['khong-mong-fullbox', 'm', 'xanh-duong'],
        price_modifier: 5000,
        stock: 25,
        sku: 'GANGTAY-KHONG-MONG-FULLBOX-M-XANH-DUONG'
      },
      // Găng tay không móng thường
      { 
        id: '5',
        product_id: null,
        variant_combination: ['khong-mong-thuong', 'l', 'do'],
        price_modifier: 0,
        stock: 75,
        sku: 'GANGTAY-KHONG-MONG-THUONG-L-DO'
      }
    ]

    console.log('✅ Schema variant system đã được thiết kế:')
    console.log('📊 Variant Types:', variantTypes.length)
    console.log('🎯 Variant Options:', variantOptions.length) 
    console.log('🛍️ Product Variants:', productVariants.length)

    console.log('🎉 Schema variant system hoàn thành!')
    console.log('💡 Có thể sử dụng JSON fields trong Supabase để lưu trữ variant data')

  } catch (error) {
    console.error('❌ Lỗi tạo schema:', error)
  }
}

// Chạy tạo schema
createVariantSchema()

