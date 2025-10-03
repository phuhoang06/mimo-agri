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
}

export default function AllProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const fetchAllProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(10) // Tối đa 10 sản phẩm
      
      if (error) throw error
      
      setProducts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            TẤT CẢ SẢN PHẨM
          </h2>
          <a
            href="/products"
            className="text-green-600 font-medium hover:text-green-700 transition-colors border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50"
          >
            xem thêm
          </a>
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
                onClick={fetchAllProducts}
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
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    isNew={index < 2}
                    isHot={index < 3}
                    discountPercent={[36, 34, 38, 0, 41, 0, 0, 0, 0, 0][index] || 0}
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
          </>
        )}
      </div>
    </section>
  )
}







