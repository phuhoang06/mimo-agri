'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
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
      title: "Giải Pháp Kiểm Soát Ruồi Vàng",
      subtitle: "Hiệu quả vượt trội - An toàn sinh học",
      cta: "Tìm hiểu ngay",
      link: "/products?category=ruoi-vang"
    },
    {
      id: 2,
      src: "/banners/resized/2_final_desktop.webp",
      fallbackSrc: "/banners/2_final.jpg",
      mobileSrc: "/banners/resized/2_final_mobile.webp",
      alt: "Keo Xịt Ruồi Vàng - An Toàn, Hiệu Quả, Tiết Kiệm",
      title: "Keo Xịt Ruồi Vàng Thế Hệ Mới",
      subtitle: "Tiện lợi - Tiết kiệm - Bám dính cực tốt",
      cta: "Mua ngay",
      link: "/products/keo-xit-ruoi-vang"
    },
    {
      id: 3,
      src: "/banners/resized/banner_final_desktop.webp",
      fallbackSrc: "/banners/banner_final.jpg",
      mobileSrc: "/banners/resized/banner_final_mobile.webp",
      alt: "Hạt Giống Dụng Cụ Làm Vườn - Cuốc, Xẻng, Vòi Tưới, Đất",
      title: "Dụng Cụ Làm Vườn Chuyên Nghiệp",
      subtitle: "Đầy đủ trang thiết bị cho khu vườn của bạn",
      cta: "Khám phá",
      link: "/products?category=dung-cu"
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
      className="relative w-full h-full bg-gray-100 group overflow-hidden rounded-2xl shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Banner Images */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === currentSlide
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
              }`}
          >
            {/* Fallback content nếu có lỗi */}
            {imageErrors[banner.id] ? (
              <div className="relative w-full h-full bg-gradient-to-br from-primary via-green-600 to-green-800 flex items-center justify-center">
                <div className="text-center text-white p-8 max-w-md animate-fade-in">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <span className="text-4xl">🌱</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
                      {banner.title}
                    </h2>
                    <p className="text-lg opacity-90 mb-8 font-light">
                      {banner.subtitle}
                    </p>
                  </div>

                  <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    {banner.cta}
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                {/* Desktop Image */}
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover object-center hidden md:block"
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
                  className="object-cover object-center md:hidden"
                  priority={index === 0}
                  onError={() => handleImageError(banner.id)}
                  onLoad={handleImageLoad}
                  sizes="(max-width: 768px) 100vw, 0px"
                />

                {/* Text content removed as requested */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 right-6 md:right-12 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
              ? 'w-8 h-2 bg-primary'
              : 'w-2 h-2 bg-white/60 hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}