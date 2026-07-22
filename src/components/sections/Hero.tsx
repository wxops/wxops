'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, ShieldCheck, Layers } from 'lucide-react'

/* ──────────────────────────────────────────────
   Particle Network Canvas
──────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    interface Particle {
      x: number; y: number; vx: number; vy: number
      radius: number; color: string; alpha: number
    }

    const COLORS = ['#bd93f9', '#ff79c6', '#8be9fd', '#50fa7b']
    const COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.3,
    }))

    let animId: number

    function draw() {
      animId = requestAnimationFrame(draw)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = p.color
        ctx!.globalAlpha = p.alpha
        ctx!.fill()
        ctx!.globalAlpha = 1
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(189, 147, 249, ${0.18 * (1 - dist / 130)})`
            ctx!.lineWidth = 0.6
            ctx!.stroke()
          }
        }
      }
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45 }}
    />
  )
}

/* ──────────────────────────────────────────────
   Hero Section
──────────────────────────────────────────────── */
const badges = [
  { icon: Zap, text: 'Platform Engineering' },
  { icon: Layers, text: 'Golden Path' },
  { icon: ShieldCheck, text: 'GitOps-Native' },
]

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
  item: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } } },
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#282a36]"
    >
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[400px] rounded-full bg-purple-600/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[300px] rounded-full bg-cyan-600/6 blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />

      {/* Particle network */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 section-container w-full flex flex-col items-center text-center pt-24 pb-20">
        {/* Pill badges */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {badges.map(({ icon: Icon, text }) => (
            <motion.span
              key={text}
              variants={stagger.item}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium"
            >
              <Icon className="w-3 h-3" />
              {text}
            </motion.span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 max-w-6xl"
        >
          The{' '}
          <span className="text-gradient">Golden Path</span>
          <br />
          <span className="text-white/90">to Modern</span>{' '}
          <span className="relative">
            <span className="text-gradient">Development</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="6"
              viewBox="0 0 300 6"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 3 Q75 0 150 3 Q225 6 300 3"
                stroke="url(#underline-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#bd93f9" />
                  <stop offset="50%" stopColor="#ff79c6" />
                  <stop offset="100%" stopColor="#8be9fd" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          An Internal Developer Portal built around one identity, one catalog,
          and a working golden path — self-hosted, open source, and{' '}
          <span className="text-indigo-300 font-medium">MVP live today</span>.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <a
            href="/demo"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 transition-all duration-200"
          >
            Try It With Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/15 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-1.5 h-2.5 bg-indigo-400/70 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
