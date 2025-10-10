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
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-32 bg-gray-50 overflow-hidden flex-shrink-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-green-100">
              <span className="text-4xl">🌱</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {isHot && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                HOT
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                -{discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            {/* Price Section */}
            <div className="mb-3">
              {discountPercent > 0 && product.min_price ? (
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-bold text-lg">
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
                <span className="text-red-600 font-bold text-lg">
                  {formatPrice(product.min_price, product.max_price)}₫
                </span>
              )}
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            className={`w-full font-bold py-2 px-4 rounded transition-colors ${
              isInCart(product.id, '')
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-green-500 text-white hover:bg-green-600'
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
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Đã thêm ({getItemQuantity(product.id, '')})
              </span>
            ) : (
              'Thêm vào giỏ'
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
