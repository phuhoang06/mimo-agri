'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  description: string
  min_price?: number
  max_price?: number
  image_url?: string
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8)
      
      if (error) throw error
      
      setProducts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              SẢN PHẨM BÁN CHẠY
            </h2>
            <p className="text-gray-600 text-lg">
              Khám phá các sản phẩm và giải pháp nông nghiệp hiện đại được nông dân tin tưởng
            </p>
          </div>
        </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <span className="text-4xl mb-4 block">⚠️</span>
            <h3 className="font-semibold text-red-800 mb-2">Lỗi kết nối</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={fetchProducts}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📦</span>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Chưa có sản phẩm nào
              </h3>
              <p className="text-gray-500">
                Hãy quay lại sau để xem những sản phẩm mới nhất
              </p>
            </div>
          )}
          
          {/* View All Button */}
          {products.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105"
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          )}
        </>
      )}
      </div>
    </section>
  )
}
