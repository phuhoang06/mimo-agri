'use client'

import { useState, useEffect } from 'react'

export interface VariantType {
  id: string
  name: string
  options: VariantOption[]
}

export interface VariantOption {
  id: string
  name: string
  price_modifier: number
}

export interface VariantCombination {
  id: string
  combination: string[]
  price_modifier: number
  stock: number
  sku: string
}

interface FlexibleVariantSelectorProps {
  variantTypes: VariantType[]
  variantCombinations: VariantCombination[]
  basePrice: number
  onVariantChange: (selectedVariant: VariantCombination | null, totalPrice: number) => void
  className?: string
}

export default function FlexibleVariantSelector({
  variantTypes,
  variantCombinations,
  basePrice,
  onVariantChange,
  className = ''
}: FlexibleVariantSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [currentVariant, setCurrentVariant] = useState<VariantCombination | null>(null)

  // Initialize selected options with first option of each variant type
  useEffect(() => {
    const initialOptions: Record<string, string> = {}
    variantTypes.forEach(variantType => {
      if (variantType.options.length > 0) {
        initialOptions[variantType.id] = variantType.options[0].id
      }
    })
    setSelectedOptions(initialOptions)
  }, [variantTypes])

  // Update current variant when selected options change
  useEffect(() => {
    const selectedCombination = Object.values(selectedOptions)
    
    if (selectedCombination.length === variantTypes.length) {
      const matchingVariant = variantCombinations.find(variant =>
        variant.combination.every(option => selectedCombination.includes(option))
      )
      
      setCurrentVariant(matchingVariant || null)
      
      if (matchingVariant) {
        const totalPrice = basePrice + matchingVariant.price_modifier
        onVariantChange(matchingVariant, totalPrice)
      } else {
        onVariantChange(null, basePrice)
      }
    }
  }, [selectedOptions, variantTypes, variantCombinations, basePrice, onVariantChange])

  const handleOptionChange = (variantTypeId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [variantTypeId]: optionId
    }))
  }

  const getOptionPrice = (variantTypeId: string, optionId: string): number => {
    const variantType = variantTypes.find(vt => vt.id === variantTypeId)
    const option = variantType?.options.find(opt => opt.id === optionId)
    return option?.price_modifier || 0
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-lg">⚙️</span>
        <h3 className="text-lg font-semibold text-gray-900">Tùy chọn sản phẩm</h3>
      </div>
      
      <div className="space-y-6">
        {variantTypes.map((variantType) => (
          <div key={variantType.id} className="space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {variantType.name}
            </h4>
            
            <div className="flex flex-wrap gap-3">
              {variantType.options.map((option) => {
                const isSelected = selectedOptions[variantType.id] === option.id
                const optionPrice = getOptionPrice(variantType.id, option.id)
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionChange(variantType.id, option.id)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 min-w-[120px] ${
                      isSelected
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-25 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium text-sm">{option.name}</div>
                      {optionPrice > 0 && (
                        <div className="text-xs text-green-600 mt-1">
                          +{formatPrice(optionPrice)}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Current Selection Summary */}
      {currentVariant && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✅</span>
            <h5 className="font-semibold text-green-800">Lựa chọn của bạn:</h5>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {variantTypes.map((variantType) => {
              const selectedOptionId = selectedOptions[variantType.id]
              const selectedOption = variantType.options.find(opt => opt.id === selectedOptionId)
              
              return (
                <div key={variantType.id} className="flex justify-between items-center bg-white rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-600">{variantType.name}:</span>
                  <span className="font-medium text-gray-900 text-sm">
                    {selectedOption?.name}
                    {selectedOption?.price_modifier > 0 && (
                      <span className="text-green-600 ml-1 text-xs">
                        (+{formatPrice(selectedOption.price_modifier)})
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
          
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">💰 Tổng giá:</span>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(basePrice + currentVariant.price_modifier)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">📦 Còn lại:</span>
              <span className="text-sm font-medium text-gray-900">
                {currentVariant.stock} sản phẩm
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">🏷️ Mã sản phẩm:</span>
              <span className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {currentVariant.sku}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stock Warning */}
      {currentVariant && currentVariant.stock < 10 && (
        <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 text-lg">⚠️</span>
            <div>
              <span className="text-sm font-medium text-yellow-800">
                Cảnh báo: Chỉ còn {currentVariant.stock} sản phẩm!
              </span>
              <p className="text-xs text-yellow-700 mt-1">
                Hãy đặt hàng sớm để tránh hết hàng
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
