import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    min_price?: number
    max_price?: number
    image_url?: string
    default_variant_id?: string
  }
  isNew?: boolean
  discountPercent?: number
  isHot?: boolean
}

export default function ProductCard({
  product,
  isNew = false,
  discountPercent = 0,
  isHot = false,
}: ProductCardProps) {
  const { addToCart } = useCart()
  const { success } = useToast()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)

  const formatPriceRange = (min?: number, max?: number) => {
    if (min && max && min !== max) return `${formatPrice(min)} - ${formatPrice(max)}`
    if (min) return formatPrice(min)
    return 'Liên hệ'
  }

  const calculateOriginalPrice = (price: number, discount: number) =>
    Math.round(price / (1 - discount / 100))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const productData = {
      id: product.id,
      variantId: product.default_variant_id || 'default', // Use actual variant ID if available
      name: product.name,
      variantName: 'Mặc định',
      price: product.min_price || 0,
      image: product.image_url || '/images/placeholder.jpg',
      description: product.description,
      sku: product.id,
    }
    addToCart(productData)
    success('Đã thêm vào giỏ hàng')
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col relative"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {(() => {
          const imageUrl = product.image_url?.trim()
          return imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              unoptimized={imageUrl.startsWith('http')}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-green-100">
              <span className="text-4xl opacity-50">🌱</span>
            </div>
          )
        })()}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isNew && (
            <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">NEW</span>
          )}
          {isHot && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">HOT</span>
          )}
        </div>
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">-{discountPercent}%</span>
          </div>
        )}
      </div>

      {/* Quick Add Overlay (Desktop) */}
      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex justify-center bg-gradient-to-t from-black/50 to-transparent pt-10">
        <button
          className="w-full bg-white text-primary font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-200 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon className="w-4 h-4" />
          Thêm vào giỏ
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm leading-relaxed group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
          {/* Price Section */}
          <div className="mb-3">
            {discountPercent > 0 && product.min_price ? (
              <div className="flex flex-col gap-0.5">
                <span className="text-red-600 font-bold text-base">
                  {formatPriceRange(product.min_price, product.max_price)}
                </span>
                <span className="text-gray-400 line-through text-xs">
                  {product.min_price === product.max_price
                    ? formatPrice(calculateOriginalPrice(product.min_price, discountPercent))
                    : `${formatPrice(calculateOriginalPrice(product.min_price, discountPercent))} - ...`}
                </span>
              </div>
            ) : (
              <span className="text-red-600 font-bold text-base">
                {formatPriceRange(product.min_price, product.max_price)}
              </span>
            )}
          </div>
        </div>
        {/* Mobile Add Button */}
        <button
          className="md:hidden w-full font-medium py-2 px-3 rounded-lg text-xs transition-colors bg-green-50 text-primary hover:bg-primary hover:text-white mt-2 border border-green-100"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </button>
      </div>
    </Link>
  )
}
