'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  description: string
  min_price?: number
  max_price?: number
  image_url?: string
  category_id?: string
}

interface RelatedProductsProps {
  categoryId?: string
  currentProductId: string
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedProducts()
  }, [categoryId, currentProductId])

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('products')
        .select('*')
        .neq('id', currentProductId)
        .limit(8)

      // Nếu có categoryId, ưu tiên sản phẩm cùng danh mục
      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      const { data, error } = await query
      
      if (error) throw error
      
      // Nếu không đủ sản phẩm cùng danh mục, lấy thêm sản phẩm khác
      if (!data || data.length < 4) {
        const { data: moreData, error: moreError } = await supabase
          .from('products')
          .select('*')
          .neq('id', currentProductId)
          .neq('category_id', categoryId)
          .limit(8 - (data?.length || 0))
        
        if (!moreError && moreData) {
          setProducts([...(data || []), ...moreData])
        } else {
          setProducts(data || [])
        }
      } else {
        setProducts(data)
      }
    } catch (err) {
      console.error('Error fetching related products:', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-3 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sản phẩm liên quan</h2>
        <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
          Xem tất cả →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product}
            isNew={index < 2}
            isHot={index < 3}
            discountPercent={[25, 30, 0, 20, 0, 0, 0, 0][index] || 0}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105">
          Xem thêm sản phẩm liên quan
        </button>
      </div>
    </div>
  )
}
