'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchCategories, CategoryData } from '@/lib/categories'

export default function CategorySidebar() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="font-semibold text-sm">DANH MỤC SẢN PHẨM</span>
        </div>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3 p-3">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          categories.map((category) => (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              href={`/products?category=${category.id}`}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <span className="text-sm font-medium text-gray-700 flex-1">
                {category.name}
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Subcategories Dropdown */}
            {hoveredCategory === category.id && (
              <div className="absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ml-1">
                <div className="p-3 border-b border-gray-100">
                  <h4 className="font-semibold text-gray-800 text-sm">{category.name}</h4>
                </div>
                <div className="py-2">
                  {category.subcategories.map((sub, index) => (
                    <Link
                      key={index}
                      href={`/products?category=${category.id}&sub=${sub}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <Link
                    href={`/products?category=${category.id}`}
                    className="text-green-600 text-sm font-medium hover:text-green-700"
                  >
                    Xem tất cả →
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3 border-t">
        <Link
          href="/products"
          className="block text-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
        >
          🔍 Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  )
}



