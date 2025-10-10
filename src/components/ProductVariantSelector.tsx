'use client'

import { useState, useEffect } from 'react'

interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string
  price: number
  stock: number
  created_at: string
  updated_at: string
}

interface ProductVariantSelectorProps {
  variants: ProductVariant[]
  selectedVariant: ProductVariant | null
  onVariantChange: (variant: ProductVariant | null) => void
  className?: string
}

export default function ProductVariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
  className = ''
}: ProductVariantSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>('')

  // Auto-select first variant if none selected
  useEffect(() => {
    if (!selectedVariant && variants.length > 0) {
      const firstVariant = variants[0]
      setSelectedId(firstVariant.id)
      onVariantChange(firstVariant)
    }
  }, [variants, selectedVariant, onVariantChange])

  const handleVariantChange = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId)
    setSelectedId(variantId)
    onVariantChange(variant || null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  if (variants.length === 0) {
    return null
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Phân loại hàng
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {variants.map((variant) => {
            const isSelected = selectedId === variant.id
            const isOutOfStock = variant.stock === 0
            
            return (
              <label
                key={variant.id}
                className={`relative flex flex-col p-3 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={variant.id}
                  checked={isSelected}
                  onChange={() => handleVariantChange(variant.id)}
                  disabled={isOutOfStock}
                  className="sr-only"
                />
                
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {variant.name}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-red-500">
                    {formatPrice(variant.price)}
                  </span>
                  <span className={`text-xs ${
                    variant.stock > 10 
                      ? 'text-green-600' 
                      : variant.stock > 0 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                  }`}>
                    {variant.stock > 0 
                      ? `${variant.stock} còn`
                      : 'Hết hàng'
                    }
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}