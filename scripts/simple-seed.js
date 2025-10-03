// Script đơn giản để thêm một vài sản phẩm mẫu
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function simpleSeed() {
  console.log('🌱 Kiểm tra và thêm dữ liệu đơn giản...')

  try {
    // Kiểm tra cấu trúc bảng products
    console.log('🔍 Kiểm tra bảng products...')
    const { data: products, error: checkError } = await supabase
      .from('products')
      .select('*')
      .limit(1)

    if (checkError) {
      console.error('❌ Lỗi kiểm tra bảng products:', checkError)
      return
    }

    console.log('📊 Cấu trúc products hiện tại:', products)

    // Thêm 1 sản phẩm đơn giản để test
    console.log('📦 Thêm sản phẩm test...')
    const { data: newProduct, error: insertError } = await supabase
      .from('products')
      .insert([
        {
          name: 'Test Product',
          description: 'This is a test product'
        }
      ])
      .select()

    if (insertError) {
      console.error('❌ Lỗi thêm sản phẩm:', insertError)
      return
    }

    console.log('✅ Thêm sản phẩm thành công:', newProduct)
    console.log('🎉 Hãy refresh trang http://localhost:3000 để xem!')

  } catch (error) {
    console.error('❌ Lỗi:', error)
  }
}

simpleSeed()

