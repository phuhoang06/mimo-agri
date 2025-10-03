'use client'

import CategorySidebar from './CategorySidebar'
import HeroSection from './HeroSection'

export default function HeroWithSidebar() {
  return (
    <section className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 items-stretch">
          {/* Categories Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <CategorySidebar />
          </div>

          {/* Hero Banner - Kéo dài để có cùng chiều cao với sidebar */}
          <div className="flex-1 min-w-0">
            <div className="relative h-full min-h-[500px] overflow-hidden rounded-lg shadow-sm">
              <HeroSection />
            </div>
          </div>
        </div>

        {/* Mobile Categories - Hiển thị trên mobile */}
        <div className="lg:hidden mt-4">
          <CategorySidebar />
        </div>
      </div>
    </section>
  )
}