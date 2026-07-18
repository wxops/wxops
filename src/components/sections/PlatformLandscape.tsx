'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Map, Maximize2 } from 'lucide-react'

export function PlatformLandscape() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="platform-landscape" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[700px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-4">
            <Map className="w-3.5 h-3.5" />
            The Full Platform, Mapped
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From{' '}
            <span className="text-gradient">Who Uses It</span>{' '}
            to What Runs It
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Stakeholders and developers on the left, the WxIDP tenant surface
            in the middle, the WxInfrastructure and WxPlatform planes on the
            right — this is the actual system map, not a simplified pitch
            version of it.
          </p>
        </motion.div>

        <motion.a
          href="/img/wxops-landscape.png"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group block diagram-frame p-3 sm:p-6 relative overflow-hidden"
        >
          <div className="relative w-full aspect-[2000/1061]">
            <Image
              src="/img/wxops-landscape.png"
              alt="W'xOps platform landscape — stakeholders, the WxIDP tenant surface, WxInfrastructure, and the WxPlatform orchestration, data, security, ingress, monitoring, and policy planes"
              fill
              className="object-contain"
            />
          </div>
          <span className="absolute top-4 right-4 sm:top-8 sm:right-8 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/70 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3 h-3" />
            View full size
          </span>
        </motion.a>
      </div>
    </section>
  )
}
