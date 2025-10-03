'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Breadcrumb from '@/components/Breadcrumb'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'
import ProductTabs from '@/components/ProductTabs'
import RelatedProducts from '@/components/RelatedProducts'
import ProductSkeleton from '@/components/ProductSkeleton'
import FlexibleVariantSelector, { VariantType, VariantCombination } from '@/components/FlexibleVariantSelector'

interface Product {
  id: string
  name: string
  description: string
  long_description?: string
  category_id?: string
  image_url?: string
  images?: string[]
  video_url?: string
  min_price?: number
  max_price?: number
  original_price?: number
  discount_percent?: number
  stock?: number
  rating?: number
  review_count?: number
  sold_count?: number
  weight?: number
  dimensions?: string
  material?: string
  brand?: string
  warranty?: string
  created_at: string
  updated_at: string
}

// Removed old ProductVariant interface - using FlexibleVariantSelector types

// TODO: Implement variant system with real database data
// For now, we'll use empty arrays until the variant system is properly implemented

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [variantTypes, setVariantTypes] = useState<VariantType[]>([])
  const [variantCombinations, setVariantCombinations] = useState<VariantCombination[]>([])
  const [selectedVariant, setSelectedVariant] = useState<VariantCombination | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (error) throw error
      
      if (!data) {
        setError('Sản phẩm không tồn tại')
        return
      }

      // Sử dụng dữ liệu thực từ database
      const productData: Product = {
        ...data,
        // Xử lý images - ưu tiên data.images nếu có, fallback về data.image_url
        images: data.images && Array.isArray(data.images) && data.images.length > 0
          ? data.images
          : data.image_url 
            ? [data.image_url]
            : ['https://via.placeholder.com/600x600?text=No+Image'],
        // Xử lý video_url - chỉ set nếu có trong database
        video_url: data.video_url || undefined,
        // Thêm các trường mặc định cho UI
        long_description: data.description || 'Mô tả chi tiết sản phẩm sẽ được cập nhật sớm.',
        original_price: data.min_price ? Math.round(data.min_price * 1.2) : undefined,
        discount_percent: data.min_price ? 20 : undefined,
        stock: 50, // Mặc định
        rating: 4.5, // Mặc định
        review_count: Math.floor(Math.random() * 100) + 10, // Random 10-110
        sold_count: Math.floor(Math.random() * 500) + 50, // Random 50-550
        weight: 0.5, // Mặc định
        dimensions: '20 x 15 x 10 cm', // Mặc định
        material: 'Chất liệu cao cấp', // Mặc định
        brand: 'MIMO', // Mặc định
        warranty: '12 tháng' // Mặc định
      }

      setProduct(productData)

      // TODO: Load variants from database when variant system is implemented
      setVariantTypes([])
      setVariantCombinations([])
      // Set initial price - sử dụng min_price từ database
      setTotalPrice(productData.min_price || 0)
      
      // Log để debug
      console.log('Product loaded:', {
        name: productData.name,
        min_price: productData.min_price,
        max_price: productData.max_price,
        images: productData.images,
        video_url: productData.video_url
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleVariantChange = (variant: VariantCombination | null, price: number) => {
    setSelectedVariant(variant)
    setTotalPrice(price)
  }

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', {
      productId: product?.id,
      variant: selectedVariant,
      quantity,
      totalPrice
    })
  }

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buy now:', {
      productId: product?.id,
      variant: selectedVariant,
      quantity,
      totalPrice
    })
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb 
            items={[
              { label: 'Sản phẩm', href: '/products' },
              { label: product.name }
            ]} 
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <div className="lg:sticky lg:top-6">
            <ProductGallery 
              images={product.images || [product.image_url || '']}
              name={product.name}
            />

            {/* Product Video */}
            {product.video_url && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Video sản phẩm</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  {/* YouTube URL */}
                  {product.video_url.includes('youtube.com') || product.video_url.includes('youtu.be') ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(product.video_url)}?rel=0`}
                      width="100%"
                      height="100%"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={product.name}
                    />
                  ) : (
                    <video controls className="w-full h-full" src={product.video_url} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Product Title - Đặt trên cùng nhất */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              {/* Brand */}
              {product.brand && (
                <p className="text-gray-600 mb-2">
                  Thương hiệu: <span className="font-medium text-gray-900">{product.brand}</span>
                </p>
              )}

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating?.toFixed(1)} ({product.review_count || 0} đánh giá)
                  </span>
                </div>
                {product.sold_count && (
                  <span className="text-gray-500 text-sm">
                    Đã bán: {product.sold_count.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Flexible Variant Selector */}
            {variantTypes.length > 0 && (
              <div className="mb-8">
                <FlexibleVariantSelector
                  variantTypes={variantTypes}
                  variantCombinations={variantCombinations}
                  basePrice={product.min_price || 0}
                  onVariantChange={handleVariantChange}
                />
              </div>
            )}
            
            <ProductInfo
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              calculatedPrice={product.min_price || totalPrice}
            />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-12">
          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts 
          categoryId={product.category_id}
          currentProductId={product.id}
        />
      </div>
    </div>
  )
}

function extractYouTubeId(url: string): string {
  try {
    // Support youtu.be/<id> and youtube.com/watch?v=<id>
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '')
    const v = u.searchParams.get('v')
    if (v) return v
    // Fallback try to get last path segment
    const parts = u.pathname.split('/')
    return parts[parts.length - 1] || ''
  } catch {
    return ''
  }
}
