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
    <section className="bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Shopee Style */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-lg font-semibold text-gray-900">
                Sản phẩm bán chạy
              </h2>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-800">
              Xem tất cả →
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8 px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <span className="text-2xl mb-2 block">⚠️</span>
              <h3 className="font-medium text-red-800 mb-1">Lỗi kết nối</h3>
              <p className="text-red-600 text-sm mb-3">{error}</p>
              <button 
                onClick={fetchHotProducts}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Hot Products Grid - Shopee Style */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0">
                {products.map((product, index) => (
                  <div key={product.id} className="border-r border-b border-gray-100 last:border-r-0">
                    <ProductCard 
                      product={product}
                      isHot={true}
                      isNew={index === 0}
                      discountPercent={index === 0 ? 40 : index === 1 ? 34 : index === 2 ? 46 : 0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <span className="text-4xl mb-3 block">🔥</span>
                <h3 className="text-lg font-medium text-gray-600 mb-1">
                  Chưa có sản phẩm bán chạy
                </h3>
                <p className="text-gray-500 text-sm">
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







