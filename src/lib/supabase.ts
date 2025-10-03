import { createClient } from '@supabase/supabase-js'

// Supabase credentials - sẽ được override bởi .env.local nếu có
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wdrhgnynlchomcsnpzum.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmhnbnlubGNob21jc25wenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDY2MDQsImV4cCI6MjA3MzQ4MjYwNH0.POPBCeDLWCmcY7YJgYsBjsOwF4eSeoMUJla2l8yRL4M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on your schema
export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  category_id?: string
  image_url?: string
  images?: string[]
  video_url?: string
  min_price?: number
  max_price?: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  type: 'product' | 'article'
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'shipped' | 'done' | 'cancelled'
  total_price: number
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  qty: number
  price: number
  created_at: string
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


