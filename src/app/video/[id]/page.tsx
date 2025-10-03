'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import VideoPlayer from '@/components/VideoPlayer'
import RelatedVideos from '@/components/RelatedVideos'

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
  tags: string[]
  author: string
}

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchVideo()
    }
  }, [params.id])

  const fetchVideo = async () => {
    try {
      setLoading(true)
      
      // Mock data - trong thực tế sẽ lấy từ database
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả, tiết kiệm và an toàn',
          description: 'Hướng dẫn chi tiết cách sử dụng bẫy ruồi vàng dạng chai để bảo vệ cây trồng hiệu quả. Video này sẽ giúp bạn hiểu rõ cách thức hoạt động của sản phẩm và cách sử dụng đúng cách để đạt hiệu quả tối đa.',
          videoId: 'OHqcNAyqV2A',
          thumbnail: 'https://img.youtube.com/vi/OHqcNAyqV2A/maxresdefault.jpg',
          category: 'huong-dan',
          duration: '5:30',
          views: 1250,
          publishedAt: '2024-01-15',
          featured: true,
          tags: ['bẫy ruồi', 'hướng dẫn', 'nông nghiệp', 'bảo vệ cây trồng'],
          author: 'MIMO Agriculture'
        },
        {
          id: '2',
          title: 'BẪY RUỒI VÀNG Chai Xịt - Sản phẩm diệt ruồi vàng hiệu quả 40%',
          description: 'Giới thiệu sản phẩm xịt bẫy ruồi vàng với hiệu quả cao, an toàn cho cây trồng. Sản phẩm được nghiên cứu và phát triển đặc biệt để đối phó với ruồi vàng gây hại.',
          videoId: 'osD0RAxQsbE',
          thumbnail: 'https://img.youtube.com/vi/osD0RAxQsbE/maxresdefault.jpg',
          category: 'san-pham',
          duration: '4:15',
          views: 890,
          publishedAt: '2024-01-10',
          featured: true,
          tags: ['sản phẩm', 'xịt ruồi', 'diệt côn trùng', 'hiệu quả cao'],
          author: 'MIMO Agriculture'
        }
      ]

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const foundVideo = mockVideos.find(v => v.id === params.id)
      if (foundVideo) {
        setVideo(foundVideo)
      } else {
        setError('Video không tồn tại')
      }
    } catch (err) {
      setError('Không thể tải video')
      console.error('Error fetching video:', err)
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
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'huong-dan': 'Hướng dẫn',
      'san-pham': 'Sản phẩm',
      'tips': 'Tips & Tricks',
      'cong-nghe': 'Công nghệ'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải video...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !video) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">😞</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error || 'Video không tồn tại'}
            </h2>
            <p className="text-gray-600 mb-6">
              Không thể tìm thấy video bạn đang tìm kiếm
            </p>
            <button
              onClick={() => router.push('/video')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Quay lại danh sách video
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb 
              items={[
                { label: 'Video', href: '/video' },
                { label: video.title }
              ]} 
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <VideoPlayer video={video} />

              {/* Video Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {video.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{formatViews(video.views)} lượt xem</span>
                      <span>•</span>
                      <span>{formatDate(video.publishedAt)}</span>
                      <span>•</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      Yêu thích
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Chia sẻ
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mô tả</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Video Info Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Thông tin video</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Danh mục:</span>
                    <span className="font-medium">{getCategoryLabel(video.category)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tác giả:</span>
                    <span className="font-medium">{video.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lượt xem:</span>
                    <span className="font-medium">{formatViews(video.views)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời lượng:</span>
                    <span className="font-medium">{video.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày đăng:</span>
                    <span className="font-medium">{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Related Videos */}
              <RelatedVideos currentVideoId={video.id} category={video.category} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}
