'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ShoppingCartIcon, MagnifyingGlassIcon, PhoneIcon, CheckCircleIcon, Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        .from('tb_agricultural_product')
        .select('id, name')
        .eq('status', 'active')
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
    <>
      {/* Top Bar - Subtle & Clean */}
      <div className="bg-gray-50 border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1.5 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center hover:text-primary transition-colors">
                <PhoneIcon className="w-3 h-3 mr-1" /> 085 399 1995
              </span>
              <span className="flex items-center hover:text-primary transition-colors">
                <span className="mr-1">📧</span> mimoagriculture@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Facebook</a>
              <span className="text-gray-300">|</span>
              <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">TikTok</a>
              <span className="text-gray-300">|</span>
              <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Sticky & Glassmorphism */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-sm py-2' : 'bg-white py-4 border-b border-gray-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size={isScrolled ? 'sm' : 'md'} showText={!isScrolled} />
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: 'Trang chủ', href: '/' },
                { name: 'Sản phẩm', href: '/products' },
                { name: 'Tài liệu kỹ thuật', href: '/articles' },
                { name: 'Kiểm tra đơn hàng', href: '/track-order' },
                { name: 'Liên hệ', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search Trigger (Mobile/Compact) or Full Search */}
              <div className="relative hidden md:block w-64 lg:w-80">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') triggerSearch() }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-green-100 rounded-full text-sm transition-all"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                    <ul>
                      {suggestions.map(s => (
                        <li key={s.id}>
                          <button
                            onClick={() => {
                              router.push(`/products?search=${encodeURIComponent(s.name)}`)
                              setShowSuggestions(false)
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{s.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Mobile Search Toggle */}
              <button className="md:hidden p-2 text-gray-600 hover:text-primary">
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg animate-slide-up">
            <div className="p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <nav className="flex flex-col space-y-1">
                {[
                  { name: 'Trang chủ', href: '/' },
                  { name: 'Sản phẩm', href: '/products' },
                  { name: 'Tài liệu kỹ thuật', href: '/articles' },
                  { name: 'Kiểm tra đơn hàng', href: '/track-order' },
                  { name: 'Liên hệ', href: '/contact' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-primary rounded-lg transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
