'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)



  return (
    <Link
      href={`/video/${video.id}`}
      className="block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {(() => {
          let thumbnailUrl = video.thumbnail;
          if (thumbnailUrl && !thumbnailUrl.startsWith('/') && !thumbnailUrl.startsWith('http')) {
            thumbnailUrl = `/${thumbnailUrl}`;
          }
          return (
            <Image
              src={thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          );
        })()}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/30 ${isHovered ? 'bg-white/30 scale-110' : 'bg-white/20'
            }`}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10">
          {video.duration}
        </div>

        {/* Featured Badge */}
        {video.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            🔥 Nổi bật
          </div>
        )}
      </div>
    </Link>
  )
}

