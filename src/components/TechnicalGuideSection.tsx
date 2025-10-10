'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  content: string
  image_url?: string
  created_at: string
}

export default function TechnicalGuideSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTechnicalGuides()
  }, [])

  const fetchTechnicalGuides = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .limit(1) // Chỉ hiển thị 1 bài hướng dẫn nổi bật
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      setArticles(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Fallback article nếu chưa có data trong DB
  const fallbackArticle = {
    id: 'fallback-1',
    title: 'Ruồi vàng duc trái - Kẻ thù lớn của cây ăn quả',
    content: 'Tìm hiểu về ruồi vàng duc trái và các biện pháp phòng trừ hiệu quả để bảo vệ vườn cây ăn quả.',
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2340&auto=format&fit=crop',
    created_at: new Date().toISOString()
  }

  const displayArticles = articles.length > 0 ? articles : [fallbackArticle]

  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            HƯỚNG DẪN VÀ CHĂM SÓC
          </h2>
          <Link
            href="/articles"
            className="text-green-600 font-medium hover:text-green-700 transition-colors border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50"
          >
            xem thêm
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <span className="text-4xl mb-4 block">⚠️</span>
              <h3 className="font-semibold text-red-800 mb-2">Lỗi kết nối</h3>
              <p className="text-red-600 text-sm">{error}</p>
              <button 
                onClick={fetchTechnicalGuides}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Technical Guide Card */}
        {!loading && (
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {displayArticles.map((article) => (
              <div key={article.id} className="md:flex">
                {/* Article Image */}
                <div className="md:w-2/5">
                  <div className="h-64 md:h-full bg-gray-200 relative overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-green-100">
                        <span className="text-6xl">📖</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Article Content */}
                <div className="md:w-3/5 p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {article.content.length > 200 
                      ? `${article.content.substring(0, 200)}...` 
                      : article.content
                    }
                  </p>

                  <div className="flex items-center justify-between">
                    <a
                      href={`/articles/${article.id}`}
                      className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Xem chi tiết
                    </a>
                    
                    <span className="text-gray-400 text-sm">
                      {new Date(article.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Quick Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🌱', title: 'Canh tác thông minh', desc: 'Áp dụng công nghệ hiện đại' },
            { icon: '🛡️', title: 'Phòng trừ an toàn', desc: 'Sử dụng biện pháp sinh học' },
            { icon: '📈', title: 'Tăng năng suất', desc: 'Tối ưu hóa quy trình sản xuất' }
          ].map((tip, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-green-300 transition-colors">
              <span className="text-3xl mb-2 block">{tip.icon}</span>
              <h4 className="font-semibold text-gray-800 mb-1">{tip.title}</h4>
              <p className="text-gray-600 text-sm">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}







