'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import ProductCardList from '@/components/ProductCardList'
import CategoryFilter from '@/components/CategoryFilter'
import Breadcrumb from '@/components/Breadcrumb'
import ViewToggle from '@/components/ViewToggle'
import ProductSkeleton from '@/components/ProductSkeleton'
import { fetchCategoriesWithCount, Category } from '@/lib/categories'
import { getAllImages } from '@/lib/product-utils'
import type { Product as SupabaseProduct } from '@/lib/supabase'

// Extended Product interface for UI
interface Product extends SupabaseProduct {
  min_price?: number
  max_price?: number
  image_url?: string
  default_variant_id?: string
  category_names?: string[]
}

interface FilterState {
  category: string
  minPrice: number
  maxPrice: number
  search: string
  sortBy: 'name' | 'price_asc' | 'price_desc' | 'newest'
}

export default function ProductsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalProducts, setTotalProducts] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const productsPerPage = 12
  const currentPage = Number(searchParams.get('page')) || 1

  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category') || '',
    minPrice: 0,
    maxPrice: 10000000,
    search: searchParams.get('search') || '',
    sortBy: (searchParams.get('sort') as any) || 'newest'
  })

  // Initial load of categories
  useEffect(() => {
    fetchCategoriesWithCount().then(setCategories)
  }, [])

  // Sync filters with URL
  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || '',
      minPrice: 0,
      maxPrice: 10000000,
      search: searchParams.get('search') || '',
      sortBy: (searchParams.get('sort') as any) || 'newest'
    })
  }, [searchParams])

  // Fetch products when filters or page changes
  useEffect(() => {
    fetchProducts()
  }, [filters, currentPage])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // 1. Base Query
      let query = supabase
        .from('tb_agricultural_product')
        .select('*', { count: 'exact' })
        .eq('status', 'active')

      // 2. Apply Filters
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`)
      }

      // Category filtering requires a different approach since it's a many-to-many relationship
      // We'll handle category filtering by first getting product IDs if a category is selected
      let productIds: string[] | null = null
      if (filters.category) {
        const { data: categoryProducts } = await supabase
          .from('tb_product_category')
          .select('product_id')
          .eq('category_name', filters.category)

        if (categoryProducts) {
          productIds = categoryProducts.map(item => item.product_id)
          query = query.in('id', productIds)
        }
      }

      // 3. Apply Sorting
      switch (filters.sortBy) {
        case 'name':
          query = query.order('name', { ascending: true })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        // Price sorting is tricky because price is in variants table. 
        // For now, we'll sort by created_at as default and handle price sort if needed differently
        default:
          query = query.order('created_at', { ascending: false })
      }

      // 4. Apply Pagination
      const from = (currentPage - 1) * productsPerPage
      const to = from + productsPerPage - 1
      query = query.range(from, to)

      // Execute Query
      const { data: productsData, error: productsError, count } = await query

      if (productsError) throw productsError
      setTotalProducts(count || 0)

      if (!productsData || productsData.length === 0) {
        setProducts([])
        return
      }

      // 5. Fetch Variants for displayed products
      const displayedProductIds = productsData.map(p => p.id)
      const { data: variantsData } = await supabase
        .from('tb_product_variant')
        .select('*')
        .in('product_id', displayedProductIds)
        .eq('status', 'active')

      // 6. Fetch Categories for displayed products (for UI badges/info if needed)
      const { data: categoriesData } = await supabase
        .from('tb_product_category')
        .select('product_id, category_name')
        .in('product_id', displayedProductIds)

      // 7. Merge Data
      const processedProducts: Product[] = productsData.map(product => {
        const productVariants = variantsData?.filter(v => v.product_id === product.id) || []
        const productCategories = categoriesData?.filter(c => c.product_id === product.id).map(c => c.category_name) || []

        // Calculate price range
        let min_price = 0
        let max_price = 0
        let default_variant_id = undefined

        if (productVariants.length > 0) {
          const prices = productVariants.map(v => v.price)
          min_price = Math.min(...prices)
          max_price = Math.max(...prices)

          // Find default variant (lowest price)
          const defaultVariant = productVariants.reduce((prev, curr) => prev.price < curr.price ? prev : curr)
          default_variant_id = defaultVariant.id
        }

        // Get correct image
        const images = getAllImages(product as SupabaseProduct)

        return {
          ...product,
          min_price,
          max_price,
          default_variant_id,
          image_url: images[0], // Use the first valid image
          category_names: productCategories
        }
      })

      // Client-side sort for price if needed (since price is calculated)
      if (filters.sortBy === 'price_asc') {
        processedProducts.sort((a, b) => (a.min_price || 0) - (b.min_price || 0))
      } else if (filters.sortBy === 'price_desc') {
        processedProducts.sort((a, b) => (b.min_price || 0) - (a.min_price || 0))
      }

      setProducts(processedProducts)

    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const updateUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    // Reset to page 1 when filtering
    if (!newParams.page) {
      params.set('page', '1')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    if (key === 'category') {
      updateUrl({ category: value.toString() })
    } else if (key === 'search') {
      // Debounce search could be added here, for now direct update
      updateUrl({ search: value.toString() })
    } else if (key === 'sortBy') {
      updateUrl({ sort: value.toString() })
    }
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(totalProducts / productsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={[{ label: 'Sản phẩm' }]} />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sản Phẩm</h1>
              <p className="text-sm text-gray-500 mt-1">
                Hiển thị {products.length} / {totalProducts} sản phẩm
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">Mới nhất</option>
                <option value="name">Tên A-Z</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
              </select>
              <ViewToggle view={viewMode} onViewChange={setViewMode} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={filters.category}
                onCategoryChange={(categoryId) => handleFilterChange('category', categoryId)}
              />
            </div>
          </div>

          <div className="lg:hidden">
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category}
              onCategoryChange={(categoryId) => handleFilterChange('category', categoryId)}
            />
          </div>

          <div className="flex-1">
            {loading ? (
              <ProductSkeleton count={12} viewMode={viewMode} />
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <span className="text-4xl mb-4 block">⚠️</span>
                  <h3 className="font-semibold text-red-800 mb-2">Lỗi kết nối</h3>
                  <p className="text-red-600 text-sm">{error}</p>
                  <button
                    onClick={fetchProducts}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }>
                  {products.map((product, index) =>
                    viewMode === 'grid' ? (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isNew={index < 2}
                        isHot={index < 3}
                        discountPercent={0}
                      />
                    ) : (
                      <ProductCardList
                        key={product.id}
                        product={product}
                        isNew={index < 2}
                        isHot={index < 3}
                        discountPercent={0}
                      />
                    )
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Trước
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Logic to show limited page numbers could be added here
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                          return (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg ${page === currentPage
                                ? 'bg-green-500 text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                              {page}
                            </button>
                          )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2">...</span>
                        }
                        return null
                      })}

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-500 mb-4">
                  Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm khác
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Xóa bộ lọc danh mục
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
