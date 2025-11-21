'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Product, ProductVariant } from '@/lib/supabase'
import { getAllImages } from '@/lib/product-utils'
import { useCart } from '@/contexts/CartContext'
import Breadcrumb from '@/components/Breadcrumb'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'
import ProductTabs from '@/components/ProductTabs'
import ProductSkeleton from '@/components/ProductSkeleton'
import ProductVariantSelector from '@/components/ProductVariantSelector'
import AddToCartModal from '@/components/AddToCartModal'
import CheckoutModal from '@/components/CheckoutModal'

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
  const [productImages, setProductImages] = useState<string[]>([])

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      setLoading(true)

      // Fetch product data from new table
      const { data: productData, error: productError } = await supabase
        .from('tb_agricultural_product')
        .select('*')
        .eq('id', params.id)
        .single()

      if (productError) throw productError

      if (!productData) {
        setError('Sản phẩm không tồn tại')
        return
      }

      // Fetch product variants from new table
      const { data: variantsData, error: variantsError } = await supabase
        .from('tb_product_variant')
        .select('*')
        .eq('product_id', params.id)
        .eq('status', 'active')
        .order('price', { ascending: true })

      if (variantsError) {
        console.warn('Error fetching variants:', variantsError)
      }

      // Process product data
      const product = productData as Product
      const images = getAllImages(product)

      setProduct(product)
      setProductImages(images)
      setVariants(variantsData || [])

      // Auto-select first variant if available
      if (variantsData && variantsData.length > 0) {
        setSelectedVariant(variantsData[0])
      }

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
        variantName: selectedVariant.variant_name,
        price: selectedVariant.price,
        image: productImages[0] || '',
        description: product.description || '',
        sku: selectedVariant.sku || ''
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
    return variants[0]?.price || 0
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
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: 'Sản phẩm', href: '/products' },
              { label: product.name }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">

            {/* Left Column: Gallery (60% on desktop) */}
            <div className="lg:col-span-7 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <ProductGallery
                images={productImages}
                name={product.name}
              />
            </div>

            {/* Right Column: Info (40% on desktop) */}
            <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                  {product.name}
                </h1>

                {/* Price Section */}
                <div className="mb-6 bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl lg:text-4xl font-bold text-red-600">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(getCurrentPrice())}
                    </span>
                  </div>
                </div>

                {/* Variant Selection */}
                {variants.length > 0 && (
                  <div className="mb-6">
                    <ProductVariantSelector
                      variants={variants}
                      selectedVariant={selectedVariant}
                      onVariantChange={handleVariantChange}
                    />
                  </div>
                )}

                <div className="border-t border-gray-100 pt-6 mt-auto">
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
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
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
