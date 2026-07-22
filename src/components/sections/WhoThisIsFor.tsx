'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

const fitFor = [
  'Teams already committed to Kubernetes + GitOps',
  'Teams that want zero plugin/runtime overhead',
  'Teams comfortable with an opinionated stack (Gitea, ArgoCD, Crossplane, Vault, Kyverno) today',
]

const notYetFor = [
  'Non-Kubernetes or hybrid VM/serverless workloads',
  'Teams needing a large existing plugin ecosystem',
  'Teams needing enterprise SLAs / support contracts',
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export function WhoThisIsFor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            Fit Check
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Who This Is{' '}
            <span className="text-gradient">For</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            An honest read on where W&apos;xOps fits today — and where it doesn&apos;t, yet.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 glass-hover"
          >
            <h3 className="text-white font-bold mb-4">Who this is for</h3>
            <ul className="space-y-3">
              {fitFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-500/10 to-slate-600/5 border border-slate-500/20 glass-hover"
          >
            <h3 className="text-white font-bold mb-4">Who this isn&apos;t for (yet)</h3>
            <ul className="space-y-3">
              {notYetFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500/60" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
