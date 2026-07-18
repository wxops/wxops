'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: "Is W’xOps self-hosted or a SaaS product?",
    a: "Self-hosted. W’xOps ships as a single Go binary with the Next.js frontend embedded, deployed as one container inside your own Kubernetes cluster. There’s no SaaS backend, and no data leaves your infrastructure.",
  },
  {
    q: "Do we need to run a database?",
    a: "No. There’s no Postgres, no cache layer, no message queue. Git is the source of truth for the catalog and configuration — the portal is stateless and just reconnects if you restart or redeploy it.",
  },
  {
    q: "How is identity and access handled?",
    a: "Through Pinniped, the open-source Kubernetes-native OIDC project originally built by VMware. One login issues a token that works for the portal, kubectl, and CI — no second SSO integration to configure, and access control is native Kubernetes RBAC derived from your identity provider’s groups.",
  },
  {
    q: "How does this compare to Backstage?",
    a: "The service catalog uses a Backstage-compatible YAML schema, so migrating entities over is straightforward — but W’xOps doesn’t run the Backstage runtime. There’s no Node.js + Postgres + plugin stack to operate; it’s one Go + Next.js binary.",
  },
  {
    q: "Can this run in an air-gapped or regulated environment?",
    a: "Yes — that’s a primary use case. Because the portal is self-hosted, stateless, and never calls out to a third-party service, it fits environments where data must stay inside your own infrastructure.",
  },
  {
    q: "What does pricing look like?",
    a: "We haven’t published pricing yet — W’xOps is in early access. Request a demo below and we’ll walk through options based on your team size, cluster footprint, and deployment model.",
  },
  {
    q: "What kind of support do we get?",
    a: "Direct access to the team building the platform — no ticket queue. Tell us what you’d like covered in the form below and we’ll come to the call prepared to answer it.",
  },
]

export function EnterpriseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="enterprise-faq" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Questions We Get Before a Demo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Answers, Before You{' '}
            <span className="text-gradient">Ask</span>
          </h2>
        </motion.div>

        <div className="space-y-2.5">
          {faqs.map((item, i) => {
            const open = openIndex === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          Have a different question? Ask it directly in the form below — we&apos;ll answer it on the call.
        </p>
      </div>
    </section>
  )
}
