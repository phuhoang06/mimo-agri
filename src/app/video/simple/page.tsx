'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

interface Video {
  id: string
  title: string
  description: string
  videoId: string
  thumbnail: string
  duration: string
  views: number
  publishedAt: string
}

export default function SimpleVideoPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      
      // Mock data
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả, tiết kiệm và an toàn',
          description: 'Hướng dẫn chi tiết cách sử dụng bẫy ruồi vàng dạng chai để bảo vệ cây trồng hiệu quả.',
          videoId: 'OHqcNAyqV2A',
          thumbnail: 'https://img.youtube.com/vi/OHqcNAyqV2A/maxresdefault.jpg',
          duration: '5:30',
          views: 1250,
          publishedAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'BẪY RUỒI VÀNG Chai Xịt - Sản phẩm diệt ruồi vàng hiệu quả 40%',
          description: 'Giới thiệu sản phẩm xịt bẫy ruồi vàng với hiệu quả cao, an toàn cho cây trồng.',
          videoId: 'osD0RAxQsbE',
          thumbnail: 'https://img.youtube.com/vi/osD0RAxQsbE/maxresdefault.jpg',
          duration: '4:15',
          views: 890,
          publishedAt: '2024-01-10'
        },
        {
          id: '3',
          title: 'Cách trồng rau sạch tại nhà - Hướng dẫn từ A đến Z',
          description: 'Hướng dẫn chi tiết cách trồng rau sạch tại nhà với các bước đơn giản và hiệu quả.',
          videoId: 'dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          duration: '8:45',
          views: 2100,
          publishedAt: '2024-01-08'
        },
        {
          id: '4',
          title: 'Phân bón hữu cơ - Cách làm và sử dụng hiệu quả',
          description: 'Hướng dẫn cách làm phân bón hữu cơ từ rác thải nhà bếp, an toàn và tiết kiệm.',
          videoId: 'dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          duration: '6:20',
          views: 1680,
          publishedAt: '2024-01-05'
        }
      ]

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setVideos(mockVideos)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Video Hướng Dẫn
                <span className="block text-green-200">Nông Nghiệp Thông Minh</span>
              </h1>
              <p className="text-xl text-green-100 leading-relaxed mb-8">
                Khám phá các video hướng dẫn chi tiết về sản phẩm nông nghiệp, 
                kỹ thuật trồng trọt và tips bảo vệ cây trồng hiệu quả.
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb 
              items={[
                { label: 'Video' }
              ]} 
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Video Hướng Dẫn</h2>
            <p className="text-gray-600">
              Khám phá các video hướng dẫn, tips và giới thiệu sản phẩm nông nghiệp
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video bg-gray-200 overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-red-700 transition-colors">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.views.toLocaleString()} lượt xem</span>
                      <span>{new Date(video.publishedAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && videos.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🎥</span>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không có video nào
              </h3>
              <p className="text-gray-500">
                Hiện tại chưa có video nào được tải lên
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  )
}
