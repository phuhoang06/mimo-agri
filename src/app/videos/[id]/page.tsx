'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

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

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([])

  useEffect(() => {
    if (params.id) {
      fetchVideo(params.id as string)
      fetchRelatedVideos()
    }
  }, [params.id])

  const fetchVideo = async (id: string) => {
    try {
      setLoading(true)
      
      // Mock data - trong thực tế sẽ lấy từ database
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả, tiết kiệm và an toàn',
          description: 'Hướng dẫn chi tiết cách sử dụng bẫy ruồi vàng dạng chai để bảo vệ cây trồng hiệu quả. Video này sẽ giúp bạn hiểu rõ về cách thức hoạt động của sản phẩm, cách lắp đặt và sử dụng đúng cách để đạt hiệu quả tối đa.',
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
        }
      ]

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundVideo = mockVideos.find(v => v.id === id)
      if (foundVideo) {
        setVideo(foundVideo)
      } else {
        // Video not found, redirect to videos page
        router.push('/videos')
      }
    } catch (error) {
      console.error('Error fetching video:', error)
      router.push('/videos')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedVideos = async () => {
    try {
      // Mock related videos
      const mockRelated: Video[] = [
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
      
      setRelatedVideos(mockRelated)
    } catch (error) {
      console.error('Error fetching related videos:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="aspect-video bg-gray-200 rounded mb-6"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!video) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Video không tìm thấy</h1>
            <Link href="/videos" className="text-green-600 hover:text-green-700">
              ← Quay lại danh sách video
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb 
            items={[
              { label: 'Videos', href: '/videos' },
              { label: video.title }
            ]} 
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Video Player */}
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                {/* Video Info */}
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {video.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{video.views.toLocaleString()} lượt xem</span>
                    <span>•</span>
                    <span>{new Date(video.publishedAt).toLocaleDateString('vi-VN')}</span>
                    <span>•</span>
                    <span>{video.duration}</span>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Videos */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Video liên quan</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <Link 
                      key={relatedVideo.id} 
                      href={`/videos/${relatedVideo.id}`}
                      className="flex space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="relative w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                          {relatedVideo.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                          {relatedVideo.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1">
                          {relatedVideo.views.toLocaleString()} lượt xem
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Back to Videos */}
              <div className="mt-6">
                <Link 
                  href="/videos"
                  className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  ← Xem tất cả video
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}
