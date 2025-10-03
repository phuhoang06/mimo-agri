'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Video Hướng Dẫn
                <span className="block text-green-200">Nông Nghiệp Thông Minh</span>
              </h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Khám phá các video hướng dẫn chi tiết về sản phẩm nông nghiệp, 
                kỹ thuật trồng trọt và tips bảo vệ cây trồng hiệu quả.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">50+</div>
                <div className="text-sm text-green-100">Video hướng dẫn</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">10K+</div>
                <div className="text-sm text-green-100">Lượt xem</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">4.8★</div>
                <div className="text-sm text-green-100">Đánh giá</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/video/1"
                className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Xem video nổi bật
              </Link>
              <Link
                href="/video"
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-green-600 transition-colors text-center"
              >
                Khám phá tất cả
              </Link>
            </div>
          </div>

          {/* Video Preview */}
          <div className="relative">
            <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
              <img
                src="https://img.youtube.com/vi/OHqcNAyqV2A/maxresdefault.jpg"
                alt="Video nổi bật"
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Link
                  href="/video/1"
                  className="bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                >
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </Link>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="font-semibold text-white text-sm line-clamp-2">
                    Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                    <span>5:30</span>
                    <span>1.2K lượt xem</span>
                    <span>2 ngày trước</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
              🔥 Nổi bật
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </div>
  )
}

