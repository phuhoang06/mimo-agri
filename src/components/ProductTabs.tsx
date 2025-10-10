'use client'

import { useState } from 'react'
import ProductSpecifications from './ProductSpecifications'

interface Product {
  id: string
  name: string
  description: string
}

interface ProductTabsProps {
  product: Product
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function ProductTabs({ product, activeTab, onTabChange }: ProductTabsProps) {
  const tabs = [
    {
      id: 'description',
      label: 'Mô tả',
      icon: '📝'
    },
    {
      id: 'shipping',
      label: 'Vận chuyển',
      icon: '🚚'
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
            
            {/* Additional description sections */}
            <div className="mt-8 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">🌟 Điểm nổi bật</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Chất lượng cao, bền bỉ theo thời gian
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Thiết kế hiện đại, phù hợp với nhiều không gian
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Dễ sử dụng và bảo quản
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Giá trị tuyệt vời cho tiền bạc
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">✅ Cam kết chất lượng</h3>
                <p className="text-green-800">
                  Chúng tôi cam kết mang đến sản phẩm chất lượng tốt nhất với dịch vụ khách hàng tận tâm. 
                  Mọi sản phẩm đều được kiểm tra kỹ lưỡng trước khi giao hàng.
                </p>
              </div>
            </div>
          </div>
        )

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">🚚 Thông tin vận chuyển</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Miễn phí vận chuyển</h4>
                    <p className="text-gray-600 text-sm">Cho đơn hàng từ 500.000₫ trở lên</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Giao hàng nhanh</h4>
                    <p className="text-gray-600 text-sm">1-2 ngày làm việc cho khu vực nội thành</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-sm">📦</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Đóng gói cẩn thận</h4>
                    <p className="text-gray-600 text-sm">Sản phẩm được đóng gói an toàn, chống va đập</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">🔄 Chính sách đổi trả</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-sm">7</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Đổi trả trong 7 ngày</h4>
                    <p className="text-gray-600 text-sm">Kể từ ngày nhận hàng, với điều kiện sản phẩm còn nguyên vẹn</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-sm">💯</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Hoàn tiền 100%</h4>
                    <p className="text-gray-600 text-sm">Nếu sản phẩm có lỗi từ nhà sản xuất</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 text-sm">🆓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Miễn phí đổi trả</h4>
                    <p className="text-gray-600 text-sm">Chúng tôi hỗ trợ phí vận chuyển cho việc đổi trả</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Lưu ý quan trọng</h3>
              <ul className="space-y-1 text-yellow-800 text-sm">
                <li>• Sản phẩm phải còn nguyên vẹn, chưa sử dụng</li>
                <li>• Giữ nguyên tem nhãn và bao bì gốc</li>
                <li>• Liên hệ hotline để được hỗ trợ đổi trả</li>
                <li>• Thời gian xử lý đổi trả: 3-5 ngày làm việc</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white">
      {/* Tab Navigation - Shopee Style */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {renderTabContent()}
      </div>
    </div>
  )
}
