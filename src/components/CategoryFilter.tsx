'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Category } from '@/lib/categories'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  className?: string
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className = ''
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategoryChange('') // Deselect if already selected
    } else {
      onCategoryChange(categoryId)
    }
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>🏷️</span>
          Danh mục sản phẩm
        </h3>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {/* Categories */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-2">
            {/* All Categories */}
              <button
                onClick={() => handleCategoryClick('')}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === ''
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">Tất cả sản phẩm</span>
                </div>
                <span className="text-sm text-gray-500">
                  {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
                </span>
              </button>

            {/* Category List */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Clear Filter */}
          {selectedCategory && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => onCategoryChange('')}
                className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Xóa bộ lọc danh mục
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
