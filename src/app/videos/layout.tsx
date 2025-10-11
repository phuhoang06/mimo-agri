import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos - MIMO Agriculture',
  description: 'Khám phá các video hướng dẫn, tips và giới thiệu sản phẩm nông nghiệp từ MIMO Agriculture',
  keywords: 'video hướng dẫn, nông nghiệp, bẫy ruồi vàng, hạt giống, phân bón',
  openGraph: {
    title: 'Videos - MIMO Agriculture',
    description: 'Khám phá các video hướng dẫn, tips và giới thiệu sản phẩm nông nghiệp',
    type: 'website',
  },
}

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
