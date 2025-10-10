'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import ProductVariantSelector from './ProductVariantSelector'
import QuantitySelector from './QuantitySelector'

interface Product {
  id: string
  name: string
  description: string
  images?: string[]
  image_url?: string
  min_price?: number
  max_price?: number
}

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

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  variants: ProductVariant[]
}

export default function AddToCartModal({
  isOpen,
  onClose,
  product,
  variants
}: AddToCartModalProps) {
  const { addToCart } = useCart()
  const { success } = useToast()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && variants.length > 0) {
      setSelectedVariant(variants[0])
      setQuantity(1)
    }
  }, [isOpen, variants])

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 200)
  }

  const handleAddToCart = async () => {
    if (!selectedVariant || !product) {
      alert('Vui lòng chọn biến thể sản phẩm')
      return
    }

    setIsAdding(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Add multiple quantities
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          variantId: selectedVariant.id,
          name: product.name,
          variantName: selectedVariant.name,
          price: selectedVariant.price,
          image: product.images?.[0] || product.image_url || '',
          description: product.description,
          sku: selectedVariant.sku
        })
      }
      
      success('Đã thêm vào giỏ hàng')
      handleClose()
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  if (!isOpen || !product) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-200 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`fixed inset-x-4 bottom-4 bg-white rounded-t-xl shadow-2xl z-50 transform transition-transform duration-200 ${
        isAnimating ? 'translate-y-full' : 'translate-y-0'
      } animate-slide-up`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Chọn phân loại hàng
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {/* Product Info */}
          <div className="flex items-start space-x-3 mb-6">
            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.images?.[0] || product.image_url || ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                {product.name}
              </h3>
                    <p className="text-red-500 font-bold text-lg mt-1">
                      {selectedVariant ? formatPrice(selectedVariant.price) : formatPrice(product.min_price || 0)}
                    </p>
            </div>
          </div>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="mb-6">
              <ProductVariantSelector
                variants={variants}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượng
            </label>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={selectedVariant?.stock || 99}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !selectedVariant}
              className={`flex-2 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                isAdding || !selectedVariant
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg active:scale-95'
              }`}
            >
              {isAdding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang thêm...
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
