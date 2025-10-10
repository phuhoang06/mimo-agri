'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'
import Breadcrumb from '@/components/Breadcrumb'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'
import ProductTabs from '@/components/ProductTabs'
import ProductSkeleton from '@/components/ProductSkeleton'
import ProductVariantSelector from '@/components/ProductVariantSelector'
import AddToCartModal from '@/components/AddToCartModal'
import CheckoutModal from '@/components/CheckoutModal'

interface Product {
  id: string
  name: string
  description: string
  category_id?: string
  image_url?: string
  images?: string[]
  video_url?: string
  min_price?: number
  max_price?: number
  created_at: string
  updated_at: string
}

interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string
  price: number
  stock: number
  created_at: string
  updated_at: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('description')
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [showAddToCartModal, setShowAddToCartModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      
      // Fetch product data
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (productError) throw productError
      
      if (!productData) {
        setError('Sản phẩm không tồn tại')
        return
      }

      // Fetch product variants
      const { data: variantsData, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', params.id)
        .order('price', { ascending: true })

      if (variantsError) {
        console.warn('Error fetching variants:', variantsError)
      }

      // Process product data
      const product: Product = {
        ...productData,
        images: productData.images && Array.isArray(productData.images) && productData.images.length > 0
          ? productData.images
          : productData.image_url 
            ? [productData.image_url]
            : ['https://via.placeholder.com/600x600?text=No+Image'],
        video_url: productData.video_url || undefined,
      }

      setProduct(product)
      setVariants(variantsData || [])
      
      // Auto-select first variant if available
      if (variantsData && variantsData.length > 0) {
        setSelectedVariant(variantsData[0])
      }
      
      console.log('Product loaded:', {
        name: product.name,
        variants: variantsData?.length || 0,
        images: product.images,
        video_url: product.video_url
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleVariantChange = (variant: ProductVariant | null) => {
    setSelectedVariant(variant)
  }

  const handleAddToCart = () => {
    setShowAddToCartModal(true)
  }

  const handleBuyNow = async () => {
    if (!selectedVariant || !product) {
      alert('Vui lòng chọn biến thể sản phẩm')
      return
    }
    
    setIsBuyingNow(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Add to cart first
      addToCart({
        id: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: product.images?.[0] || product.image_url || '',
        description: product.description,
        sku: selectedVariant.sku
      })
      
      // Open checkout modal directly
      setShowCheckoutModal(true)
    } catch (error) {
      console.error('Error processing buy now:', error)
    } finally {
      setIsBuyingNow(false)
    }
  }

  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price
    }
    return product?.min_price || 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProductSkeleton count={1} viewMode="grid" />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">😞</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Sản phẩm không tồn tại'}
          </h2>
          <p className="text-gray-600 mb-6">
            Không thể tìm thấy sản phẩm bạn đang tìm kiếm
          </p>
          <button
            onClick={() => router.push('/products')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-first Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <Breadcrumb 
            items={[
              { label: 'Sản phẩm', href: '/products' },
              { label: product.name }
            ]} 
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Product Gallery - Full width on mobile */}
        <div className="bg-white">
          <ProductGallery 
            images={product.images || [product.image_url || '']}
            name={product.name}
          />
        </div>

        {/* Product Info Section - Shopee Style */}
        <div className="bg-white mt-2">
          <div className="p-4">
            {/* Product Title & Rating */}
            <div className="mb-4">
              <h1 className="text-lg font-medium text-gray-900 leading-tight mb-2">
                {product.name}
              </h1>
              

              {/* Price Section - E-commerce Style */}
              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-red-500">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(getCurrentPrice())}
                  </span>
                  {product.min_price && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -23%
                    </span>
                  )}
                </div>
                {product.min_price && (
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-gray-400 line-through">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(product.min_price * 1.3)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Tiết kiệm {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format((product.min_price * 1.3) - getCurrentPrice())}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Variant Selection */}
            {variants.length > 0 && (
              <div className="mb-4">
                <ProductVariantSelector
                  variants={variants}
                  selectedVariant={selectedVariant}
                  onVariantChange={handleVariantChange}
                />
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="border-t border-gray-200 pt-4">
              <ProductInfo
                product={product}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                calculatedPrice={getCurrentPrice()}
                isBuyingNow={isBuyingNow}
              />
            </div>
          </div>
        </div>

        {/* Product Tabs - Shopee Style */}
        <div className="bg-white mt-2">
          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={showAddToCartModal}
        onClose={() => setShowAddToCartModal(false)}
        product={product}
        variants={variants}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onSuccess={(orderId) => {
          setShowCheckoutModal(false)
          console.log('Order created successfully:', orderId)
        }}
      />
    </div>
  )
}

// function extractYouTubeId(url: string): string {
//   try {
//     // Support youtu.be/<id> and youtube.com/watch?v=<id>
//     const u = new URL(url)
//     if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '')
//     const v = u.searchParams.get('v')
//     if (v) return v
//     // Fallback try to get last path segment
//     const parts = u.pathname.split('/')
//     return parts[parts.length - 1] || ''
//   } catch {
//     return ''
//   }
// }
