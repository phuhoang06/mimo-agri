'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  description: string
  videoId: string
  thumbnail: string
  category: string
  duration: string
  views: number
  publishedAt: string
  featured: boolean
}

interface RelatedVideosProps {
  currentVideoId: string
  category: string
}

export default function RelatedVideos({ currentVideoId, category }: RelatedVideosProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedVideos()
  }, [currentVideoId, category])

  const fetchRelatedVideos = async () => {
    try {
      setLoading(true)
      
      // Mock data - trong thực tế sẽ lấy từ database
      const allVideos: Video[] = [
        {
          id: '1',
          title: 'Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả, tiết kiệm và an toàn',
          description: 'Hướng dẫn chi tiết cách sử dụng bẫy ruồi vàng dạng chai để bảo vệ cây trồng hiệu quả.',
          videoId: 'OHqcNAyqV2A',
          thumbnail: 'https://img.youtube.com/vi/OHqcNAyqV2A/maxresdefault.jpg',
          category: 'huong-dan',
          duration: '5:30',
          views: 1250,
          publishedAt: '2024-01-15',
          featured: true
        },
        {
          id: '2',
          title: 'BẪY RUỒI VÀNG Chai Xịt - Sản phẩm diệt ruồi vàng hiệu quả 40%',
          description: 'Giới thiệu sản phẩm xịt bẫy ruồi vàng với hiệu quả cao, an toàn cho cây trồng.',
          videoId: 'osD0RAxQsbE',
          thumbnail: 'https://img.youtube.com/vi/osD0RAxQsbE/maxresdefault.jpg',
          category: 'san-pham',
          duration: '4:15',
          views: 890,
          publishedAt: '2024-01-10',
          featured: true
        },
        {
          id: '3',
          title: 'Cách trồng rau sạch tại nhà - Hướng dẫn từ A đến Z',
          description: 'Hướng dẫn chi tiết cách trồng rau sạch tại nhà với các bước đơn giản và hiệu quả.',
          videoId: 'dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          category: 'huong-dan',
          duration: '8:45',
          views: 2100,
          publishedAt: '2024-01-08',
          featured: false
        },
        {
          id: '4',
          title: 'Phân bón hữu cơ - Cách làm và sử dụng hiệu quả',
          description: 'Hướng dẫn cách làm phân bón hữu cơ từ rác thải nhà bếp, an toàn và tiết kiệm.',
          videoId: 'dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          category: 'tips',
          duration: '6:20',
          views: 1680,
          publishedAt: '2024-01-05',
          featured: false
        },
        {
          id: '5',
          title: 'Hạt giống chất lượng cao - Lựa chọn và bảo quản',
          description: 'Cách lựa chọn và bảo quản hạt giống để đảm bảo tỷ lệ nảy mầm cao.',
          videoId: 'dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          category: 'san-pham',
          duration: '7:10',
          views: 1450,
          publishedAt: '2024-01-03',
          featured: false
        }
      ]

      // Filter related videos (same category, exclude current video)
      const relatedVideos = allVideos
        .filter(video => video.category === category && video.id !== currentVideoId)
        .slice(0, 4) // Show max 4 related videos

      // If not enough videos in same category, add other popular videos
      if (relatedVideos.length < 4) {
        const otherVideos = allVideos
          .filter(video => video.id !== currentVideoId && !relatedVideos.find(rv => rv.id === video.id))
          .slice(0, 4 - relatedVideos.length)
        
        relatedVideos.push(...otherVideos)
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setVideos(relatedVideos)
    } catch (error) {
      console.error('Error fetching related videos:', error)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 ngày trước'
    if (diffDays < 7) return `${diffDays} ngày trước`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} tuần trước`
    return `${Math.ceil(diffDays / 30)} tháng trước`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Video liên quan</h3>
        <div className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-24 h-16 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Video liên quan</h3>
      <div className="space-y-4">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/video/${video.id}`}
            className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors group"
          >
            <div className="relative w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-green-600 transition-colors">
                {video.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <span>{formatViews(video.views)} lượt xem</span>
                <span>•</span>
                <span>{formatDate(video.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <Link
          href="/video"
          className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
        >
          Xem tất cả video →
        </Link>
      </div>
    </div>
  )
}
