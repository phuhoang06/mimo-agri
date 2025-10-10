'use client'

// import { useState } from 'react'
import { ShoppingCartIcon, BoltIcon } from '@heroicons/react/24/outline'
import QuantitySelector from './QuantitySelector'

interface Product {
  id: string
  name: string
  description: string
  min_price?: number
  max_price?: number
}

interface ProductInfoProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
  onBuyNow: () => void
  calculatedPrice: number
  isBuyingNow?: boolean
}

export default function ProductInfo({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  calculatedPrice,
  isBuyingNow = false
}: ProductInfoProps) {
  // Suppress unused parameter warnings for future use
  void product;
  void calculatedPrice;

  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat('vi-VN', {
  //     style: 'currency',
  //     currency: 'VND',
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0
  //   }).format(price)
  // }


  return (
    <div className="space-y-4">
      {/* Quantity - Shopee Style */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">Số lượng:</span>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          maxQuantity={99}
        />
      </div>

      {/* Action Buttons - Shopee Style */}
      <div className="flex space-x-3">
        <button
          onClick={onAddToCart}
          disabled={isBuyingNow}
          className="flex-1 flex items-center justify-center gap-2 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 bg-green-600 hover:bg-green-700 active:scale-95"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Thêm vào giỏ hàng
        </button>
        
        <button
          onClick={onBuyNow}
          disabled={isBuyingNow}
          className={`flex-1 flex items-center justify-center gap-2 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
            isBuyingNow
              ? 'bg-orange-400 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 active:scale-95'
          }`}
        >
          {isBuyingNow ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Đang xử lý...
            </>
          ) : (
            <>
              <BoltIcon className="w-5 h-5" />
              Mua ngay
            </>
          )}
        </button>
      </div>


      {/* Shipping Info - Compact */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-green-500">🚚</span>
          <span>Miễn phí vận chuyển cho đơn hàng từ 200k</span>
        </div>
      </div>
    </div>
  )
}
