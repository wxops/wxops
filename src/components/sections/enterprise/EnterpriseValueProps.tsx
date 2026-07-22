'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Database, GitPullRequest, KeyRound } from 'lucide-react'

const props = [
  {
    icon: ShieldCheck,
    title: 'Data Stays in Your Infrastructure',
    description:
      "Self-hosted as a single container inside your own Kubernetes cluster. Nothing calls home, nothing leaves your network boundary.",
    color: 'from-indigo-500/15 to-indigo-600/5',
    border: 'border-indigo-500/25',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Database,
    title: 'No Database to Patch or Breach',
    description:
      "There's no Postgres instance, no plugin registry, no cache layer to secure. Git is the only source of truth — restart the portal and it just reconnects.",
    color: 'from-purple-500/15 to-purple-600/5',
    border: 'border-purple-500/25',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
  },
  {
    icon: GitPullRequest,
    title: 'Every Change Is a Reviewable PR',
    description:
      "The portal never writes to a Kubernetes API directly. Every configuration change goes through a Git pull request — a built-in audit trail with no extra tooling.",
    color: 'from-cyan-500/15 to-cyan-600/5',
    border: 'border-cyan-500/25',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
  },
  {
    icon: KeyRound,
    title: 'One Identity, Not a Second Permission System',
    description:
      "Pinniped derives access from your existing identity provider's groups via Kubernetes RBAC — nothing new to provision, nothing that can drift out of sync.",
    color: 'from-emerald-500/15 to-emerald-600/5',
    border: 'border-emerald-500/25',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export function EnterpriseValueProps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            The Architecture Decisions Behind It
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built on{' '}
            <span className="text-gradient">Fewer Moving Parts</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {props.map((p) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                variants={itemVariants}
                className={`flex gap-4 p-6 rounded-2xl bg-gradient-to-br ${p.color} border ${p.border} glass-hover`}
              >
                <div className={`p-3 rounded-xl ${p.iconBg} h-fit flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${p.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1.5">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
