'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchCategories, CategoryData } from '@/lib/categories'
import { ChevronRightIcon, Bars3Icon } from '@heroicons/react/24/outline'

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
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center space-x-3">
        <Bars3Icon className="w-6 h-6" />
        <span className="font-bold text-base tracking-wide">DANH MỤC SẢN PHẨM</span>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto py-2">
        {loading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                <div className="h-4 bg-gray-100 rounded flex-1"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {categories.slice(0, 5).map((category) => (
              <div
                key={category.id}
                className="group relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={`/products?category=${category.id}`}
                  className={`flex items-center justify-between px-5 py-3.5 transition-all duration-200 ${hoveredCategory === category.id
                      ? 'bg-green-50 text-primary font-medium pl-6'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Icon placeholder if available, or just text */}
                    <span>{category.name}</span>
                  </div>
                  <ChevronRightIcon className={`w-4 h-4 transition-transform duration-200 ${hoveredCategory === category.id ? 'text-primary translate-x-1' : 'text-gray-400'
                    }`} />
                </Link>

                {/* Subcategories Dropdown - Mega Menu Style */}
                {hoveredCategory === category.id && (
                  <div className="absolute left-full top-0 w-72 bg-white border border-gray-100 rounded-r-xl shadow-xl z-50 ml-0.5 overflow-hidden animate-fade-in">
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                      <h4 className="font-bold text-gray-800 text-base">{category.name}</h4>
                    </div>
                    <div className="p-2">
                      {category.subcategories.map((sub, index) => (
                        <Link
                          key={index}
                          href={`/products?category=${category.id}&sub=${sub}`}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-primary rounded-lg transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100 bg-gray-50">
                      <Link
                        href={`/products?category=${category.id}`}
                        className="flex items-center justify-center text-primary text-sm font-semibold hover:underline"
                      >
                        Xem tất cả sản phẩm
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Only show if there are more than 5 categories */}
      {categories.length > 5 && (
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <Link
            href="/products"
            className="block w-full py-2.5 text-center text-primary bg-white border border-primary/20 rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      )}
    </div>
  )
}
