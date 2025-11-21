'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import NextImage from 'next/image'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

interface Article {
    id: string
    title: string
    content: string
    thumbnail_url?: string
    created_at: string
    author_name: string
}

export default function ArticleDetailPage() {
    const params = useParams()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArticle = async () => {
            if (!params.id) return

            try {
                const { data, error } = await supabase
                    .from('tb_blog')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error) throw error
                setArticle(data)
            } catch (err) {
                console.error('Error fetching article:', err)
                setError('Không tìm thấy bài viết')
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [params.id])

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        )
    }

    if (error || !article) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Đã có lỗi xảy ra</h2>
                <p className="text-gray-600 mb-6">{error || 'Bài viết không tồn tại'}</p>
                <Link href="/articles" className="text-green-600 hover:text-green-700 font-medium">
                    &larr; Quay lại danh sách
                </Link>
            </div>
        )
    }

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/articles" className="inline-flex items-center text-gray-500 hover:text-green-600 mb-6 transition-colors">
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                Quay lại danh sách
            </Link>

            <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {article.thumbnail_url && (
                    <div className="aspect-video relative w-full">
                        <NextImage
                            src={article.thumbnail_url}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="p-6 sm:p-10">
                    <header className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm">
                            <span className="font-medium text-gray-900 mr-2">{article.author_name}</span>
                            <span className="mx-2">•</span>
                            <time dateTime={article.created_at}>
                                {new Date(article.created_at).toLocaleDateString('vi-VN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                    </header>

                    <div
                        className="prose prose-green max-w-none prose-img:rounded-xl prose-headings:text-gray-900 prose-p:text-gray-700"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </article>
        </main>
    )
}
