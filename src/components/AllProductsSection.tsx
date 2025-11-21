'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product, ProductVariant } from '@/lib/supabase'
import { calculatePriceRange } from '@/lib/product-utils'
import ProductCard from './ProductCard'
import Link from 'next/link'

interface ProductWithPricing extends Product {
  min_price?: number
  max_price?: number
  default_variant_id?: string
}

export default function AllProductsSection() {
  const [products, setProducts] = useState<ProductWithPricing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const fetchAllProducts = async () => {
    try {
      // Fetch products from new table
      const { data: productsData, error: productsError } = await supabase
        .from('tb_agricultural_product')
        .select('*')
        .eq('status', 'active')
        .limit(8)

      if (productsError) throw productsError

      // Fetch variants for each product to calculate pricing
      const productsWithPricing: ProductWithPricing[] = await Promise.all(
        (productsData || []).map(async (product) => {
          const { data: variants } = await supabase
            .from('tb_product_variant')
            .select('*')
            .eq('product_id', product.id)
            .eq('status', 'active')

          const priceRange = calculatePriceRange(variants as ProductVariant[] || [])

          // Find default variant (lowest price)
          let default_variant_id = undefined
          if (variants && variants.length > 0) {
            const defaultVariant = (variants as ProductVariant[]).reduce((prev, curr) => prev.price < curr.price ? prev : curr)
            default_variant_id = defaultVariant.id
          }

          return {
            ...product,
            min_price: priceRange.min,
            max_price: priceRange.max,
            default_variant_id
          }
        })
      )

      setProducts(productsWithPricing)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Tất Cả Sản Phẩm
            </h2>
            <p className="text-gray-500">Khám phá các sản phẩm nông nghiệp chất lượng cao</p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-green-700 transition-colors group"
          >
            Xem tất cả
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 px-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8 max-w-md mx-auto">
              <span className="text-4xl mb-4 block">⚠️</span>
              <h3 className="font-bold text-red-800 mb-2 text-lg">Lỗi kết nối</h3>
              <p className="text-red-600 text-sm mb-6">{error}</p>
              <button
                onClick={fetchAllProducts}
                className="bg-red-500 text-white px-6 py-2.5 rounded-xl hover:bg-red-600 transition-all shadow-sm hover:shadow-md font-medium"
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      description: product.description || '',
                      min_price: product.min_price,
                      max_price: product.max_price,
                      image_url: product.main_image_url,
                      default_variant_id: product.default_variant_id
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-gray-200">
                <span className="text-6xl mb-4 block opacity-50">📦</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Chưa có sản phẩm nào
                </h3>
                <p className="text-gray-500">
                  Hãy quay lại sau để xem sản phẩm mới
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
