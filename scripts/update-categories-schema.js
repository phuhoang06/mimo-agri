// Script để cập nhật schema categories với icon và subcategories
// Chạy: node scripts/update-categories-schema.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateCategoriesSchema() {
  console.log('🔧 Cập nhật schema categories...')

  try {
    // 1. Thêm cột icon và subcategories vào bảng categories
    console.log('📝 Thêm cột icon và subcategories...')
    
    // Note: Trong Supabase, chúng ta sẽ cập nhật dữ liệu trực tiếp
    // vì việc thêm cột cần quyền admin
    
    // 2. Cập nhật categories với icon và subcategories
    console.log('🎨 Cập nhật categories với icon và subcategories...')
    
    const categoryUpdates = [
      {
        name: 'Bẫy Ruồi Vàng',
        icon: '🪰',
        subcategories: ['Bẫy dính vàng', 'Keo xịt', 'Tấm bẫy', 'Dung cụ bẫy']
      },
      {
        name: 'Hạt Giống Mùa Hè',
        icon: '🌱',
        subcategories: ['Rau củ quả', 'Hoa kiểng', 'Cây ăn trái', 'Hạt giống nhập khẩu']
      },
      {
        name: 'Hạt Giống Mùa Thu',
        icon: '🍂',
        subcategories: ['Rau mùa thu', 'Củ quả mùa thu', 'Hoa mùa thu']
      },
      {
        name: 'Hạt Giống Mùa Đông',
        icon: '❄️',
        subcategories: ['Rau mùa đông', 'Cây chịu lạnh', 'Hoa mùa đông']
      },
      {
        name: 'Dụng Cụ Làm Vườn',
        icon: '🛠️',
        subcategories: ['Cuốc, xẻng', 'Vòi tưới', 'Đất trồng', 'Chậu cây']
      },
      {
        name: 'Vòi Tưới Cây',
        icon: '💧',
        subcategories: ['Vòi sen', 'Ống nước', 'Béc tưới', 'Hệ thống tưới']
      },
      {
        name: 'Phân Bón - Thuốc',
        icon: '🌿',
        subcategories: ['Phân hữu cơ', 'Phân vô cơ', 'Thuốc trừ sâu', 'Thuốc diệt cỏ']
      }
    ]

    // Cập nhật từng category
    for (const update of categoryUpdates) {
      const { error } = await supabase
        .from('categories')
        .update({
          icon: update.icon,
          subcategories: update.subcategories
        })
        .eq('name', update.name)

      if (error) {
        console.error(`❌ Lỗi cập nhật category ${update.name}:`, error)
      } else {
        console.log(`✅ Đã cập nhật category: ${update.name} ${update.icon}`)
      }
    }

    // 3. Kiểm tra kết quả
    console.log('🔍 Kiểm tra kết quả...')
    const { data: categories, error: fetchError } = await supabase
      .from('categories')
      .select('*')
      .eq('type', 'product')

    if (fetchError) {
      console.error('❌ Lỗi fetch categories:', fetchError)
      return
    }

    console.log('✅ Categories đã được cập nhật:')
    categories?.forEach(category => {
      console.log(`  - ${category.name} ${category.icon || '📦'}`)
      if (category.subcategories) {
        console.log(`    Subcategories: ${category.subcategories.join(', ')}`)
      }
    })

    console.log('🎉 Cập nhật schema thành công!')

  } catch (error) {
    console.error('❌ Lỗi cập nhật schema:', error)
  }
}

// Chạy cập nhật
updateCategoriesSchema()
