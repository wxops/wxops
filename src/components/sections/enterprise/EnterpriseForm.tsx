'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Building2,
  Users,
  Layers,
} from 'lucide-react'

/* ── Types ────────────────────────────────────────────────────── */
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  company: string
  teamSize: string
  currentTooling: string
  message: string
  /** Honeypot — real visitors never fill this in; bots that autofill every field will. */
  _gotcha: string
}

/* ── Constants ────────────────────────────────────────────────── */
const TEAM_SIZE_OPTIONS = [
  '1–10 engineers',
  '11–50 engineers',
  '51–200 engineers',
  '201–1000 engineers',
  '1000+ engineers',
]

const TOOLING_OPTIONS = [
  'Backstage',
  'Port',
  'Homegrown scripts / wiki',
  'Nothing yet',
  'Other',
]

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  teamSize: '',
  currentTooling: '',
  message: '',
  _gotcha: '',
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID
const FORMSPREE_ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null
const BUSINESS_MAIL = 'contact@wxops.cloud'

/* ── Helpers ──────────────────────────────────────────────────── */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ── Sub-components ───────────────────────────────────────────── */
function InputField({
  label,
  id,
  icon: Icon,
  error,
  children,
}: {
  label: string
  id: string
  icon: React.ElementType
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      autoComplete={type === 'email' ? 'email' : 'off'}
      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
    />
  )
}

function SelectField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string
  label: string
  icon: React.ElementType
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#1e1f29]">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#1e1f29]">{o}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────────────── */
export function EnterpriseForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.company.trim()) newErrors.company = 'Company is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    // Honeypot: real visitors never fill this in. If it's set, silently
    // pretend to succeed instead of tipping the bot off.
    if (form._gotcha) {
      setStatus('success')
      setForm(INITIAL_FORM)
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          teamSize: form.teamSize || '—',
          currentTooling: form.currentTooling || '—',
          message: form.message.trim() || '(not specified)',
          _subject: `[W'xOps Demo] Request — ${form.company.trim() || form.name.trim()}`,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm(INITIAL_FORM)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="enterprise-form" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/6 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Let&apos;s Talk
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Tell me about your team and what you&apos;d like to see — I&apos;ll
            come to the call prepared to answer it, not pitch a deck.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {status === 'success' ? (
            <SuccessCard onReset={() => setStatus('idle')} />
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass rounded-2xl p-6 sm:p-8 space-y-4"
            >
              {/* Honeypot — hidden from real visitors, catches naive bots that fill every field */}
              <input
                type="text"
                name="_gotcha"
                value={form._gotcha}
                onChange={(e) => setField('_gotcha', e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] w-px h-px opacity-0"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Full Name *" id="ent-name" icon={User} error={errors.name}>
                  <TextInput
                    id="ent-name"
                    value={form.name}
                    onChange={(v) => setField('name', v)}
                    placeholder="Ada Lovelace"
                    required
                  />
                </InputField>

                <InputField label="Work Email *" id="ent-email" icon={Mail} error={errors.email}>
                  <TextInput
                    id="ent-email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setField('email', v)}
                    placeholder="ada@company.com"
                    required
                  />
                </InputField>
              </div>

              <InputField label="Company *" id="ent-company" icon={Building2} error={errors.company}>
                <TextInput
                  id="ent-company"
                  value={form.company}
                  onChange={(v) => setField('company', v)}
                  placeholder="Acme Corp"
                  required
                />
              </InputField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  id="ent-team-size"
                  label="Team Size"
                  icon={Users}
                  value={form.teamSize}
                  onChange={(v) => setField('teamSize', v)}
                  options={TEAM_SIZE_OPTIONS}
                  placeholder="Select team size…"
                />
                <SelectField
                  id="ent-tooling"
                  label="Current Tooling"
                  icon={Layers}
                  value={form.currentTooling}
                  onChange={(v) => setField('currentTooling', v)}
                  options={TOOLING_OPTIONS}
                  placeholder="Select current tooling…"
                />
              </div>

              <div>
                <label htmlFor="ent-message" className="block text-xs font-medium text-slate-400 mb-1.5">
                  What would you like me to cover? <span className="text-slate-400">(optional, but helps me prepare)</span>
                </label>
                <textarea
                  id="ent-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setField('message', e.target.value)}
                  placeholder="e.g. How does Pinniped fit our existing Okta setup? Can this run air-gapped? What's the migration path from Backstage?"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="flex items-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  Something went wrong sending your request — please try again, or email{' '}
                  {BUSINESS_MAIL} directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                I reply personally — typically within 1–2 business days.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Success state ────────────────────────────────────────────── */
function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-8 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        Request sent
      </h3>
      <p className="text-slate-400 text-sm max-w-sm mx-auto mb-5 leading-relaxed">
        Thanks for reaching out — your message landed in my inbox and
        I&apos;ll get back to you personally, typically within 1–2 business days.
      </p>
      <button
        onClick={onReset}
        className="text-xs text-slate-400 hover:text-slate-400 underline underline-offset-2 transition-colors"
      >
        Submit another request
      </button>
    </motion.div>
  )
}
