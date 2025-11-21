'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  excerpt: string
  thumbnail_url?: string
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
        .from('tb_blog')
        .select('*')
        .eq('status', 'published')
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

  const displayArticles = articles

  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Hướng Dẫn & Chăm Sóc
            </h2>
            <p className="text-gray-500">Kiến thức nông nghiệp hữu ích cho nhà nông</p>
          </div>
          <Link
            href="/articles"
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-green-700 transition-colors group"
          >
            Xem tất cả
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8 max-w-md mx-auto">
              <span className="text-4xl mb-4 block">⚠️</span>
              <h3 className="font-bold text-red-800 mb-2 text-lg">Lỗi kết nối</h3>
              <p className="text-red-600 text-sm mb-6">{error}</p>
              <button
                onClick={fetchTechnicalGuides}
                className="bg-red-500 text-white px-6 py-2.5 rounded-xl hover:bg-red-600 transition-all shadow-sm hover:shadow-md font-medium"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Technical Guide Card */}
        {!loading && displayArticles.length > 0 && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
            {displayArticles.map((article) => (
              <div key={article.id} className="md:flex">
                {/* Article Image */}
                <div className="md:w-1/2 lg:w-2/5 relative overflow-hidden">
                  <div className="h-64 md:h-full bg-gray-100 relative">
                    {article.thumbnail_url ? (
                      <img
                        src={article.thumbnail_url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-green-100">
                        <span className="text-6xl">📖</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Article Content */}
                <div className="md:w-1/2 lg:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(article.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-8 leading-relaxed text-lg line-clamp-3">
                    {article.excerpt && article.excerpt.length > 200
                      ? `${article.excerpt.substring(0, 200)}...`
                      : article.excerpt
                    }
                  </p>

                  <div className="flex items-center">
                    <a
                      href={`/articles/${article.id}`}
                      className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-green-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      Đọc tiếp
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Quick Tips */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🌱', title: 'Canh tác thông minh', desc: 'Áp dụng công nghệ hiện đại vào sản xuất nông nghiệp' },
            { icon: '🛡️', title: 'Phòng trừ an toàn', desc: 'Sử dụng các biện pháp sinh học bảo vệ môi trường' },
            { icon: '📈', title: 'Tăng năng suất', desc: 'Tối ưu hóa quy trình để đạt hiệu quả cao nhất' }
          ].map((tip, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-green-100 group cursor-default">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300 text-2xl">
                {tip.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">{tip.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
