'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Globe,
  Database,
  Container,
  Lock,
  BarChart3,
  GitBranch,
  Layers,
  Users,
  FileCode2,
  BookOpen,
  Cpu,
  Network,
  Boxes,
  HardDrive,
} from 'lucide-react'

/* ──────────────────────────────────────────────
   Architecture layers data
──────────────────────────────────────────────── */
const layers = [
  {
    name: 'Developer Experience Layer',
    sub: 'What every engineer sees and touches',
    color: 'from-indigo-500/15 to-indigo-600/5',
    border: 'border-indigo-500/20',
    labelColor: 'text-indigo-300',
    dotColor: 'bg-indigo-400',
    tools: [
      { name: 'Portal UI', icon: Globe, desc: 'Go + Next.js — single binary, nginx-routed' },
      { name: 'Service Catalog', icon: BookOpen, desc: 'Discover & deploy internal services' },
      { name: 'Self-Service CLI', icon: FileCode2, desc: 'Golden Path scaffolding + Darlane' },
      { name: 'Docs as Code', icon: Layers, desc: 'RFC / ADR / Runbook linked per entity' },
      { name: 'Team Management', icon: Users, desc: 'Ownership & RBAC via Pinniped groups' },
    ],
  },
  {
    name: 'Platform Services Layer',
    sub: 'The engines powering the Golden Path',
    color: 'from-purple-500/15 to-purple-600/5',
    border: 'border-purple-500/20',
    labelColor: 'text-purple-300',
    dotColor: 'bg-purple-400',
    tools: [
      { name: 'Identity', icon: Lock, desc: 'Pinniped — one token for portal + kubectl' },
      { name: 'CI/CD', icon: GitBranch, desc: 'Gitea Actions + ArgoCD GitOps' },
      { name: 'Provisioning', icon: Boxes, desc: 'Crossplane — XTenantApp / XTenantDatabase' },
      { name: 'Secret Management', icon: Database, desc: 'HashiCorp Vault — write-only' },
      { name: 'Policy Engine', icon: FileCode2, desc: 'Kyverno ClusterPolicies' },
      { name: 'Registry', icon: Container, desc: 'Gitea Registry' },
    ],
  },
  {
    name: 'Infrastructure Layer',
    sub: 'The foundation everything runs on',
    color: 'from-cyan-500/15 to-cyan-600/5',
    border: 'border-cyan-500/20',
    labelColor: 'text-cyan-300',
    dotColor: 'bg-cyan-400',
    tools: [
      { name: 'Kubernetes', icon: Cpu, desc: 'Multi-cluster, multi-env' },
      { name: 'Kustomize', icon: FileCode2, desc: 'Overlay-based config, per environment' },
      { name: 'Ingress', icon: Network, desc: 'Traefik — traffic split for Darlane' },
      { name: 'Observability', icon: BarChart3, desc: 'Grafana Alloy + Loki + Tempo + Pyroscope' },
      { name: 'Data Layer', icon: HardDrive, desc: 'CloudNativePG · SeaweedFS' },
    ],
  },
]

const techStack = [
  { name: 'Pinniped', category: 'Identity', color: 'text-indigo-300', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { name: 'Gitea', category: 'Git / CI / Registry', color: 'text-teal-300', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { name: 'ArgoCD', category: 'GitOps', color: 'text-orange-300', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'Crossplane', category: 'Provisioning', color: 'text-blue-300', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Kyverno', category: 'Policy', color: 'text-red-300', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { name: 'HashiCorp Vault', category: 'Secrets', color: 'text-yellow-300', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { name: 'Kubernetes', category: 'Runtime', color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'Kustomize', category: 'Config', color: 'text-purple-300', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Traefik', category: 'Ingress', color: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { name: 'Grafana Stack', category: 'Observability', color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
]

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export function Architecture() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="architecture" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/8 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-4">
            Technical Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built on{' '}
            <span className="text-gradient">Open Standards</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            A layered, open-source stack — no vendor lock-in. Everything is
            composable, replaceable, and cloud-agnostic.
          </p>
        </motion.div>

        {/* Layered architecture */}
        <div className="space-y-3 mb-16">
          {layers.map((layer, li) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: li % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * li }}
              className={`rounded-2xl bg-gradient-to-r ${layer.color} border ${layer.border} p-5 md:p-6`}
            >
              {/* Layer header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${layer.dotColor}`} />
                  <h3 className={`font-bold text-base ${layer.labelColor}`}>
                    {layer.name}
                  </h3>
                </div>
                <p className="text-slate-400 text-xs">{layer.sub}</p>
              </div>

              {/* Tools row */}
              <div className="flex flex-wrap gap-2.5">
                {layer.tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl group hover:bg-white/[0.07] transition-colors cursor-default"
                    >
                      <Icon className={`w-3.5 h-3.5 ${layer.labelColor} flex-shrink-0`} />
                      <div>
                        <p className="text-white text-xs font-medium leading-none">
                          {tool.name}
                        </p>
                        <p className="text-slate-400 text-[10px] leading-none mt-0.5 hidden sm:block">
                          {tool.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}

          {/* Arrow between layers (decorative) */}
        </div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white text-center mb-6">
            Full Technology Stack
          </h3>
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-wrap justify-center gap-2.5"
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className={`flex flex-col items-center px-4 py-2.5 rounded-xl ${tech.bg} border ${tech.border} cursor-default hover:scale-105 transition-transform`}
              >
                <span className={`font-semibold text-sm ${tech.color}`}>
                  {tech.name}
                </span>
                <span className="text-slate-400 text-[10px]">{tech.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
