import { createClient } from '@supabase/supabase-js'

// Supabase credentials - sẽ được override bởi .env.local nếu có
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on new schema
export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

// New Product structure (tb_agricultural_product)
export interface Product {
  id: string
  name: string
  description?: string
  short_description?: string
  origin?: string
  manufacturer?: string
  certification?: string
  seo_title?: string
  seo_description?: string
  tags?: string[]
  keywords?: string[]
  main_image_url?: string
  image_urls?: string[]
  status?: string
  created_at: string
  updated_at: string
}

// New Product Category structure (tb_product_category)
export interface ProductCategory {
  id: string
  product_id: string
  category_type: 'SEED' | 'FERTILIZER' | 'PESTICIDE' | 'TOOL' | 'EQUIPMENT'
  category_name: string
  category_code?: string
  position?: number
  created_at: string
  updated_at: string
}

// New Product Variant structure (tb_product_variant)
export interface ProductVariant {
  id: string
  product_id: string
  category_id: string
  variant_name: string
  sku?: string
  barcode?: string
  package_type?: string
  package_size?: string
  weight_value?: number
  weight_unit?: string
  price: number
  compare_price?: number
  cost?: number
  stock_quantity: number
  min_stock_level?: number
  brand?: string
  expiry_date?: string
  batch_number?: string
  variant_image_url?: string
  position?: number
  status?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  buyer_name: string
  phone: string
  address: string
  total_amount: number
  status: 'WAITING_CONFIRMATION' | 'CONFIRMED' | 'CANCELLED'
  created_at: string
  updated_at: string
  verified_by?: string
  verified_at?: string
  note?: string
}

export interface OrderItem {
  id: number
  order_id: string
  product_id: string
  variant_id: string // Now required!
  product_name: string
  price: number
  quantity: number
  subtotal: number
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  category_id: string
  author_id: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  user_id: string
  article_id: string
  content: string
  created_at: string
  updated_at: string
}

// Helper type for Product with computed fields
export interface ProductWithPricing extends Product {
  min_price?: number
  max_price?: number
  categories?: ProductCategory[]
  variants?: ProductVariant[]
}

export interface YoutubeVideo {
  id: string
  video_id: string
  title: string
  description: string
  thumbnail_url: string
  duration: string
  view_count: number
  fetched_at: string
  created_at: string
}
