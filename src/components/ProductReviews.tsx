'use client'

import { useState } from 'react'
import ProductRating from './ProductRating'

interface Review {
  id: string
  user_name: string
  rating: number
  comment: string
  date: string
  verified: boolean
  helpful_count: number
  images?: string[]
}

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest')
  const [filterRating, setFilterRating] = useState<number | null>(null)

  // Mock data - trong thực tế sẽ fetch từ API
  const mockReviews: Review[] = [
    {
      id: '1',
      user_name: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Sản phẩm rất tốt, chất lượng cao. Giao hàng nhanh, đóng gói cẩn thận. Sẽ mua lại lần sau.',
      date: '2024-01-15',
      verified: true,
      helpful_count: 12,
      images: ['https://via.placeholder.com/100x100?text=Review+1']
    },
    {
      id: '2',
      user_name: 'Trần Thị B',
      rating: 4,
      comment: 'Sản phẩm đúng như mô tả, giá cả hợp lý. Chỉ có một chút nhỏ là màu sắc hơi khác so với hình ảnh.',
      date: '2024-01-10',
      verified: true,
      helpful_count: 8
    },
    {
      id: '3',
      user_name: 'Lê Văn C',
      rating: 5,
      comment: 'Tuyệt vời! Chất lượng vượt mong đợi. Dịch vụ khách hàng rất tốt, hỗ trợ nhiệt tình.',
      date: '2024-01-08',
      verified: false,
      helpful_count: 15
    },
    {
      id: '4',
      user_name: 'Phạm Thị D',
      rating: 3,
      comment: 'Sản phẩm ổn, nhưng giao hàng hơi chậm. Chất lượng tạm được.',
      date: '2024-01-05',
      verified: true,
      helpful_count: 3
    },
    {
      id: '5',
      user_name: 'Hoàng Văn E',
      rating: 5,
      comment: 'Rất hài lòng với sản phẩm này. Đúng như quảng cáo, sẽ giới thiệu cho bạn bè.',
      date: '2024-01-03',
      verified: true,
      helpful_count: 20
    }
  ]

  const ratingStats = {
    5: 45,
    4: 30,
    3: 15,
    2: 7,
    1: 3
  }

  const totalReviews = mockReviews.length
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews

  const filteredReviews = mockReviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        default:
          return 0
      }
    })

  const handleHelpful = (reviewId: string) => {
    // TODO: Implement helpful functionality
    console.log('Mark as helpful:', reviewId)
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Đánh giá tổng quan</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                <ProductRating rating={averageRating} reviewCount={totalReviews} size="md" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Phân bố đánh giá</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-8">{rating}⭐</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(ratingStats[rating as keyof typeof ratingStats] / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratingStats[rating as keyof typeof ratingStats]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Lọc theo:</span>
          <select
            value={filterRating || ''}
            onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Tất cả đánh giá</option>
            <option value="5">5 sao</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
            <option value="2">2 sao</option>
            <option value="1">1 sao</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="highest">Đánh giá cao</option>
            <option value="lowest">Đánh giá thấp</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {review.user_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.user_name}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓ Đã mua
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <ProductRating rating={review.rating} reviewCount={0} size="sm" showCount={false} />
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Hữu ích ({review.helpful_count})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredReviews.length > 0 && (
        <div className="text-center">
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Xem thêm đánh giá
          </button>
        </div>
      )}

      {/* No Reviews */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">📝</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có đánh giá nào
          </h3>
          <p className="text-gray-500">
            Hãy là người đầu tiên đánh giá sản phẩm này
          </p>
        </div>
      )}
    </div>
  )
}
