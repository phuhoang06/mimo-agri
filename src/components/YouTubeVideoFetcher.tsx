'use client'

import { useState, useEffect } from 'react'

interface VideoData {
  id: string
  title: string
  videoId: string
  thumbnail: string
}

interface YouTubeVideoFetcherProps {
  videoIds: string[]
  onVideosLoaded: (videos: VideoData[]) => void
}

export default function YouTubeVideoFetcher({ videoIds, onVideosLoaded }: YouTubeVideoFetcherProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVideoData()
  }, [videoIds])

  const fetchVideoData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fallback titles - trong production sẽ dùng YouTube Data API
      const fallbackTitles = [
        'Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả, tiết kiệm và an toàn',
        'BẪY RUỒI VÀNG Chai Xịt - Sản phẩm diệt ruồi vàng hiệu quả 40%'
      ]

      const videos: VideoData[] = videoIds.map((videoId, index) => ({
        id: (index + 1).toString(),
        title: fallbackTitles[index] || 'Video không có tiêu đề',
        videoId: videoId,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      }))

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onVideosLoaded(videos)
    } catch (err) {
      setError('Không thể tải thông tin video')
      console.error('Error fetching video data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Component này không render gì, chỉ fetch data
  return null
}

// Utility function để lấy video data với YouTube Data API (cần API key)
export const fetchYouTubeVideoData = async (videoIds: string[], apiKey?: string): Promise<VideoData[]> => {
  if (!apiKey) {
    // Fallback nếu không có API key
    const fallbackTitles = [
      'Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả, tiết kiệm và an toàn',
      'BẪY RUỒI VÀNG Chai Xịt - Sản phẩm diệt ruồi vàng hiệu quả 40%'
    ]

    return videoIds.map((videoId, index) => ({
      id: (index + 1).toString(),
      title: fallbackTitles[index] || 'Video không có tiêu đề',
      videoId: videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }))
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(',')}&key=${apiKey}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch video data')
    }

    const data = await response.json()
    
    return data.items.map((item: any, index: number) => ({
      id: (index + 1).toString(),
      title: item.snippet.title,
      videoId: item.id,
      thumbnail: item.snippet.thumbnails.maxres?.url || `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`
    }))
  } catch (error) {
    console.error('Error fetching YouTube data:', error)
    // Return fallback data
    return fetchYouTubeVideoData(videoIds) // Recursive call without API key
  }
}
