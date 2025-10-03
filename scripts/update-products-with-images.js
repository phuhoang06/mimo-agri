// Script: Cập nhật một số sản phẩm với dữ liệu images và video_url demo
// Chạy: node scripts/update-products-with-images.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Demo data cho một số sản phẩm
const DEMO_PRODUCTS = [
  {
    name: 'Bẫy ruồi vàng dạng chai - Chất lượng cao, hiệu quả 45-60 ngày',
    images: [
      'https://via.placeholder.com/600x600/4CAF50/white?text=Bẫy+Ruồi+1',
      'https://via.placeholder.com/600x600/2196F3/white?text=Bẫy+Ruồi+2',
      'https://via.placeholder.com/600x600/FF9800/white?text=Bẫy+Ruồi+3',
      'https://via.placeholder.com/600x600/9C27B0/white?text=Bẫy+Ruồi+4'
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Demo YouTube URL
  },
  {
    name: 'Vòi sen 2000 lỗ',
    images: [
      'https://via.placeholder.com/600x600/00BCD4/white?text=Vòi+Sen+1',
      'https://via.placeholder.com/600x600/795548/white?text=Vòi+Sen+2',
      'https://via.placeholder.com/600x600/607D8B/white?text=Vòi+Sen+3'
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    name: 'Kéo cắt cành tỉa cây V8 SK5 siêu sắc kèm lò xo trợ lực, dễ sử dụng',
    images: [
      'https://via.placeholder.com/600x600/FF5722/white?text=Kéo+Cắt+1',
      'https://via.placeholder.com/600x600/3F51B5/white?text=Kéo+Cắt+2',
      'https://via.placeholder.com/600x600/E91E63/white?text=Kéo+Cắt+3',
      'https://via.placeholder.com/600x600/009688/white?text=Kéo+Cắt+4',
      'https://via.placeholder.com/600x600/CDDC39/white?text=Kéo+Cắt+5'
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
]

async function updateProducts() {
  console.log('🔄 Bắt đầu cập nhật sản phẩm với images và video_url...')

  try {
    for (const demoProduct of DEMO_PRODUCTS) {
      console.log(`\n📦 Cập nhật sản phẩm: ${demoProduct.name}`)
      
      const { data, error } = await supabase
        .from('products')
        .update({
          images: demoProduct.images,
          video_url: demoProduct.video_url
        })
        .eq('name', demoProduct.name)
        .select()

      if (error) {
        console.log(`❌ Lỗi khi cập nhật "${demoProduct.name}":`, error.message)
      } else if (data && data.length > 0) {
        console.log(`✅ Đã cập nhật thành công: ${data[0].name}`)
        console.log(`   📸 Images: ${data[0].images?.length || 0} ảnh`)
        console.log(`   🎥 Video: ${data[0].video_url ? 'Có' : 'Không'}`)
      } else {
        console.log(`⚠️ Không tìm thấy sản phẩm: ${demoProduct.name}`)
      }
    }

    // Kiểm tra kết quả
    console.log('\n🔍 Kiểm tra kết quả...')
    const { data: updatedProducts, error: checkError } = await supabase
      .from('products')
      .select('name, images, video_url')
      .not('images', 'is', null)
      .limit(5)

    if (checkError) {
      console.log('❌ Lỗi khi kiểm tra:', checkError.message)
    } else {
      console.log('📋 Sản phẩm đã được cập nhật:')
      updatedProducts?.forEach(product => {
        console.log(`- ${product.name}`)
        console.log(`  📸 ${product.images?.length || 0} ảnh`)
        console.log(`  🎥 ${product.video_url ? 'Có video' : 'Không có video'}`)
      })
    }

    console.log('\n🎉 Hoàn thành! Bây giờ product detail page sẽ hiển thị:')
    console.log('1. ✅ Nhiều ảnh trong ProductGallery')
    console.log('2. ✅ Video sản phẩm (YouTube embed)')
    console.log('3. ✅ Fallback về image_url nếu không có images')

  } catch (err) {
    console.error('❌ Lỗi:', err.message)
  }
}

updateProducts()
