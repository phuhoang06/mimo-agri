// Script: Thêm cột images và video_url vào bảng products
// Chạy: node scripts/add-images-video-columns.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addColumns() {
  console.log('🔧 Bắt đầu thêm cột images và video_url vào bảng products...')

  try {
    // 1. Thêm cột images (JSONB array)
    console.log('📸 Thêm cột images (JSONB array)...')
    const { error: imagesError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE products ADD COLUMN images JSONB;'
    })
    
    if (imagesError) {
      console.log('⚠️ Lỗi khi thêm cột images:', imagesError.message)
    } else {
      console.log('✅ Đã thêm cột images thành công')
    }

    // 2. Thêm cột video_url (TEXT)
    console.log('🎥 Thêm cột video_url (TEXT)...')
    const { error: videoError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE products ADD COLUMN video_url TEXT;'
    })
    
    if (videoError) {
      console.log('⚠️ Lỗi khi thêm cột video_url:', videoError.message)
    } else {
      console.log('✅ Đã thêm cột video_url thành công')
    }

    // 3. Kiểm tra cấu trúc bảng sau khi thêm
    console.log('\n🔍 Kiểm tra cấu trúc bảng products sau khi thêm...')
    const { data, error: checkError } = await supabase
      .from('products')
      .select('*')
      .limit(1)
    
    if (checkError) {
      console.log('❌ Lỗi khi kiểm tra:', checkError.message)
    } else if (data && data.length > 0) {
      console.log('📋 Các cột hiện có trong bảng products:')
      console.log(Object.keys(data[0]))
      
      const sample = data[0]
      console.log('\n📸 Images field:', sample.images)
      console.log('🎥 Video URL field:', sample.video_url)
    } else {
      console.log('ℹ️ Không có dữ liệu để kiểm tra')
    }

    console.log('\n🎉 Hoàn thành! Bây giờ bạn có thể:')
    console.log('1. Cập nhật dữ liệu products với images và video_url')
    console.log('2. Sử dụng ProductGallery để hiển thị nhiều ảnh')
    console.log('3. Hiển thị video sản phẩm trong product detail page')

  } catch (err) {
    console.error('❌ Lỗi:', err.message)
  }
}

addColumns()
