import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { WhoThisIsFor } from '@/components/sections/WhoThisIsFor'
import { GoldenPath } from '@/components/sections/GoldenPath'
import { Features } from '@/components/sections/Features'
import { IdentityFlow } from '@/components/sections/IdentityFlow'
import { PlatformLandscape } from '@/components/sections/PlatformLandscape'
import { Architecture } from '@/components/sections/Architecture'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#282a36] overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhoThisIsFor />
      <GoldenPath />
      <Features />
      <IdentityFlow />
      <PlatformLandscape />
      <Architecture />
      <CTA />
      <Footer />
    </main>
  )
}
