import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { EnterpriseHero } from '@/components/sections/enterprise/EnterpriseHero'
import { EnterpriseValueProps } from '@/components/sections/enterprise/EnterpriseValueProps'
import { EnterpriseFAQ } from '@/components/sections/enterprise/EnterpriseFAQ'
import { EnterpriseForm } from '@/components/sections/enterprise/EnterpriseForm'

export const metadata: Metadata = {
  title: "Talk to the Maintainer — W'xOps IDP",
  description:
    "Self-hosted, single-binary, GitOps-native. Tell me about your use case and I'll personally walk you through how W'xOps runs inside your own Kubernetes infrastructure.",
}

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#282a36] overflow-x-hidden">
      <Navbar />
      <EnterpriseHero />

      {/* Divider */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      <EnterpriseValueProps />
      <EnterpriseFAQ />
      <EnterpriseForm />
      <Footer />
    </main>
  )
}
