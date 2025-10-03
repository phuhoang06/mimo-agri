// Script để thêm categories nông nghiệp vào Supabase
// Chạy: node scripts/seed-agriculture-categories.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedAgricultureCategories() {
  console.log('🌱 Bắt đầu thêm categories nông nghiệp...')

  try {
    // 1. Xóa categories cũ (optional)
    console.log('🗑️ Xóa categories cũ...')
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .eq('type', 'product')

    if (deleteError) {
      console.log('⚠️ Không thể xóa categories cũ:', deleteError.message)
    }

    // 2. Thêm categories nông nghiệp
    console.log('📁 Thêm categories nông nghiệp...')
    const { error: categoriesError } = await supabase
      .from('categories')
      .insert([
        { name: 'Bẫy Ruồi Vàng', type: 'product' },
        { name: 'Hạt Giống Mùa Hè', type: 'product' },
        { name: 'Hạt Giống Mùa Thu', type: 'product' },
        { name: 'Hạt Giống Mùa Đông', type: 'product' },
        { name: 'Dụng Cụ Làm Vườn', type: 'product' },
        { name: 'Vòi Tưới Cây', type: 'product' },
        { name: 'Phân Bón - Thuốc', type: 'product' }
      ])

    if (categoriesError) {
      console.error('❌ Lỗi thêm categories:', categoriesError)
      return
    }

    // 3. Lấy category IDs
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name')
      .eq('type', 'product')

    console.log('✅ Categories đã được thêm:')
    categories?.forEach(category => {
      console.log(`  - ${category.name} (ID: ${category.id})`)
    })

    // 4. Thêm products mẫu cho mỗi category
    console.log('📦 Thêm products mẫu...')
    
    const batRuoiVangId = categories.find(c => c.name === 'Bẫy Ruồi Vàng')?.id
    const hatGiongMuaHeId = categories.find(c => c.name === 'Hạt Giống Mùa Hè')?.id
    const hatGiongMuaThuId = categories.find(c => c.name === 'Hạt Giống Mùa Thu')?.id
    const hatGiongMuaDongId = categories.find(c => c.name === 'Hạt Giống Mùa Đông')?.id
    const dungCuLamVuonId = categories.find(c => c.name === 'Dụng Cụ Làm Vườn')?.id
    const voiTuoiCayId = categories.find(c => c.name === 'Vòi Tưới Cây')?.id
    const phanBonThuocId = categories.find(c => c.name === 'Phân Bón - Thuốc')?.id

    const { error: productsError } = await supabase
      .from('products')
      .insert([
        // Bẫy Ruồi Vàng
        {
          name: 'Bẫy Ruồi Vàng Chai Xịt 500ml',
          min_price: 45000,
          max_price: 50000,
          description: 'Sản phẩm diệt ruồi vàng hiệu quả 40%, an toàn cho cây trồng',
          category_id: batRuoiVangId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        {
          name: 'Bẫy Dính Vàng 20cm x 30cm',
          min_price: 25000,
          max_price: 30000,
          description: 'Bẫy dính màu vàng thu hút ruồi vàng, dễ sử dụng',
          category_id: batRuoiVangId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        
        // Hạt Giống Mùa Hè
        {
          name: 'Hạt Giống Cà Chua Cherry',
          min_price: 15000,
          max_price: 20000,
          description: 'Hạt giống cà chua cherry ngọt, năng suất cao',
          category_id: hatGiongMuaHeId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        {
          name: 'Hạt Giống Dưa Hấu',
          min_price: 12000,
          max_price: 15000,
          description: 'Hạt giống dưa hấu thơm ngon, chịu nhiệt tốt',
          category_id: hatGiongMuaHeId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        
        // Hạt Giống Mùa Thu
        {
          name: 'Hạt Giống Cải Bắp',
          min_price: 10000,
          max_price: 12000,
          description: 'Hạt giống cải bắp trắng, phù hợp mùa thu',
          category_id: hatGiongMuaThuId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        
        // Hạt Giống Mùa Đông
        {
          name: 'Hạt Giống Cà Rốt',
          min_price: 8000,
          max_price: 10000,
          description: 'Hạt giống cà rốt ngọt, chịu lạnh tốt',
          category_id: hatGiongMuaDongId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        
        // Dụng Cụ Làm Vườn
        {
          name: 'Cuốc Làm Vườn Inox',
          min_price: 85000,
          max_price: 95000,
          description: 'Cuốc làm vườn bằng inox, bền đẹp',
          category_id: dungCuLamVuonId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        {
          name: 'Xẻng Đào Đất',
          min_price: 65000,
          max_price: 75000,
          description: 'Xẻng đào đất chắc chắn, tay cầm thoải mái',
          category_id: dungCuLamVuonId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        
        // Vòi Tưới Cây
        {
          name: 'Vòi Tưới Cây 20m',
          min_price: 120000,
          max_price: 150000,
          description: 'Vòi tưới cây dài 20m, chống kink',
          category_id: voiTuoiCayId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        },
        
        // Phân Bón - Thuốc
        {
          name: 'Phân Hữu Cơ Vi Sinh',
          min_price: 35000,
          max_price: 40000,
          description: 'Phân hữu cơ vi sinh tốt cho đất và cây trồng',
          category_id: phanBonThuocId,
          image_url: 'https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg'
        }
      ])

    if (productsError) {
      console.error('❌ Lỗi thêm products:', productsError)
      return
    }

    console.log('✅ Seed dữ liệu nông nghiệp thành công!')
    console.log('🎉 Hãy refresh trang http://localhost:3000 để xem kết quả!')

  } catch (error) {
    console.error('❌ Lỗi seed data:', error)
  }
}

// Chạy seed
seedAgricultureCategories()
