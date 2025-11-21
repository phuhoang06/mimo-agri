'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  thumbnail_url?: string
  created_at: string
  author_name: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('tb_blog')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(20)
      setArticles(data || [])
      setLoading(false)
    }
    fetchArticles()
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Tài liệu kỹ thuật</h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <Link key={article.id} href={`/articles/${article.id}`} className="block bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="aspect-video bg-gray-100 relative">
                    {article.thumbnail_url ? (
                      <NextImage
                        src={article.thumbnail_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{article.excerpt}</p>
                    <div className="text-xs text-gray-500 flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <span>{article.author_name}</span>
                      <span>{new Date(article.created_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chưa có bài viết nào.</p>
            </div>
          )}
        </>
      )}
    </main>
  )
}
