'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, ClipboardDocumentIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface Order {
  id: string
  buyer_name: string
  phone: string
  address: string
  total_amount: number
  status: 'WAITING_CONFIRMATION' | 'CONFIRMED' | 'CANCELLED'
  created_at: string
  updated_at: string
  verified_by?: string
  verified_at?: string
  note?: string
  order_items: OrderItem[]
}

interface OrderItem {
  id: number
  product_id: string
  product_name: string
  price: number
  quantity: number
  subtotal: number
  variant_id?: string
  variant_name?: string
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedOrderIds, setSavedOrderIds] = useState<string[]>([])

  // Load saved order IDs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mimo-saved-orders')
    if (saved) {
      try {
        const orderIds = JSON.parse(saved)
        setSavedOrderIds(orderIds)
      } catch (error) {
        console.error('Error loading saved orders:', error)
      }
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'WAITING_CONFIRMATION':
        return {
          text: 'Chờ xác nhận',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: ClockIcon,
          description: 'Đơn hàng đang chờ nhân viên xác nhận'
        }
      case 'CONFIRMED':
        return {
          text: 'Đã xác nhận',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: CheckCircleIcon,
          description: 'Đơn hàng đã được xác nhận và đang chuẩn bị giao'
        }
      case 'CANCELLED':
        return {
          text: 'Đã hủy',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: XCircleIcon,
          description: 'Đơn hàng đã bị hủy'
        }
      default:
        return {
          text: status,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: ClockIcon,
          description: 'Trạng thái không xác định'
        }
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!orderId.trim()) {
      setError('Vui lòng nhập mã đơn hàng')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/buyer/orders/${orderId.trim()}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Có lỗi xảy ra khi tìm kiếm đơn hàng')
      }

      setOrder(result.order)
    } catch (error) {
      console.error('Error fetching order:', error)
      setError(error instanceof Error ? error.message : 'Có lỗi xảy ra')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveOrderId = (orderId: string) => {
    if (!savedOrderIds.includes(orderId)) {
      const newSavedIds = [...savedOrderIds, orderId]
      setSavedOrderIds(newSavedIds)
      localStorage.setItem('mimo-saved-orders', JSON.stringify(newSavedIds))
    }
  }

  const handleRemoveOrderId = (orderId: string) => {
    const newSavedIds = savedOrderIds.filter(id => id !== orderId)
    setSavedOrderIds(newSavedIds)
    localStorage.setItem('mimo-saved-orders', JSON.stringify(newSavedIds))
  }

  const handleSelectSavedOrder = (orderId: string) => {
    setOrderId(orderId)
    handleSearch(new Event('submit') as React.FormEvent)
  }

  const copyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId)
    // You could add a toast notification here
  }

  if (order) {
    const statusInfo = getStatusInfo(order.status)
    const StatusIcon = statusInfo.icon

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => {
                setOrder(null)
                setOrderId('')
                setError('')
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Tìm kiếm đơn hàng khác
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Đơn hàng #{order.id.slice(-8).toUpperCase()}
                </h1>
                <p className="text-gray-600 mt-1">
                  Đặt lúc {formatDate(order.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                  {statusInfo.text}
                </span>
                <button
                  onClick={() => copyOrderId(order.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy mã đơn hàng"
                >
                  <ClipboardDocumentIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Sản phẩm đã đặt</h2>
                  
                  <div className="space-y-4">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                          {item.variant_name && (
                            <p className="text-sm text-gray-600">Biến thể: {item.variant_name}</p>
                          )}
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(item.subtotal)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                      <span className="text-xl font-bold text-red-500">
                        {formatPrice(order.total_amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trạng thái đơn hàng</h3>
                <div className="flex items-center gap-3 mb-2">
                  <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{statusInfo.description}</p>
                
                {order.verified_at && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Xác nhận lúc: {formatDate(order.verified_at)}
                    </p>
                    {order.verified_by && (
                      <p className="text-sm text-gray-600">
                        Bởi: {order.verified_by}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông tin giao hàng</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Người nhận:</span>
                    <p className="text-gray-600">{order.buyer_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Số điện thoại:</span>
                    <p className="text-gray-600">{order.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Địa chỉ:</span>
                    <p className="text-gray-600">{order.address}</p>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {order.note && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ghi chú</h3>
                  <p className="text-sm text-gray-600">{order.note}</p>
                </div>
              )}

              {/* Save Order Button */}
              {!savedOrderIds.includes(order.id) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">
                        Lưu mã đơn hàng
                      </h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Hãy lưu mã đơn hàng này để dễ dàng kiểm tra trạng thái sau này
                      </p>
                      <button
                        onClick={() => handleSaveOrderId(order.id)}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Lưu mã đơn hàng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kiểm tra trạng thái đơn hàng
          </h1>
          <p className="text-gray-600">
            Nhập mã đơn hàng để xem trạng thái và thông tin chi tiết
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Nhập mã đơn hàng (ví dụ: e64399b2-7528-44cf-989d-90bea4752611)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <MagnifyingGlassIcon className="w-5 h-5" />
              )}
              Tìm kiếm
            </button>
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Saved Orders */}
        {savedOrderIds.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng đã lưu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedOrderIds.map((id) => (
                <div key={id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono text-gray-900 truncate">
                      #{id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">Mã đơn hàng</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelectSavedOrder(id)}
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => handleRemoveOrderId(id)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Hướng dẫn sử dụng</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Nhập mã đơn hàng đầy đủ để kiểm tra trạng thái</p>
            <p>• Mã đơn hàng được gửi qua email/SMS sau khi đặt hàng thành công</p>
            <p>• Lưu mã đơn hàng để dễ dàng kiểm tra sau này</p>
            <p>• Liên hệ hotline nếu cần hỗ trợ thêm</p>
          </div>
        </div>
      </div>
    </div>
  )
}
