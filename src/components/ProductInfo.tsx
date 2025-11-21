'use client'

// import { useState } from 'react'
import { ShoppingCartIcon, BoltIcon } from '@heroicons/react/24/outline'
import QuantitySelector from './QuantitySelector'

interface Product {
  id: string
  name: string
  description?: string
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
    <div className="space-y-6">
      {/* Quantity */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Số lượng:</span>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          maxQuantity={99}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onAddToCart}
          disabled={isBuyingNow}
          className="flex-1 flex items-center justify-center gap-2 text-green-700 font-semibold py-3.5 px-6 rounded-xl border-2 border-green-600 hover:bg-green-50 transition-all duration-200 active:scale-[0.98]"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Thêm vào giỏ
        </button>

        <button
          onClick={onBuyNow}
          disabled={isBuyingNow}
          className={`flex-1 flex items-center justify-center gap-2 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-green-200 transition-all duration-200 active:scale-[0.98] ${isBuyingNow
            ? 'bg-green-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
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


      {/* Shipping Info - Modern Card */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">Chính sách vận chuyển</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Miễn phí vận chuyển cho đơn hàng từ <span className="font-semibold text-gray-900">200.000₫</span>.
              Giao hàng nhanh trong 24h tại nội thành.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
