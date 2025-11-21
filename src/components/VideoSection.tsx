'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import VideoCard from './VideoCardComponent'
import { supabase, YoutubeVideo } from '@/lib/supabase'

export default function VideoSection() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)

      // Fetch latest 3 videos from Supabase
      const { data, error } = await supabase
        .from('youtube_video')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) throw error

      const mappedVideos = (data || []).map((v: YoutubeVideo) => {
        const cleanId = v.video_id.split('&')[0].split('?')[0]
        return {
          id: v.id,
          title: v.title || 'Video chưa có tiêu đề',
          description: v.description || '',
          videoId: cleanId,
          thumbnail: v.thumbnail_url || `https://img.youtube.com/vi/${cleanId}/maxresdefault.jpg`,
          category: 'huong-dan',
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

  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Video Nổi Bật
            </h2>
            <p className="text-gray-500">Kỹ thuật canh tác và chia sẻ kinh nghiệm</p>
          </div>
          <Link
            href="/videos"
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-green-700 transition-colors group"
          >
            Xem tất cả video
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Chưa có video nổi bật.
          </div>
        )}
      </div>
    </section>
  )
}






