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
    <section className="bg-gray-50 mt-2">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Shopee Style */}
        <div className="px-4 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📦</span>
              <h2 className="text-lg font-semibold text-gray-900">
                Tất cả sản phẩm
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Xem tất cả →
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12 bg-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8 px-4 bg-white">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <span className="text-2xl mb-2 block">⚠️</span>
              <h3 className="font-medium text-red-800 mb-1">Lỗi kết nối</h3>
              <p className="text-red-600 text-sm mb-3">{error}</p>
              <button 
                onClick={fetchAllProducts}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Products Grid - Shopee Style */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-2">
                  {products.map((product, index) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <ProductCard 
                        product={product}
                        isNew={index < 2}
                        isHot={index < 3}
                        discountPercent={[36, 34, 38, 0, 41, 0, 0, 0, 0, 0][index] || 0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 px-4 bg-white">
                <span className="text-4xl mb-3 block">📦</span>
                <h3 className="text-lg font-medium text-gray-600 mb-1">
                  Chưa có sản phẩm nào
                </h3>
                <p className="text-gray-500 text-sm">
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







