'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ShoppingCartIcon, MagnifyingGlassIcon, PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Logo from './Logo'
import CartModal from './CartModal'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { totalItems } = useCart()
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string }>>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef<number | null>(null)

  const triggerSearch = () => {
    const q = searchQuery.trim()
    const url = q ? `/products?search=${encodeURIComponent(q)}` : '/products'
    router.push(url)
    setIsMenuOpen(false)
    setShowSuggestions(false)
  }

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    if (searchQuery.trim().length < 1) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    debounceRef.current = window.setTimeout(async () => {
      const q = searchQuery.trim().toLowerCase()
      const term = `%${q}%`
      const { data } = await supabase
        .from('products')
        .select('id, name')
        .ilike('name', term)
        .limit(30)

      const ranked = (data || []).map((p: { id: string; name: string }) => {
        const name = (p.name || '').toLowerCase()
        const starts = name.startsWith(q) ? 1 : 0
        const wordStart = name.split(/\s+/).some((w: string) => w.startsWith(q)) ? 1 : 0
        const idx = name.indexOf(q)
        const posScore = idx === -1 ? 0 : 1 / (1 + idx)
        const lengthScore = Math.min(q.length / Math.max(1, name.length), 1)
        const score = starts * 3 + wordStart * 2 + posScore * 1 + lengthScore * 0.5
        return { ...p, _score: score }
      })
      ranked.sort((a, b) => b._score - a._score)
      setSuggestions(ranked.slice(0, 8))
      setShowSuggestions(true)
    }, 250)
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [searchQuery])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-1">
                <span>📍</span>
                <span>3 Ngõ Đương Xóm 1 Đỗ Xá Phú Xuyên Hà Nội</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📞</span>
                <span>085 399 1995</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📧</span>
                <span>mimoagriculture@gmail.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🌐</span>
                <span>bayruoivang.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.847V11.06h2.973V8.413c0-2.948 1.8-4.555 4.43-4.555 1.26 0 2.342.094 2.657.136v3.08h-1.823c-1.43 0-1.707.68-1.707 1.676v2.31h3.413l-.445 3.646h-2.968V24h5.824C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800 transition-colors" aria-label="TikTok">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.5 2c1.2 1.7 3 2.8 5 3v3.2c-1.6-.1-3-.6-4.2-1.5v6.8c0 3.4-2.8 6.1-6.2 6.1S1 17.9 1 14.5 3.8 8.4 7.2 8.4c.6 0 1.1.1 1.6.2v3.3c-.5-.2-1.1-.3-1.6-.3-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V2h2.4z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a2.997 2.997 0 0 0-2.115-2.123C19.48 3.5 12 3.5 12 3.5s-7.48 0-9.383.563A2.997 2.997 0 0 0 .502 6.186C0 8.09 0 12 0 12s0 3.91.502 5.814a2.997 2.997 0 0 0 2.115 2.123C4.52 20.5 12 20.5 12 20.5s7.48 0 9.383-.563a2.997 2.997 0 0 0 2.115-2.123C24 15.91 24 12 24 12s0-3.91-.502-5.814zM9.545 15.568V8.432L15.818 12 9.545 15.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" showText={true} />
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập thông tin tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') triggerSearch() }}
                  className="w-full px-4 py-3 pl-4 pr-12 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                />
                <button onClick={triggerSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-64 overflow-auto">
                    {suggestions.map(s => (
                      <li key={s.id}>
                        <button
                          onClick={() => {
                            router.push(`/products?search=${encodeURIComponent(s.name)}`)
                            setShowSuggestions(false)
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-green-50"
                        >
                          {s.name}
                        </button>
                      </li>
                    ))}
                    <li className="border-t">
                      <button onClick={triggerSearch} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-green-50">Xem tất cả kết quả cho “{searchQuery}”</button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Right Side Info */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Shipping Info */}
              <div className="flex items-center space-x-2 text-green-600">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Miễn phí vận chuyển</div>
                  <div className="text-xs text-gray-600">cho đơn hàng từ 200k</div>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <PhoneIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Hotline</div>
                  <div className="font-bold text-red-600 text-lg">085 399 1995</div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-around h-12">
            {/* Main Navigation - Center aligned */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-green-200 transition-colors font-medium">
                Trang chủ
              </Link>
              <Link href="/products" className="hover:text-green-200 transition-colors font-medium">
                Sản phẩm
              </Link>
              <Link href="/articles" className="hover:text-green-200 transition-colors font-medium">
                Tài liệu kỹ thuật
              </Link>
              <Link href="/contact" className="hover:text-green-200 transition-colors font-medium">
                Liên Hệ Mua Hàng
              </Link>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <span className="font-medium text-sm">Menu Chính</span>
            </div>

            {/* Shopping Cart - Right side */}
            <div className="flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white hover:text-green-200 transition-colors group"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Giỏ hàng ({totalItems} sản phẩm)
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập thông tin tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') triggerSearch() }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
              <button onClick={triggerSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-lg">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-64 overflow-auto">
                  {suggestions.map(s => (
                    <li key={s.id}>
                      <button
                        onClick={() => {
                          router.push(`/products?search=${encodeURIComponent(s.name)}`)
                          setShowSuggestions(false)
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-green-50"
                      >
                        {s.name}
                      </button>
                    </li>
                  ))}
                  <li className="border-t">
                    <button onClick={triggerSearch} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-green-50">Xem tất cả kết quả cho “{searchQuery}”</button>
                  </li>
                </ul>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-800 hover:text-green-600 transition-colors font-medium">
                Trang chủ
              </Link>
              <Link href="/products" className="text-gray-800 hover:text-green-600 transition-colors font-medium">
                Sản phẩm
              </Link>
              <Link href="/articles" className="text-gray-800 hover:text-green-600 transition-colors font-medium">
                Tài liệu kỹ thuật
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-green-600 transition-colors font-medium">
                Liên Hệ Mua Hàng
              </Link>
              
              {/* Mobile Cart */}
              <button
                onClick={() => {
                  setIsCartOpen(true)
                  setIsMenuOpen(false)
                }}
                className="flex items-center space-x-2 text-gray-800 hover:text-green-600 transition-colors font-medium"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Giỏ hàng</span>
                {totalItems > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile Contact Info */}
            <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
              <div>📞 085 399 1995</div>
              <div>📧 mimoagriculture@gmail.com</div>
              <div>🚚 Miễn phí vận chuyển cho đơn từ 200k</div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
