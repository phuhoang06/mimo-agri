import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

interface ProductCardListProps {
  product: {
    id: string
    name: string
    description: string
    min_price?: number
    max_price?: number
    image_url?: string
  }
  isNew?: boolean
  discountPercent?: number
  isHot?: boolean
}

export default function ProductCardList({
  product,
  isNew = false,
  discountPercent = 0,
  isHot = false
}: ProductCardListProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart()
  const formatPrice = (min?: number, max?: number) => {
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()}`
    } else if (min) {
      return min.toLocaleString()
    }
    return 'Liên hệ'
  }

  const calculateOriginalPrice = (price: number, discount: number) => {
    return Math.round(price / (1 - discount / 100))
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gray-50 overflow-hidden flex-shrink-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized={product.image_url.startsWith('http')}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-green-100">
              <span className="text-4xl">🌱</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isNew && (
              <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                NEW
              </span>
            )}
            {isHot && (
              <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                HOT
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                -{discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="mb-4">
              {discountPercent > 0 && product.min_price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-red-600 font-bold text-xl">
                    {formatPrice(product.min_price, product.max_price)}₫
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    {formatPrice(
                      calculateOriginalPrice(product.min_price, discountPercent),
                      product.max_price ? calculateOriginalPrice(product.max_price, discountPercent) : undefined
                    )}₫
                  </span>
                </div>
              ) : (
                <span className="text-red-600 font-bold text-xl">
                  {formatPrice(product.min_price, product.max_price)}₫
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            className={`w-full font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 ${isInCart(product.id, '')
              ? 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100'
              : 'bg-gray-50 text-gray-700 hover:bg-primary hover:text-white hover:shadow-md'
              }`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()

              const productData = {
                id: product.id,
                name: product.name,
                price: product.min_price || 0,
                originalPrice: discountPercent > 0 ? (product.min_price || 0) / (1 - discountPercent / 100) : undefined,
                image: product.image_url || '/images/placeholder.jpg',
                description: product.description,
                category: 'Nông nghiệp',
                variantId: '',
                variantName: ''
              }

              addToCart(productData)
            }}
          >
            {isInCart(product.id, '') ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Đã thêm ({getItemQuantity(product.id, '')})</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Thêm vào giỏ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
