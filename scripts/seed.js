// Script để thêm dữ liệu mẫu vào Supabase
// Chạy: node scripts/seed.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedData() {
  console.log('🌱 Bắt đầu seed dữ liệu...')

  try {
    // 1. Thêm categories
    console.log('📁 Thêm categories...')
    const { error: categoriesError } = await supabase
      .from('categories')
      .insert([
        { name: 'Electronics', type: 'product' },
        { name: 'Fashion', type: 'product' },
        { name: 'Home & Garden', type: 'product' },
        { name: 'Tech News', type: 'article' },
        { name: 'Product Reviews', type: 'article' }
      ])

    if (categoriesError) {
      console.error('❌ Lỗi thêm categories:', categoriesError)
      return
    }

    // Lấy category IDs
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name')

    const electronicsId = categories.find(c => c.name === 'Electronics')?.id
    const fashionId = categories.find(c => c.name === 'Fashion')?.id
    const homeId = categories.find(c => c.name === 'Home & Garden')?.id
    const techNewsId = categories.find(c => c.name === 'Tech News')?.id
    const reviewsId = categories.find(c => c.name === 'Product Reviews')?.id

    // 2. Thêm products
    console.log('📦 Thêm products...')
    const { error: productsError } = await supabase
      .from('products')
      .insert([
        {
          name: 'iPhone 15 Pro',
          price: 999.99,
          stock: 50,
          description: 'Latest iPhone with advanced features and A17 Pro chip',
          category_id: electronicsId,
          image_url: 'https://via.placeholder.com/300x300?text=iPhone+15'
        },
        {
          name: 'MacBook Air M3',
          price: 1299.99,
          stock: 30,
          description: 'Lightweight laptop with M3 chip, perfect for work and creativity',
          category_id: electronicsId,
          image_url: 'https://via.placeholder.com/300x300?text=MacBook+Air'
        },
        {
          name: 'AirPods Pro',
          price: 249.99,
          stock: 100,
          description: 'Active noise cancellation wireless earbuds',
          category_id: electronicsId,
          image_url: 'https://via.placeholder.com/300x300?text=AirPods+Pro'
        },
        {
          name: 'Samsung Galaxy S24',
          price: 899.99,
          stock: 40,
          description: 'Flagship Android phone with excellent camera',
          category_id: electronicsId,
          image_url: 'https://via.placeholder.com/300x300?text=Galaxy+S24'
        },
        {
          name: 'Nike Air Max',
          price: 129.99,
          stock: 75,
          description: 'Comfortable running shoes with Air Max technology',
          category_id: fashionId,
          image_url: 'https://via.placeholder.com/300x300?text=Nike+Air+Max'
        },
        {
          name: 'Coffee Maker',
          price: 159.99,
          stock: 25,
          description: 'Automatic coffee maker with programmable timer',
          category_id: homeId,
          image_url: 'https://via.placeholder.com/300x300?text=Coffee+Maker'
        }
      ])

    if (productsError) {
      console.error('❌ Lỗi thêm products:', productsError)
      return
    }

    console.log('✅ Seed dữ liệu thành công!')
    console.log('🎉 Hãy refresh trang http://localhost:3000 để xem kết quả!')

  } catch (error) {
    console.error('❌ Lỗi seed data:', error)
  }
}

// Chạy seed
seedData()
