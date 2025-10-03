// Script: Xóa sạch dữ liệu products/categories (type 'product') và seed lại theo danh sách cung cấp
// Chạy: node scripts/reset-and-seed-products.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Danh sách sản phẩm cần seed (name, price, categoryName)
const PRODUCT_ROWS = [
  ['Bẫy ruồi vàng dạng chai - Chất lượng cao, hiệu quả 45-60 ngày', 129000, 'Bẫy Ruồi Vàng - Côn Trùng'],
  ['Bẫy ruồi vàng, bẫy màu côn trùng 2 mặt - Hiệu quả với nhiều loài gây hại cho vườn lan, rau hoa màu và cây ăn trái', 1990, 'Bẫy Ruồi Vàng - Côn Trùng'],
  ['Dụng cụ nắp bẫy ruồi vàng', 4290, 'Bẫy Ruồi Vàng - Côn Trùng'],
  ['Combo 10 ống tinh dầu dẫn dụ bẫy ruồi vàng 2ml', 42900, 'Bẫy Ruồi Vàng - Côn Trùng'],
  ['Bẫy côn trùng 2 mặt dạng cuộn 100m (vàng/xanh) - Hàng nhập khẩu', 589000, 'Bẫy Ruồi Vàng - Côn Trùng'],
  ['Bẫy ruồi vàng 21.5x38.5(cm)', 6900, 'Bẫy Ruồi Vàng - Côn Trùng'],
  ['Vòi sen 2000 lỗ', 48900, 'Vòi Tưới Cây'],
  ['Vòi sen 1000 lỗ', 48900, 'Vòi Tưới Cây'],
  ['Vòi phun sương điện', 264000, 'Vòi Tưới Cây'],
  ['Vòi phun sương xịt nước thông minh thay thế bình phun xịt nước tưới cây', 9900, 'Vòi Tưới Cây'],
  ['Vòi tưới cây đa năng thay đổi tia nước (bền, hiệu quả, tiết kiệm)', 5990, 'Vòi Tưới Cây'],
  ['Kéo cắt cành tỉa cây V8 SK5 siêu sắc kèm lò xo trợ lực, dễ sử dụng', 149000, 'Dụng Cụ Làm Vườn'],
  ['Kéo cắt cành tỉa cây siêu sắc - Thép không gỉ, thon gọn đa năng dễ sử dụng', 39900, 'Dụng Cụ Làm Vườn'],
  ['Kéo mũi nhọn cắt tỉa quả, lá dăm, cành nhỏ (thép không gỉ cao cấp)', 29900, 'Dụng Cụ Làm Vườn'],
  ['Khay trồng rau mầm Loại 1, không mùi, bền, đẹp làm từ nhựa nguyên sinh', 22900, 'Dụng Cụ Làm Vườn'],
  ['Chậu vải trồng rau, túi vải trồng cây nhiều kích cỡ (độ bền cao, thông thoáng, thoát nước tốt)', 3900, 'Dụng Cụ Làm Vườn'],
  ['Lưới trồng cây, lưới làm giàn leo mướp, nho, bầu bí, cây hoa, dưa chuột (Siêu bền, đẹp, chắc chắn)', 19990, 'Dụng Cụ Làm Vườn'],
  ['Dây buộc cành cây 50m - Kẽm bọc nhựa - Tích hợp đầu cắt tiện lợi, cố định thân cây', 19900, 'Dụng Cụ Làm Vườn'],
  ['Găng tay làm vườn chuyên dụng (1 đôi) bảo vệ đôi bàn tay, co giãn đàn hồi tốt', 19900, 'Dụng Cụ Làm Vườn']
]

