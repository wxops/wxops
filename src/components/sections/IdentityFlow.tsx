'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { KeyRound, ShieldCheck, ArrowRight, Maximize2 } from 'lucide-react'

const steps = [
  {
    title: 'One redirect, one login',
    desc: 'A request hits Traefik and gets routed through ForwardAuth / OAuth2 Proxy to the Pinniped Supervisor for an OIDC + PKCE login — no per-app credentials.',
  },
  {
    title: 'Gitea is the upstream IdP',
    desc: 'The Supervisor federates to Gitea for the actual login and scopes/claims. The portal never sees a password — only the resulting identity token.',
  },
  {
    title: 'Per-cluster token exchange',
    desc: 'For every spoke cluster, the portal exchanges the session token via the Pinniped Concierge (JWTAuthenticator) — cluster-scoped, audience-bound, short-lived.',
  },
  {
    title: 'Kubernetes RBAC decides, not the portal',
    desc: 'The Concierge-issued identity is checked against native ClusterRoleBinding rules on the spoke. There is no separate permission system to keep in sync.',
  },
]

export function IdentityFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="identity-flow" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[600px] h-[400px] rounded-full bg-purple-600/6 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            <KeyRound className="w-3.5 h-3.5" />
            How Identity Actually Wires Together
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            One Login,{' '}
            <span className="text-gradient">Every System</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            This is the real request path — Pinniped as the Kubernetes-native
            OIDC layer, not a diagram we drew for the pitch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
        >
          {/* Diagram */}
          <a
            href="/img/wxops-oauth.png"
            target="_blank"
            rel="noopener noreferrer"
            className="group lg:col-span-3 block diagram-frame p-3 sm:p-5 relative overflow-hidden"
          >
            <div className="relative w-full aspect-[1920/1010]">
              <Image
                src="/img/wxops-oauth.png"
                alt="W'xOps OAuth2 / OIDC request flow — Traefik, OAuth2 Proxy, Pinniped Supervisor and Concierge, Gitea as upstream identity provider"
                fill
                className="object-contain"
              />
            </div>
            <span className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/70 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3 h-3" />
              View full size
            </span>
          </a>

          {/* Steps */}
          <div className="lg:col-span-2 space-y-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex gap-3.5"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-300 text-xs font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-0.5">{s.title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              Nothing is stored, nothing can drift.
              <a
                href="/img/wxops-oauth.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition-colors ml-1"
              >
                See the full diagram <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
