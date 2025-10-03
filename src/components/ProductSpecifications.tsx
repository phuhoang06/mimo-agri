interface Product {
  id: string
  name: string
  description?: string
  min_price?: number
  max_price?: number
  weight?: number
  dimensions?: string
  material?: string
  brand?: string
  warranty?: string
  stock?: number
  rating?: number
  review_count?: number
  sold_count?: number
}

interface ProductSpecificationsProps {
  product: Product
}

export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specifications = [
    {
      label: 'Tên sản phẩm',
      value: product.name
    },
    {
      label: 'Mô tả',
      value: product.description || 'Không có mô tả'
    },
    {
      label: 'Giá bán',
      value: product.min_price && product.max_price && product.min_price !== product.max_price
        ? `${product.min_price.toLocaleString('vi-VN')}₫ - ${product.max_price.toLocaleString('vi-VN')}₫`
        : product.min_price
        ? `${product.min_price.toLocaleString('vi-VN')}₫`
        : 'Liên hệ'
    },
    {
      label: 'Thương hiệu',
      value: product.brand || 'MIMO'
    },
    {
      label: 'Chất liệu',
      value: product.material || 'Chất liệu cao cấp'
    },
    {
      label: 'Kích thước',
      value: product.dimensions || 'Theo sản phẩm'
    },
    {
      label: 'Trọng lượng',
      value: product.weight ? `${product.weight} kg` : 'Theo sản phẩm'
    },
    {
      label: 'Bảo hành',
      value: product.warranty || '12 tháng'
    },
    {
      label: 'Tình trạng',
      value: product.stock && product.stock > 0 ? 'Còn hàng' : 'Hết hàng'
    },
    {
      label: 'Đánh giá',
      value: product.rating ? `${product.rating}/5 (${product.review_count || 0} đánh giá)` : 'Chưa có đánh giá'
    },
    {
      label: 'Đã bán',
      value: product.sold_count ? `${product.sold_count.toLocaleString()} sản phẩm` : 'Chưa có dữ liệu'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📋 Thông số kỹ thuật</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <span className="text-gray-600 font-medium">{spec.label}:</span>
              <span className="text-gray-900 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional technical details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🔧 Thông tin kỹ thuật bổ sung</h3>
        <div className="space-y-3 text-blue-800">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Sản phẩm được sản xuất theo tiêu chuẩn chất lượng quốc tế</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Đã qua kiểm định chất lượng và an toàn</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Phù hợp với tiêu chuẩn CE, RoHS</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Thân thiện với môi trường</span>
          </div>
        </div>
      </div>

      {/* Usage instructions */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-3">📖 Hướng dẫn sử dụng</h3>
        <div className="space-y-2 text-green-800">
          <p>1. Đọc kỹ hướng dẫn trước khi sử dụng</p>
          <p>2. Bảo quản ở nơi khô ráo, thoáng mát</p>
          <p>3. Tránh tiếp xúc trực tiếp với ánh nắng mặt trời</p>
          <p>4. Vệ sinh định kỳ để duy trì chất lượng</p>
          <p>5. Liên hệ hỗ trợ nếu gặp vấn đề trong quá trình sử dụng</p>
        </div>
      </div>

      {/* Safety warnings */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-900 mb-3">⚠️ Cảnh báo an toàn</h3>
        <div className="space-y-2 text-red-800">
          <p>• Không sử dụng cho trẻ em dưới 3 tuổi</p>
          <p>• Tránh để sản phẩm gần nguồn nhiệt cao</p>
          <p>• Không tự ý tháo lắp hoặc sửa chữa</p>
          <p>• Ngừng sử dụng nếu phát hiện hư hỏng</p>
        </div>
      </div>
    </div>
  )
}
