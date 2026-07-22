'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Database, GitPullRequest, KeyRound } from 'lucide-react'

const stats = [
  { icon: ShieldCheck, value: 'Self-Hosted', label: 'Runs Inside Your Infra' },
  { icon: Database, value: '0', label: 'Databases to Secure' },
  { icon: GitPullRequest, value: '100%', label: 'Changes via Git PR' },
  { icon: KeyRound, value: '1', label: 'Token — Portal + kubectl + CI' },
]

export function EnterpriseHero() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-slate-400 mb-8"
        >
          <a href="/" className="hover:text-slate-400 transition-colors">
            W&apos;xOps IDP
          </a>
          <span>/</span>
          <span className="text-slate-400">Demo</span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dot-active" />
          Solo-Maintained, Actively Shipping
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-3xl"
        >
          Runs Inside{' '}
          <span className="text-gradient">Your Infrastructure</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-400 text-lg max-w-2xl mb-10 leading-relaxed"
        >
          Self-hosted, single binary, no database to patch or breach. Every
          configuration change is a reviewable Git PR. Tell me about your use
          case and I&apos;ll personally walk you through the architecture,
          security model, and deployment plan.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <a
            href="#enterprise-form"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 transition-all duration-200"
          >
            Try It With Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#enterprise-faq"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-hover rounded-xl text-white font-semibold"
          >
            Read the FAQ
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl"
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-bold text-sm">{value}</span>
              <span className="text-slate-500 text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
