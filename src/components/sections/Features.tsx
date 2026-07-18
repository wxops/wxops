'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  KeyRound,
  MousePointerClick,
  BookOpen,
  GitMerge,
  ShieldCheck,
  Bug,
  CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: KeyRound,
    title: 'Universal Identity',
    description:
      'One Pinniped-issued OIDC token works for the portal, kubectl, and CI — no second login, no separate kubeconfig ceremony, no service accounts to rotate. Access control is native Kubernetes RBAC, derived straight from your identity provider\'s groups.',
    evidence: 'No portal permission system — Kubernetes RBAC is the source of truth',
    evidenceTag: 'Architecture Win',
    color: 'from-indigo-500/15 to-indigo-600/5',
    border: 'border-indigo-500/25',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    tagColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    checks: ['Pinniped — Kubernetes-native OIDC', 'One token: portal + kubectl + CI', 'RBAC derived from IdP groups', 'Nothing stored, nothing to drift'],
  },
  {
    icon: MousePointerClick,
    title: 'One-Click Onboarding',
    description:
      'Fill in an app name, pick a Golden Path template, and the portal creates your Gitea repo, writes empty Vault secrets, and opens a gitops-infra pull request. Merge it and ArgoCD + Crossplane take it from there.',
    evidence: 'No platform ticket, no YAML hand-editing',
    evidenceTag: 'Speed Win',
    color: 'from-purple-500/15 to-purple-600/5',
    border: 'border-purple-500/25',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    tagColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    checks: ['Gitea repo + CI pipeline scaffolded', 'Vault secrets pre-provisioned', 'gitops-infra PR opened automatically', 'ArgoCD sync → Crossplane provisions the app'],
  },
  {
    icon: BookOpen,
    title: 'Service Catalog',
    description:
      'A searchable registry of every service, API, and resource — read straight from Backstage-compatible YAML in your gitops-infra repo. No database, no plugin server: the portal caches for five minutes and invalidates instantly on a Gitea push webhook.',
    evidence: 'No Backstage runtime — Git is the catalog',
    evidenceTag: 'Productivity Win',
    color: 'from-cyan-500/15 to-cyan-600/5',
    border: 'border-cyan-500/25',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    tagColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    checks: ['Backstage-compatible entity schema', 'Client-side FlexSearch — no round-trip', 'Owner, lifecycle & dependency graph per entity', 'Webhook-driven cache invalidation', 'RFC / ADR / Runbook docs entities, rendered from Gitea Markdown'],
  },
  {
    icon: GitMerge,
    title: 'Automated Pipelines',
    description:
      'Push to Gitea and the pipeline runs on self-hosted Gitea Actions. ArgoCD syncs the GitOps overlay, Crossplane expands the tenant app, and the ArgoCD Image Updater keeps image tags current — dev auto-syncs, staging and production wait on a manual gate.',
    evidence: 'Auto-sync in dev, manual gate for staging & prod',
    evidenceTag: 'Velocity Win',
    color: 'from-violet-500/15 to-violet-600/5',
    border: 'border-violet-500/25',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    tagColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    checks: ['Gitea Actions — self-hosted CI', 'ArgoCD GitOps sync + Crossplane provisioning', 'Image tags managed by ArgoCD Image Updater', 'Role-gated promotion past experimental'],
  },
  {
    icon: ShieldCheck,
    title: 'GitOps-Only, Read-Only by Design',
    description:
      'The portal never writes to a Kubernetes API — every configuration change is a reviewable Gitea pull request. Vault access is write-only (no reads, no deletes), deletes are platform-team-only, and Kyverno policies enforce network isolation and quotas automatically on every tenant namespace.',
    evidence: 'Every change is a Git commit with a reviewer',
    evidenceTag: 'Compliance Win',
    color: 'from-amber-500/15 to-amber-600/5',
    border: 'border-amber-500/25',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    checks: ['Portal never writes to any cluster API', 'Vault: create/update only — no reads, no deletes', 'Kyverno auto-provisions network policy + quotas', 'Every write logged for audit'],
  },
  {
    icon: Bug,
    title: 'Darlane — On-Demand Debug Pods',
    description:
      'Provision a parallel debug pod alongside your live deployment — same namespace, same secrets, same environment. Stream local file changes straight into the running pod and get a real exec session, without touching the main workload.',
    evidence: 'Real exec session, zero blast radius on the live pod',
    evidenceTag: 'Inner-Loop Win',
    color: 'from-emerald-500/15 to-emerald-600/5',
    border: 'border-emerald-500/25',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    checks: ['Same namespace & secrets as the main pod', 'Live file sync via `wxops darlane sync`', 'Traffic split by weight or header, dev-first', 'Role-gated for staging & production'],
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

export function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            IDP Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything a Developer{' '}
            <span className="text-gradient">Needs</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Six core capabilities — each grounded in how the platform actually
            works, not marketing math.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className={`group relative flex flex-col p-6 rounded-2xl bg-gradient-to-br ${f.color} border ${f.border} overflow-hidden glass-hover cursor-default`}
              >
                {/* Hover top-border glow */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${f.iconColor} opacity-0 group-hover:opacity-40 transition-opacity`} />

                {/* Icon + title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${f.iconBg} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${f.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {f.title}
                    </h3>
                    <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${f.tagColor}`}>
                      {f.evidenceTag}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                  {f.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-1.5 mb-5">
                  {f.checks.map((check) => (
                    <li key={check} className="flex items-start gap-2 text-xs text-slate-500">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${f.iconColor}`} />
                      {check}
                    </li>
                  ))}
                </ul>

                {/* Evidence footer */}
                <div className={`pt-4 border-t border-white/[0.06] flex items-center gap-2`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${f.iconBg} ${f.iconColor} dot-active`} />
                  <span className="text-xs text-slate-500">
                    {f.evidence}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
