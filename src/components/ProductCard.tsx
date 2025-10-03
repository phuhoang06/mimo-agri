import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
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

export default function ProductCard({
  product,
  isNew = false,
  discountPercent = 0,
  isHot = false
}: ProductCardProps) {
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
      {/* Product Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
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

        {/* Quick Action Button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // TODO: Implement wishlist functionality
              console.log('Add to wishlist:', product.id)
            }}
          >
            <span className="text-red-500">❤️</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        
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
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Action Button */}
        <button 
          className={`w-full font-bold py-2 px-4 rounded transition-colors ${
            isInCart(product.id)
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
              category: 'Nông nghiệp'
            }
            
            addToCart(productData)
          }}
        >
          {isInCart(product.id) ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Đã thêm ({getItemQuantity(product.id)})
            </span>
          ) : (
            'Thêm vào giỏ'
          )}
        </button>
      </div>
    </Link>
  )
}
