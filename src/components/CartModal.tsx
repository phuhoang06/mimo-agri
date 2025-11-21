'use client'

import { useState } from 'react'
import Image from 'next/image'
import { XMarkIcon, ShoppingCartIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import CheckoutModal from './CheckoutModal'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 200)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleUpdateQuantity = async (productId: string, variantId: string, newQuantity: number) => {
    const itemKey = `${productId}-${variantId}`
    setUpdatingItems(prev => new Set(prev).add(itemKey))

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      updateQuantity(productId, variantId, newQuantity)
    } catch (error) {
      console.error('Error updating quantity:', error)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemKey)
        return newSet
      })
    }
  }

  const handleRemoveItem = (productId: string, variantId: string) => {
    setShowRemoveConfirm(`${productId}-${variantId}`)
  }

  const confirmRemoveItem = (productId: string, variantId: string) => {
    removeFromCart(productId, variantId)
    setShowRemoveConfirm(null)
  }

  const handleCheckout = () => {
    setShowCheckoutModal(true)
  }

  const handleCheckoutSuccess = (orderId: string) => {
    // Save order ID to localStorage for tracking
    const savedOrders = JSON.parse(localStorage.getItem('mimo-saved-orders') || '[]')
    if (!savedOrders.includes(orderId)) {
      savedOrders.push(orderId)
      localStorage.setItem('mimo-saved-orders', JSON.stringify(savedOrders))
    }

    setShowCheckoutModal(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md sm:max-w-md bg-white shadow-xl z-50 transform transition-transform duration-200 ${isAnimating ? 'translate-x-full' : 'translate-x-0'
        }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Giỏ hàng ({totalItems})
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Giỏ hàng trống
                </h3>
                <p className="text-gray-500 mb-4">
                  Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
                </p>
                <button
                  onClick={handleClose}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => {
                  const itemKey = `${item.id}-${item.variantId}`
                  const isUpdating = updatingItems.has(itemKey)
                  const showConfirm = showRemoveConfirm === itemKey

                  return (
                    <div key={item.id} className={`flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 p-3 bg-gray-50 rounded-lg transition-all ${isUpdating ? 'opacity-50' : ''}`}>
                      {/* Product Image */}
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                          {item.name}
                        </h4>
                        {item.variantName && (
                          <p className="text-gray-600 text-xs">
                            Biến thể: {item.variantName}
                          </p>
                        )}
                        {item.sku && (
                          <p className="text-gray-500 text-xs">
                            SKU: {item.sku}
                          </p>
                        )}
                        <p className="text-red-500 font-bold text-sm">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.variantId, item.quantity - 1)}
                          disabled={isUpdating || item.quantity <= 1}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? (
                            <div className="w-3 h-3 border border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <MinusIcon className="w-4 h-4" />
                          )}
                        </button>
                        <span className="w-8 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.variantId, item.quantity + 1)}
                          disabled={isUpdating}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? (
                            <div className="w-3 h-3 border border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <PlusIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Remove Button with Confirmation */}
                      {showConfirm ? (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => confirmRemoveItem(item.id, item.variantId)}
                            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => setShowRemoveConfirm(null)}
                            className="w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-600 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRemoveItem(item.id, item.variantId)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Tổng cộng:
                  </span>
                  <span className="text-xl font-bold text-red-500">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-200 font-medium bg-green-500 hover:bg-green-600 hover:shadow-lg active:scale-95 text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Thanh toán
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Xóa tất cả
                  </button>
                </div>

                {/* Shipping Info */}
                <div className="text-center text-sm text-gray-500">
                  <p>🚚 Miễn phí vận chuyển cho đơn hàng từ 200.000đ</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  )
}
