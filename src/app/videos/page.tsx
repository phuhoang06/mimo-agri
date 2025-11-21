'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import VideoCard from '@/components/VideoCardComponent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { supabase, YoutubeVideo } from '@/lib/supabase'

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [filteredVideos, setFilteredVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const videosPerPage = 12

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [videos])

  const fetchVideos = async () => {
    try {
      setLoading(true)

      // Fetch from Supabase
      const { data, error } = await supabase
        .from('youtube_video')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Map to Video interface
      const mappedVideos = (data || []).map((v: YoutubeVideo) => {
        const cleanId = v.video_id.split('&')[0].split('?')[0]
        return {
          id: v.id,
          title: v.title || 'Video chưa có tiêu đề',
          description: v.description || '',
          videoId: cleanId,
          thumbnail: v.thumbnail_url || `https://img.youtube.com/vi/${cleanId}/maxresdefault.jpg`,
          category: 'huong-dan', // Default category
          duration: v.duration || '',
          views: v.view_count || 0,
          publishedAt: v.created_at,
          featured: false
        }
      })

      setVideos(mappedVideos)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    const filtered = [...videos]
    setFilteredVideos(filtered)
    setCurrentPage(1)
  }

  // Pagination
  const startIndex = (currentPage - 1) * videosPerPage
  const endIndex = startIndex + videosPerPage
  const currentVideos = filteredVideos.slice(startIndex, endIndex)

  return (
    <>
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
              { label: 'Videos' }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Video Hướng Dẫn</h2>
            <p className="text-gray-600">
              Khám phá các video hướng dẫn, tips và giới thiệu sản phẩm nông nghiệp
            </p>
          </div>
          <button
            onClick={async () => {
              try {
                const res = await fetch('/api/videos/sync')
                const data = await res.json()
                if (res.ok) {
                  alert(`Đã cập nhật thành công ${data.synced_count} video!`)
                  fetchVideos()
                } else {
                  alert(`Lỗi cập nhật: ${data.error || 'Không xác định'}`)
                }
              } catch (e) {
                alert('Lỗi kết nối đến server')
              }
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
          >
            Cập nhật dữ liệu
          </button>
        </div>

        {/* Simple Video Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
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

        {!loading && videos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Chưa có video nào. Hãy thêm video ID vào database và nhấn "Cập nhật dữ liệu".
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}
