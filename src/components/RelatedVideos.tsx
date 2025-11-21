import { useState, useEffect } from 'react'
import Link from 'next/link'
import VideoCard from './VideoCardComponent'

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

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Video liên quan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-200"></div>
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
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Video liên quan</h3>
        <Link
          href="/videos"
          className="text-primary font-semibold hover:text-green-700 transition-colors flex items-center gap-1"
        >
          Xem tất cả
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
