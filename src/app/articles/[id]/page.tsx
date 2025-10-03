'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  content: string
  image_url?: string
  created_at: string
}

export default function ArticleDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
      setArticle(data || null)
    }
    fetchArticle()
  }, [id])

  const display = article || {
    id: 'fallback-1',
    title: 'Ruồi vàng đục trái - Kẻ thù lớn của cây ăn quả',
    content: 'Tìm hiểu về ruồi vàng đục trái và các biện pháp phòng trừ hiệu quả để bảo vệ vườn cây ăn quả.',
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2340&auto=format&fit=crop',
    created_at: new Date().toISOString()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{display.title}</h1>
      {display.image_url && (
        <div className="rounded-lg overflow-hidden mb-6">
          <img src={display.image_url} alt={display.title} className="w-full h-auto" />
        </div>
      )}
      <article className="prose max-w-none">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{display.content}</p>
      </article>
    </main>
  )
}


