'use client'

import { useState } from 'react'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (orderId: string) => void
}

interface FormData {
  buyerName: string
  phone: string
  address: string
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState<FormData>({
    buyerName: '',
    phone: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.buyerName.trim()) {
      newErrors.buyerName = 'Vui lòng nhập tên người nhận'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ giao hàng'
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Địa chỉ quá ngắn, vui lòng nhập chi tiết hơn'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData = {
        buyerName: formData.buyerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          variantId: item.variantId,
          variantName: item.variantName
        }))
      }

      // Submit order
      const response = await fetch('/api/buyer/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Có lỗi xảy ra khi đặt hàng')
      }

      // Success
      setOrderId(result.orderId)
      setIsSuccess(true)
      clearCart()

      // Auto close after 3 seconds
      setTimeout(() => {
        onClose()
        onSuccess(result.orderId)
      }, 3000)

    } catch (error) {
      console.error('Error submitting order:', error)
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt hàng')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ buyerName: '', phone: '', address: '' })
      setErrors({})
      setIsSuccess(false)
      setOrderId('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {isSuccess ? 'Đặt hàng thành công!' : 'Thông tin giao hàng'}
            </h2>
            {!isSuccess && (
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {isSuccess ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Đơn hàng đã được tạo!
                </h3>
                <p className="text-gray-600 mb-4">
                  Mã đơn hàng: <span className="font-mono font-bold text-green-600">{orderId}</span>
                </p>
                
                {/* Save Order ID Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-blue-500 mt-0.5">💾</div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">
                        Lưu mã đơn hàng
                      </h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Mã đơn hàng đã được tự động lưu để bạn có thể kiểm tra trạng thái sau này.
                      </p>
                      <p className="text-xs text-blue-600">
                        Truy cập <strong>/track-order</strong> để xem lịch sử đơn hàng đã lưu.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">
                  Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
                </p>
                <div className="mt-4 text-xs text-gray-400">
                  Modal sẽ tự động đóng sau 3 giây...
                </div>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tóm tắt đơn hàng</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Số sản phẩm:</span>
                      <span className="font-medium">{items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tổng cộng:</span>
                      <span className="font-bold text-red-500">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên người nhận *
                  </label>
                  <input
                    type="text"
                    value={formData.buyerName}
                    onChange={(e) => handleInputChange('buyerName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.buyerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập họ tên người nhận"
                    disabled={isSubmitting}
                  />
                  {errors.buyerName && (
                    <p className="text-red-500 text-xs mt-1">{errors.buyerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập số điện thoại (10-11 số)"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                    disabled={isSubmitting}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-green-400 cursor-not-allowed text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </div>
                  ) : (
                    'Xác nhận đặt hàng'
                  )}
                </button>

                {/* Note */}
                <p className="text-xs text-gray-500 text-center">
                  * Thông tin bắt buộc. Chúng tôi sẽ liên hệ xác nhận đơn hàng.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
