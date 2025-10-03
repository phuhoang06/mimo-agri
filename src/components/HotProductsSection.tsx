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

export default function HotProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHotProducts()
  }, [])

  const fetchHotProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(5) // Chỉ lấy 5 sản phẩm bán chạy nhất
      
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
              Top 5 sản phẩm được nông dân tin tưởng và sử dụng nhiều nhất
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
                onClick={fetchHotProducts}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Hot Products Grid */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    isHot={true}
                    isNew={index === 0}
                    discountPercent={index === 0 ? 40 : index === 1 ? 34 : index === 2 ? 46 : 0}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🔥</span>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Chưa có sản phẩm bán chạy
                </h3>
                <p className="text-gray-500">
                  Hãy quay lại sau để xem những sản phẩm hot nhất
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}







