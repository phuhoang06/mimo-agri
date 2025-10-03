import HeroWithSidebar from '@/components/HeroWithSidebar'
import HotProductsSection from '@/components/HotProductsSection'
import AllProductsSection from '@/components/AllProductsSection'
import VideoSection from '@/components/VideoSection'
import TechnicalGuideSection from '@/components/TechnicalGuideSection'

export default function Home() {
  return (
    <div>
      <HeroWithSidebar />
      <HotProductsSection />
      <AllProductsSection />
      <VideoSection />
      <TechnicalGuideSection />
    </div>
  )
}