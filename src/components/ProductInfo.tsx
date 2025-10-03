'use client'

import { useState } from 'react'
import QuantitySelector from './QuantitySelector'

interface Product {
  id: string
  name: string
  description: string
  min_price?: number
  max_price?: number
  original_price?: number
  discount_percent?: number
  stock?: number
  rating?: number
  review_count?: number
  sold_count?: number
  brand?: string
  warranty?: string
}

interface ProductInfoProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
  onBuyNow: () => void
  calculatedPrice: number
}

export default function ProductInfo({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  calculatedPrice
}: ProductInfoProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN')
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // TODO: Implement wishlist functionality
  }

  const handleShare = () => {
    setIsSharing(true)
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).finally(() => setIsSharing(false))
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Đã sao chép link sản phẩm!')
        setIsSharing(false)
      })
    }
  }

  const isOutOfStock = product.stock === 0
  const hasDiscount = product.discount_percent && product.discount_percent > 0

  return (
    <div className="space-y-6">

      {/* Price Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4 mb-2">
          {/* Hiển thị giá theo min_price và max_price từ database */}
          {product.min_price && product.max_price && product.min_price !== product.max_price ? (
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-red-600">
                {formatPrice(product.min_price)}₫
              </span>
              <span className="text-gray-500">-</span>
              <span className="text-3xl font-bold text-red-600">
                {formatPrice(product.max_price)}₫
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-red-600">
              {formatPrice(calculatedPrice)}₫
            </span>
          )}
          
          {hasDiscount && product.original_price && (
            <>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.original_price)}₫
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                -{product.discount_percent}%
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          {isOutOfStock ? (
            <span className="text-red-600 font-medium">Hết hàng</span>
          ) : (
            <>
              <span className="text-green-600 font-medium">Còn hàng</span>
              {product.stock && (
                <span className="text-gray-500 text-sm">
                  ({product.stock} sản phẩm)
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Variants will be handled by FlexibleVariantSelector in parent component */}

      {/* Quantity */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        maxQuantity={product.stock || 99}
        disabled={isOutOfStock}
      />

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className="flex-1 bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            🛒 Thêm vào giỏ hàng
          </button>
          <button
            onClick={onBuyNow}
            disabled={isOutOfStock}
            className="flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Mua ngay
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleWishlist}
            className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
              isWishlisted
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isWishlisted ? '❤️ Đã yêu thích' : '🤍 Yêu thích'}
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {isSharing ? 'Đang chia sẻ...' : '📤 Chia sẻ'}
          </button>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Product Features */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Thông tin sản phẩm</h3>
        <div className="space-y-2 text-sm">
          {product.brand && (
            <div className="flex justify-between">
              <span className="text-gray-600">Thương hiệu:</span>
              <span className="font-medium">{product.brand}</span>
            </div>
          )}
          {product.warranty && (
            <div className="flex justify-between">
              <span className="text-gray-600">Bảo hành:</span>
              <span className="font-medium">{product.warranty}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Tình trạng:</span>
            <span className="font-medium text-green-600">Mới 100%</span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🚚 Thông tin giao hàng</h3>
        <div className="space-y-1 text-sm text-blue-800">
          <p>• Miễn phí vận chuyển cho đơn hàng từ 500.000₫</p>
          <p>• Giao hàng trong 1-2 ngày làm việc</p>
          <p>• Hỗ trợ đổi trả trong 7 ngày</p>
        </div>
      </div>
    </div>
  )
}
