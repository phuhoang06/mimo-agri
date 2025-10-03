'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  content: string
  image_url?: string
  created_at: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      setArticles(data || [])
      setLoading(false)
    }
    fetchArticles()
  }, [])

  const fallback: Article[] = [
    {
      id: 'fallback-1',
      title: 'Ruồi vàng đục trái - Kẻ thù lớn của cây ăn quả',
      content: 'Tìm hiểu về ruồi vàng đục trái và biện pháp phòng trừ hiệu quả.',
      image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2340&auto=format&fit=crop',
      created_at: new Date().toISOString()
    }
  ]

  const list = articles.length > 0 ? articles : fallback

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Tài liệu kỹ thuật</h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(article => (
            <a key={article.id} href={`/articles/${article.id}`} className="block bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100">
                {article.image_url && (
                  <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.content}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  )
}


