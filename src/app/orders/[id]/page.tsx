'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

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

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/buyer/orders/${params.id}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Có lỗi xảy ra khi tải đơn hàng')
        }

        setOrder(result.order)
      } catch (error) {
        console.error('Error fetching order:', error)
        setError(error instanceof Error ? error.message : 'Có lỗi xảy ra')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <XCircleIcon className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Lỗi</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy đơn hàng</h2>
          <p className="text-gray-600 mb-4">Đơn hàng không tồn tại hoặc đã bị xóa</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(order.status)
  const StatusIcon = statusInfo.icon

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Quay lại
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
            <div className="flex items-center gap-2">
              <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
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

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Lịch sử đơn hàng</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Đơn hàng được tạo</p>
                    <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                  </div>
                </div>
                
                {order.verified_at && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.status === 'CONFIRMED' ? 'Đơn hàng được xác nhận' : 'Đơn hàng bị hủy'}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(order.verified_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
