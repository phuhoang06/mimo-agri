'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({})
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Responsive banner images với fallback
  const banners = useMemo(() => [
    {
      id: 1,
      src: "/banners/resized/1_final_desktop.webp",
      fallbackSrc: "/banners/1_final.jpg",
      mobileSrc: "/banners/resized/1_final_mobile.webp",
      alt: "Chuyên Giải Pháp Kiểm Soát Ruồi Vàng - MiMo Agriculture",
      title: "Chuyên Giải Pháp Kiểm Soát",
      subtitle: "Ruồi Vàng - Tăm bẫy - Dụng cụ",
      cta: "Tìm hiểu ngay"
    },
    {
      id: 2,
      src: "/banners/resized/2_final_desktop.webp",
      fallbackSrc: "/banners/2_final.jpg", 
      mobileSrc: "/banners/resized/2_final_mobile.webp",
      alt: "Keo Xịt Ruồi Vàng - An Toàn, Hiệu Quả, Tiết Kiệm",
      title: "Keo Xịt Ruồi Vàng",
      subtitle: "750ml - An Toàn - Hiệu Quả",
      cta: "Mua ngay"
    },
    {
      id: 3,
      src: "/banners/resized/banner_final_desktop.webp",
      fallbackSrc: "/banners/banner_final.jpg",
      mobileSrc: "/banners/resized/banner_final_mobile.webp", 
      alt: "Hạt Giống Dụng Cụ Làm Vườn - Cuốc, Xẻng, Vòi Tưới, Đất",
      title: "Hạt Giống & Dụng Cụ",
      subtitle: "Cuốc - Xẻng - Vòi Tưới - Đất",
      cta: "Khám phá"
    }
  ], [])

  // Auto-play carousel với pause on hover
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length)
      }, 5000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, banners.length])

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % banners.length
    const nextBanner = banners[nextIndex]
    if (nextBanner) {
      const img = new window.Image()
      img.src = nextBanner.src
    }
  }, [currentSlide, banners])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  // Touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  const handleImageError = (bannerId: number) => {
    setImageErrors(prev => ({ ...prev, [bannerId]: true }))
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div 
      className="relative w-full h-full bg-gray-100 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="banner-loading rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 text-sm">Đang tải banner...</p>
          </div>
        </div>
      )}

      {/* Banner Images */}
      <div className="relative w-full h-full overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 banner-slide ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Fallback content nếu có lỗi */}
            {imageErrors[banner.id] ? (
              <div className="relative w-full h-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center">
                <div className="text-center text-white p-8 max-w-md">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌱</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                      {banner.title}
                    </h2>
                    <p className="text-lg opacity-90 mb-6">
                      {banner.subtitle}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg">
                      {banner.cta}
                    </button>
                    <div className="text-sm opacity-75">
                      Hotline: 0853.991.995
                    </div>
                    <div className="text-xs opacity-60">
                      www.mimoagri.com
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                {/* Desktop Image */}
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="banner-image object-cover object-center hidden md:block"
                  priority={index === 0}
                  onError={() => handleImageError(banner.id)}
                  onLoad={handleImageLoad}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1214px"
                />
                
                {/* Mobile Image */}
                <Image
                  src={banner.mobileSrc || banner.src}
                  alt={banner.alt}
                  fill
                  className="banner-image object-cover object-center md:hidden"
                  priority={index === 0}
                  onError={() => handleImageError(banner.id)}
                  onLoad={handleImageLoad}
                  sizes="(max-width: 768px) 100vw, 0px"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 banner-overlay flex items-center justify-center">
                  <div className="text-center text-white p-6 max-w-lg">
                    <h2 className="text-xl md:text-3xl font-bold mb-3 drop-shadow-lg">
                      {banner.title}
                    </h2>
                    <p className="text-sm md:text-lg opacity-90 mb-6 drop-shadow-md">
                      {banner.subtitle}
                    </p>
                    <button className="banner-cta-button bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
                      {banner.cta}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Chỉ hiện khi hover */}
      <button
        onClick={goToPrevious}
        className="banner-nav-button absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="banner-nav-button absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator - Cải thiện design */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`banner-dot w-3 h-3 rounded-full ${
              index === currentSlide 
                ? 'bg-white banner-dot-active' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar - Cải thiện design */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10 z-10">
        <div 
          className="banner-progress h-full"
          style={{ width: `${((currentSlide + 1) / banners.length) * 100}%` }}
        />
      </div>

      {/* Swipe Indicator - Chỉ hiện trên mobile */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full md:hidden z-10">
        Vuốt để xem
      </div>
    </div>
  )
}