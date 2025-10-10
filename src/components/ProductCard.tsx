import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'

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
  // Suppress unused parameter warnings for future use
  void isNew;
  void isHot;
  const { addToCart } = useCart()
  const { success } = useToast()
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatPriceRange = (min?: number, max?: number) => {
    if (min && max && min !== max) {
      return `${formatPrice(min)} - ${formatPrice(max)}`
    } else if (min) {
      return formatPrice(min)
    }
    return 'Liên hệ'
  }

  const calculateOriginalPrice = (price: number, discount: number) => {
    return Math.round(price / (1 - discount / 100))
  }


  return (
    <Link 
      href={`/products/${product.id}`}
      className="block bg-white transition-all duration-200 overflow-hidden group cursor-pointer hover:bg-gray-50 flex flex-col h-full"
    >
      {/* Product Image - Shopee Style */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-green-100">
            <span className="text-3xl">🌱</span>
          </div>
        )}

        {/* Discount Badge - Top Right */}
        {discountPercent > 0 && (
          <div className="absolute top-1 right-1">
            <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              -{discountPercent}%
            </span>
          </div>
        )}
      </div>

      {/* Product Info - Improved spacing and height */}
      <div className="p-4 flex flex-col flex-1 min-h-[140px]">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 leading-tight text-sm h-10">
            {product.name}
          </h3>
          
          {/* Price Section - Better spacing and layout */}
          <div className="mb-3">
            {discountPercent > 0 && product.min_price ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-red-500 font-bold text-sm">
                    {formatPriceRange(product.min_price, product.max_price)}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{discountPercent}%
                  </span>
                </div>
                <div className="text-gray-400 line-through text-xs break-words leading-relaxed">
                  {product.min_price === product.max_price 
                    ? formatPrice(calculateOriginalPrice(product.min_price, discountPercent))
                    : `${formatPrice(calculateOriginalPrice(product.min_price, discountPercent))} - ${formatPrice(calculateOriginalPrice(product.max_price || product.min_price, discountPercent))}`
                  }
                </div>
              </div>
            ) : (
              <span className="text-red-500 font-bold text-sm">
                {formatPriceRange(product.min_price, product.max_price)}
              </span>
            )}
          </div>
          
        </div>
        
        {/* Action Button - Fixed at bottom */}
        <button 
          className="w-full font-medium py-2.5 px-3 rounded text-xs transition-colors bg-green-500 text-white hover:bg-green-600 mt-auto"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            
            const productData = {
              id: product.id,
              variantId: 'default', // Default variant for simple products
              name: product.name,
              variantName: 'Mặc định',
              price: product.min_price || 0,
              image: product.image_url || '/images/placeholder.jpg',
              description: product.description,
              sku: product.id
            }
            
            addToCart(productData)
            success('Đã thêm vào giỏ hàng')
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </Link>
  )
}
