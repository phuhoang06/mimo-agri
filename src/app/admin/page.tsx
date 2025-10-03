'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Stats {
  totalProducts: number
  totalArticles: number
  totalUsers: number
  totalOrders: number
  recentProducts: any[]
  recentArticles: any[]
  monthlyRevenue: number
  pendingOrders: number
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalArticles: 0,
    totalUsers: 0,
    totalOrders: 0,
    recentProducts: [],
    recentArticles: [],
    monthlyRevenue: 0,
    pendingOrders: 0
  })
  const [loading, setLoading] = useState(true)

  const navigation = [
    {
      name: 'Tổng quan',
      href: '/admin',
      icon: '📊',
      current: true
    },
    {
      name: 'Sản phẩm',
      href: '/admin/products',
      icon: '📦',
      current: false
    },
    {
      name: 'Tài liệu kỹ thuật',
      href: '/admin/articles',
      icon: '📚',
      current: false
    },
    {
      name: 'Người dùng',
      href: '/admin/users',
      icon: '👥',
      current: false
    },
    {
      name: 'Đơn hàng',
      href: '/admin/orders',
      icon: '🛒',
      current: false
    },
    {
      name: 'Cài đặt',
      href: '/admin/settings',
      icon: '⚙️',
      current: false
    }
  ]

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)

      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      // Fetch articles count
      const { count: articlesCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })

      // Fetch recent products
      const { data: recentProducts } = await supabase
        .from('products')
        .select('id, name, min_price, max_price, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      // Fetch recent articles
      const { data: recentArticles } = await supabase
        .from('articles')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        totalProducts: productsCount || 0,
        totalArticles: articlesCount || 0,
        totalUsers: 0, // TODO: Implement when user management is ready
        totalOrders: 0, // TODO: Implement when order management is ready
        recentProducts: recentProducts || [],
        recentArticles: recentArticles || [],
        monthlyRevenue: 0, // TODO: Calculate from orders
        pendingOrders: 0 // TODO: Count pending orders
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-6 bg-gradient-to-r from-green-600 to-green-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">MIMO Admin</h1>
              <p className="text-green-100 text-xs">Hệ thống quản lý</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  item.current
                    ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
                {item.current && (
                  <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900">Admin MIMO</p>
              <p className="text-xs text-gray-500">admin@mimo.com</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-green-600">Đang hoạt động</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {navigation.find(item => item.current)?.name || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500">Quản lý hệ thống MIMO Agriculture</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Back to site */}
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại!</h1>
                  <p className="text-green-100 text-lg">Hệ thống quản lý MIMO Agriculture</p>
                  <p className="text-green-200 text-sm mt-2">Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🌱</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Tổng sản phẩm</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                    <p className="text-sm text-green-600 mt-1">+12% so với tháng trước</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-2xl">📦</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Tài liệu kỹ thuật</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalArticles}</p>
                    <p className="text-sm text-green-600 mt-1">+5% so với tháng trước</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Người dùng</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    <p className="text-sm text-green-600 mt-1">+8% so với tháng trước</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Đơn hàng</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                    <p className="text-sm text-green-600 mt-1">+15% so với tháng trước</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <span className="text-2xl">🛒</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue & Orders Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Doanh thu tháng này</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatPrice(stats.monthlyRevenue)}₫
                </div>
                <p className="text-sm text-gray-600">+20% so với tháng trước</p>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Đơn hàng chờ xử lý</h3>
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {stats.pendingOrders}
                </div>
                <p className="text-sm text-gray-600">Cần xử lý ngay</p>
                <div className="mt-4">
                  <Link
                    href="/admin/orders"
                    className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Products */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Sản phẩm mới nhất</h3>
                    <Link
                      href="/admin/products"
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Xem tất cả →
                    </Link>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {stats.recentProducts.length > 0 ? (
                    stats.recentProducts.map((product, index) => (
                      <div key={product.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product.min_price && product.max_price && product.min_price !== product.max_price
                                  ? `${formatPrice(product.min_price)}₫ - ${formatPrice(product.max_price)}₫`
                                  : product.min_price
                                  ? `${formatPrice(product.min_price)}₫`
                                  : 'Liên hệ'
                                }
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(product.created_at)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-500">
                      <span className="text-4xl block mb-2">📦</span>
                      <p>Chưa có sản phẩm nào</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Articles */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Tài liệu mới nhất</h3>
                    <Link
                      href="/admin/articles"
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Xem tất cả →
                    </Link>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {stats.recentArticles.length > 0 ? (
                    stats.recentArticles.map((article, index) => (
                      <div key={article.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {article.title}
                              </p>
                              <p className="text-xs text-gray-500">Tài liệu kỹ thuật</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(article.created_at)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-500">
                      <span className="text-4xl block mb-2">📚</span>
                      <p>Chưa có tài liệu nào</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Thao tác nhanh</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/admin/products/new"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                    <span className="text-xl">➕</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-green-700">Thêm sản phẩm</p>
                    <p className="text-sm text-gray-500">Tạo sản phẩm mới</p>
                  </div>
                </Link>

                <Link
                  href="/admin/articles/new"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <span className="text-xl">📝</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-700">Viết tài liệu</p>
                    <p className="text-sm text-gray-500">Tạo tài liệu mới</p>
                  </div>
                </Link>

                <Link
                  href="/admin/products"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                    <span className="text-xl">✏️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-purple-700">Chỉnh sửa</p>
                    <p className="text-sm text-gray-500">Quản lý nội dung</p>
                  </div>
                </Link>

                <Link
                  href="/"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all group"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                    <span className="text-xl">👁️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-orange-700">Xem website</p>
                    <p className="text-sm text-gray-500">Trang chủ</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}