async function resetAndSeed() {
  console.log('🧹 Bắt đầu reset dữ liệu products/categories (type=product)...')

  try {
    // 0) Thu thập toàn bộ product_ids hiện có để đảm bảo xóa sạch
    let allProductIds = []
    {
      const { data: allProducts, error: fetchAllProdErr } = await supabase
        .from('products')
        .select('id')

      if (fetchAllProdErr) {
        console.warn('⚠️ Không thể lấy toàn bộ products (bỏ qua bước 0):', fetchAllProdErr.message)
      } else {
        allProductIds = (allProducts || []).map(p => p.id)
      }
    }

    // 0.1) Xóa order_items tham chiếu tới bất kỳ product nào (nếu có bảng/column)
    if (allProductIds.length > 0) {
      try {
        console.log(`🗑️ Xóa order_items tham chiếu ${allProductIds.length} products (toàn bộ)...`)
        const { error: delAllOrderItemsErr } = await supabase
          .from('order_items')
          .delete()
          .in('product_id', allProductIds)

        if (delAllOrderItemsErr) {
          console.warn('⚠️ Không thể xóa order_items (bỏ qua nếu bảng/column khác):', delAllOrderItemsErr.message)
        }
      } catch (e) {
        console.warn('⚠️ Bỏ qua xóa order_items do lỗi runtime:', e?.message || e)
      }
    }

    // 0.2) Xóa product_variants (nếu có)
    if (allProductIds.length > 0) {
      try {
        console.log('🗑️ Xóa product_variants (nếu có)...')
        const { error: delVariantsErr } = await supabase
          .from('product_variants')
          .delete()
          .in('product_id', allProductIds)

        if (delVariantsErr) {
          console.warn('⚠️ Không thể xóa product_variants (có thể bảng không tồn tại):', delVariantsErr.message)
        }
      } catch (e) {
        console.warn('⚠️ Bỏ qua xóa product_variants do lỗi runtime:', e?.message || e)
      }
    }

    // 0.3) Xóa toàn bộ products (dựa trên danh sách id)
    if (allProductIds.length > 0) {
      console.log('🗑️ Xóa toàn bộ products...')
      const { error: delAllProductsErr } = await supabase
        .from('products')
        .delete()
        .in('id', allProductIds)

      if (delAllProductsErr) {
        console.error('❌ Lỗi xóa toàn bộ products:', delAllProductsErr)
        return
      }
    }

    // 1) Thu thập các category (type=product) hiện có để xóa
    const { data: productCategories, error: fetchCatErr } = await supabase
      .from('categories')
      .select('id, name')
      .eq('type', 'product')

    if (fetchCatErr) {
      console.error('❌ Lỗi lấy categories:', fetchCatErr)
      return
    }

    const categoryIds = (productCategories || []).map(c => c.id)

    // 2) (Đã xóa toàn bộ products ở bước 0). Nếu không có product nào, tiếp tục.

    // 3) Xóa chính các categories (type=product)
    if (categoryIds.length > 0) {
      console.log('🗑️ Xóa categories type=product...')
      const { error: delCatErr } = await supabase
        .from('categories')
        .delete()
        .in('id', categoryIds)

      if (delCatErr) {
        console.error('❌ Lỗi xóa categories:', delCatErr)
        return
      }
    }

    // 4) Chuẩn bị danh mục mới từ dữ liệu
    const REQUIRED_CATEGORIES = [
      'Bẫy Ruồi Vàng - Côn Trùng',
      'Vòi Tưới Cây',
      'Dụng Cụ Làm Vườn',
      // Giữ các nhóm mùa theo UI hiện tại nếu cần hiển thị
      'Hạt Giống Mùa Hè',
      'Hạt Giống Mùa Thu',
      'Hạt Giống Mùa Đông',
      // Tên trên UI: "Đất - Phân Bón - Thuốc" có thể là gộp; nếu bạn muốn dùng đúng tên cũ
      'Phân Bón - Thuốc'
    ]

    const categoryNameSet = new Set([
      ...REQUIRED_CATEGORIES,
      ...PRODUCT_ROWS.map(r => r[2])
    ])
    const categoriesToInsert = Array.from(categoryNameSet).map(name => ({ name, type: 'product' }))

    console.log(`📁 Thêm mới ${categoriesToInsert.length} categories...`)
    const { error: insertCatErr } = await supabase
      .from('categories')
      .insert(categoriesToInsert)

    if (insertCatErr) {
      console.error('❌ Lỗi thêm categories mới:', insertCatErr)
      return
    }

    // 5) Lấy lại id categories
    const { data: newCategories, error: refetchCatErr } = await supabase
      .from('categories')
      .select('id, name')
      .eq('type', 'product')
      .in('name', Array.from(categoryNameSet))

    if (refetchCatErr) {
      console.error('❌ Lỗi lấy lại categories:', refetchCatErr)
      return
    }

    const nameToId = new Map(newCategories.map(c => [c.name, c.id]))

    // 6) Chuẩn hóa rows sản phẩm để insert
    const productInserts = PRODUCT_ROWS.map(([name, price, categoryName]) => ({
      name,
      min_price: price,
      max_price: price,
      description: null,
      image_url: null,
      images: null,
      video_url: null,
      category_id: nameToId.get(categoryName) || null
    }))

    // Kiểm tra thiếu category mapping
    const missingCategory = productInserts.find(p => !p.category_id)
    if (missingCategory) {
      console.error('❌ Thiếu category cho sản phẩm:', missingCategory.name)
      return
    }

    console.log(`📦 Thêm ${productInserts.length} products...`)
    const { error: insertProdErr } = await supabase
      .from('products')
      .insert(productInserts)

    if (insertProdErr) {
      console.error('❌ Lỗi thêm products:', insertProdErr)
      return
    }

    console.log('✅ Reset & seed hoàn tất!')
    console.log('🎉 Hãy refresh http://localhost:3000 để xem dữ liệu mới.')

  } catch (error) {
    console.error('❌ Lỗi reset-and-seed:', error)
  }
}

resetAndSeed()


