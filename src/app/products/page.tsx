'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import ProductCardList from '@/components/ProductCardList'
import CategoryFilter from '@/components/CategoryFilter'
import Breadcrumb from '@/components/Breadcrumb'
import ViewToggle from '@/components/ViewToggle'
import ProductSkeleton from '@/components/ProductSkeleton'
import { fetchCategoriesWithCount, Category } from '@/lib/categories'

interface Product {
  id: string
  name: string
  description: string
  min_price?: number
  max_price?: number
  image_url?: string
  category_id?: string
}


interface FilterState {
  category: string
  minPrice: number
  maxPrice: number
  search: string
  sortBy: 'name' | 'price_asc' | 'price_desc' | 'newest'
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const productsPerPage = 12
  
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category') || '',
    minPrice: 0,
    maxPrice: 10000000,
    search: searchParams.get('search') || '',
    sortBy: 'newest'
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  // Đồng bộ filters từ URL mỗi khi query thay đổi (ví dụ tìm kiếm nhiều lần)
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    setFilters(prev => ({
      ...prev,
      search,
      category
    }))
  }, [searchParams])

  useEffect(() => {
    applyFilters()
  }, [products, filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      // Fetch products and categories in parallel
      const [productsResult, categoriesResult] = await Promise.all([
        supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false }),
        fetchCategoriesWithCount()
      ])
      
      if (productsResult.error) throw productsResult.error
      
      setProducts(productsResult.data || [])
      setCategories(categoriesResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }


  const applyFilters = () => {
    let filtered = [...products]

    // Filter by search
    if (filters.search) {
      const needle = filters.search.toLowerCase()
      filtered = filtered.filter(product => {
        const name = (product.name || '').toLowerCase()
        const desc = (product.description || '').toLowerCase()
        return name.includes(needle) || desc.includes(needle)
      })
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(product => product.category_id === filters.category)
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = product.min_price || 0
      return price >= filters.minPrice && price <= filters.maxPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price_asc':
          return (a.min_price || 0) - (b.min_price || 0)
        case 'price_desc':
          return (b.min_price || 0) - (a.min_price || 0)
        case 'newest':
        default:
          return 0 // Already sorted by created_at
      }
    })

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters(prev => ({
      ...prev,
      category: ''
    }))
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={[{ label: 'Sản phẩm' }]} />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sản Phẩm</h1>
              <p className="text-gray-600 mt-1">
                Tìm thấy {filteredProducts.length} sản phẩm
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-4">
              <ViewToggle view={viewMode} onViewChange={setViewMode} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={filters.category}
                onCategoryChange={(categoryId) => handleFilterChange('category', categoryId)}
              />
            </div>
          </div>

          {/* Mobile Category Filter */}
          <div className="lg:hidden mb-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category}
              onCategoryChange={(categoryId) => handleFilterChange('category', categoryId)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Loading State */}
            {loading && (
              <ProductSkeleton count={12} viewMode={viewMode} />
            )}

            {/* Error State */}
            {error && (
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
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                {currentProducts.length > 0 ? (
                  <>
                    <div className={
                      viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                    }>
                      {currentProducts.map((product, index) => 
                        viewMode === 'grid' ? (
                          <ProductCard 
                            key={product.id} 
                            product={product}
                            isNew={index < 2}
                            isHot={index < 3}
                            discountPercent={[36, 34, 38, 0, 41, 0, 0, 0, 0, 0, 0, 0][index] || 0}
                          />
                        ) : (
                          <ProductCardList 
                            key={product.id} 
                            product={product}
                            isNew={index < 2}
                            isHot={index < 3}
                            discountPercent={[36, 34, 38, 0, 41, 0, 0, 0, 0, 0, 0, 0][index] || 0}
                          />
                        )
                      )}
                    </div>

                    {/* Pagination */}
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
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                page === currentPage
                                  ? 'bg-green-500 text-white'
                                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
