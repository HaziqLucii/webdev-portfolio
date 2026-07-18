import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Sun, Moon, ArrowUpRight, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { Card } from '@/Components/ui/card'
import Marquee from '@/Components/ui/marquee'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/Components/ui/accordion'
import { navItems } from './data/navigation'
import { experiences } from './data/experiences'
import { projectsData, personalProjectsData } from './data/projects'
import { skills } from './data/skills'

/* ─── Stat block - colored brutalist card ──────────── */
function StatBlock({ value, suffix, label, bg, rotate = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: bg, transform: `rotate(${rotate}deg)` }}
      className="border-2 border-border shadow-shadow p-5 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
    >
      <p className="font-display text-5xl md:text-6xl leading-none">
        {value}
        <span className="text-3xl align-top">{suffix}</span>
      </p>
      <p className="mt-3 text-[10px] tracking-[0.25em] uppercase font-bold">{label}</p>
    </motion.div>
  )
}

/* ─── Sticker - rotated label tag ──────────────────── */
function Sticker({ children, rotate = -3, bg = 'var(--main)', className = '' }) {
  return (
    <span
      style={{ background: bg, transform: `rotate(${rotate}deg)` }}
      className={`inline-block border-2 border-border shadow-shadow-sm px-3 py-1 text-xs tracking-[0.2em] uppercase font-black ${className}`}
    >
      {children}
    </span>
  )
}

/* ─── haro screenshot carousel + click-to-zoom lightbox ─ */
const HARO_SLIDES = [
  { src: '/haro/cockpit.png', tag: 'Cockpit', caption: 'Agent stream, gate & live preview in one window' },
  { src: '/haro/dashboard.png', tag: 'Parallel', caption: 'Multiple agents running concurrently + the backlog' },
  { src: '/haro/gate.png', tag: 'The Gate', caption: 'Live test grid, green before anything can merge' },
  { src: '/haro/impact.png', tag: 'Impact Map', caption: 'Changed files → the exact tests they affect' },
  { src: '/haro/code-editor.png', tag: 'Diff Review', caption: 'Full-screen Monaco diff, split view and per-commit' },
  { src: '/haro/preview.png', tag: 'Live Preview', caption: 'The running app, previewed inside haro' },
]

function ScreenshotShowcase({ slides }) {
  const [i, setI] = useState(0)
  const [zoom, setZoom] = useState(false)
  const n = slides.length
  const go = (d) => setI((p) => (p + d + n) % n)
  const active = slides[i]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setI((p) => (p + 1) % n)
      else if (e.key === 'ArrowLeft') setI((p) => (p - 1 + n) % n)
      else if (e.key === 'Escape') setZoom(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [zoom])

  // Centering lives on the wrapper (translateY -50%); the press effect lives on the
  // button, keeping them on separate elements so the hover translate doesn't clobber
  // the vertical-centering transform.
  const arrowBtn =
    'border-2 border-border shadow-shadow-sm p-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer'
  const arrowWrap = 'absolute top-1/2 -translate-y-1/2 z-10'

  return (
    <div>
      {/* Main viewport */}
      <div className="relative border-4 border-border shadow-shadow-lg bg-secondary-background overflow-hidden">
        <motion.img
          key={active.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          src={active.src}
          alt={active.caption}
          onClick={() => setZoom(true)}
          className="w-full block cursor-zoom-in select-none"
          draggable={false}
        />

        {/* Prev / next */}
        <span className={`${arrowWrap} left-3`}>
          <button onClick={() => go(-1)} aria-label="Previous screenshot" style={{ background: 'var(--main)' }} className={arrowBtn}>
            <ChevronLeft size={18} />
          </button>
        </span>
        <span className={`${arrowWrap} right-3`}>
          <button onClick={() => go(1)} aria-label="Next screenshot" style={{ background: 'var(--main)' }} className={arrowBtn}>
            <ChevronRight size={18} />
          </button>
        </span>

        {/* Counter */}
        <div style={{ background: 'var(--background)' }} className="absolute top-3 left-3 border-2 border-border shadow-shadow-sm px-2 py-1 text-[10px] font-black tracking-[0.15em]">
          {i + 1} / {n}
        </div>

        {/* Caption bar */}
        <div className="absolute bottom-0 inset-x-0 bg-background/92 border-t-2 border-border px-4 py-3 flex items-center gap-3">
          <span style={{ background: 'var(--main)' }} className="shrink-0 text-[9px] tracking-[0.18em] uppercase font-black border-2 border-border px-1.5 py-0.5">
            {active.tag}
          </span>
          <span className="text-[11px] sm:text-xs font-bold leading-tight truncate">{active.caption}</span>
          <span className="ml-auto shrink-0 hidden sm:flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase opacity-50">
            <Maximize2 size={11} /> click to zoom
          </span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
        {slides.map((s, idx) => (
          <button
            key={s.src}
            onClick={() => setI(idx)}
            aria-label={`Show ${s.tag}`}
            style={idx === i ? { outline: '2px solid var(--main)', outlineOffset: '1px' } : {}}
            className={`overflow-hidden border-2 border-border aspect-[16/10] transition-all cursor-pointer ${idx === i ? 'shadow-shadow-sm' : 'opacity-55 hover:opacity-100'}`}
          >
            <img src={s.src} alt="" loading="lazy" draggable={false} className="w-full h-full object-cover object-top" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 sm:p-8 cursor-zoom-out"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setZoom(false) }}
            aria-label="Close"
            style={{ background: 'var(--main)' }}
            className="absolute top-4 right-4 border-2 border-border shadow-shadow-sm p-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
          <span className={`${arrowWrap} left-3 sm:left-6`}>
            <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous" style={{ background: 'var(--main)' }} className={arrowBtn}>
              <ChevronLeft size={20} />
            </button>
          </span>
          <span className={`${arrowWrap} right-3 sm:right-6`}>
            <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next" style={{ background: 'var(--main)' }} className={arrowBtn}>
              <ChevronRight size={20} />
            </button>
          </span>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-[92vw] max-h-[88vh] cursor-default">
            <img src={active.src} alt={active.caption} draggable={false} className="max-w-full max-h-[82vh] border-2 border-border object-contain" />
            <figcaption className="mt-3 text-center text-white/80 text-xs sm:text-sm font-bold">
              {active.tag}: {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const ids = ['home', 'about', 'projects', 'haro', 'skills', 'contact']
      const y = window.scrollY + 100
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ══════════════════════════════════════════════ */}
      {/* NAV - thick-border sticky bar                 */}
      {/* ══════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-background border-b-4 border-border">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          {/* Monogram chip */}
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'var(--main)' }}
            className="border-2 border-border shadow-shadow-sm px-3 py-1.5 font-display text-lg leading-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
          >
            IH.
          </button>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-2">
            {navItems.map((item, i) => {
              const isActive = item.sectionId === activeSection
              return (
                <button
                  key={i}
                  onClick={item.onClick}
                  style={isActive ? { background: 'var(--accent-lavender)' } : {}}
                  className={`px-3 py-1.5 text-xs tracking-[0.2em] uppercase font-black border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-border shadow-shadow-sm'
                      : 'border-transparent hover:border-border hover:shadow-shadow-sm hover:bg-secondary-background'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Mobile nav - icon-only */}
          <nav className="flex sm:hidden items-center gap-1.5">
            {navItems.map((item, i) => {
              const Icon = item.iconComponent
              const isActive = item.sectionId === activeSection
              return (
                <button
                  key={i}
                  onClick={item.onClick}
                  style={isActive ? { background: 'var(--accent-lavender)' } : {}}
                  className={`p-2 border-2 ${isActive ? 'border-border shadow-shadow-sm' : 'border-transparent'}`}
                >
                  <Icon size={14} />
                </button>
              )
            })}
          </nav>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            style={{ background: 'var(--accent-peach)' }}
            className="border-2 border-border shadow-shadow-sm p-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════ */}
      {/* HERO - asymmetric brutalist grid              */}
      {/* ══════════════════════════════════════════════ */}
      <section id="home" className="px-5 py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">

          {/* Top row: dateline sticker + availability */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <Sticker rotate={-3}>Kuala Lumpur · Est. 2023</Sticker>
            <Sticker rotate={2} bg="var(--accent-lavender)">
              <span className="inline-block w-2 h-2 bg-green-600 border border-border mr-2 align-middle" />
              Available For Hire
            </Sticker>
          </div>

          {/* Name block - stamps onto the page: starts oversized + over-rotated,
              squishes through neutral, settles at scale 1 / -1° tilt. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.15, rotate: -3 }}
            animate={{ opacity: 1, scale: [1.15, 0.97, 1], rotate: [-3, -0.5, -1] }}
            transition={{
              duration: 0.55,
              times: [0, 0.65, 1],
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.18 },
            }}
            style={{ background: 'var(--main)' }}
            className="border-4 border-border shadow-shadow-lg px-6 md:px-10 py-6 md:py-10 mb-10 md:mb-14"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-black mb-2 opacity-70">Portfolio of</p>
            <h1 className="font-display uppercase leading-[0.85]" style={{ fontSize: 'clamp(54px, 13vw, 180px)', letterSpacing: '-0.02em' }}>
              Ikhmal<br />Haziq
            </h1>
          </motion.div>

          {/* Role + bio + CTAs row */}
          <div className="grid md:grid-cols-12 gap-5 mb-12 md:mb-16">

            {/* Role card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{ background: 'var(--accent-lavender)', transform: 'rotate(-1.5deg)' }}
              className="md:col-span-4 border-2 border-border shadow-shadow p-5"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-2 opacity-70">Role</p>
              <p className="font-display text-2xl leading-tight uppercase">Fullstack Developer, Shopify & DevOps</p>
              <p className="mt-3 text-xs">Meekco.Asia · Kuala Lumpur</p>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              style={{ background: 'var(--secondary-background)' }}
              className="md:col-span-5 border-2 border-border shadow-shadow p-5"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-2 opacity-70">Profile</p>
              <p className="text-sm leading-relaxed">
                Fullstack developer specializing in <b>Shopify commerce</b>, <b>enterprise
                system integration</b> and <b>DevOps</b>. Ship most projects end-to-end.
                <b> CKA certified.</b>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="md:col-span-3 flex flex-col gap-3"
            >
              <Button asChild className="w-full justify-between">
                <a href="mailto:ikhmalhaziq2907@gmail.com">
                  <span className="flex items-center gap-2"><FaEnvelope size={11} /> Email</span>
                  <ArrowUpRight size={14} />
                </a>
              </Button>
              <Button asChild variant="neutral" className="w-full justify-between">
                <a href="https://github.com/HaziqLucii" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2"><FaGithub size={11} /> GitHub</span>
                  <ArrowUpRight size={14} />
                </a>
              </Button>
              <Button asChild variant="neutral" className="w-full justify-between">
                <a href="https://linkedin.com/in/haziq-luffy" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2"><FaLinkedin size={11} /> LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Stats row - colored cards, alternating tilt */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            <StatBlock value="3"   suffix="+" label="Years as Developer" bg="var(--main)"            rotate={-1.5} />
            <StatBlock value="13"  suffix=""  label="Client Stores"     bg="var(--accent-peach)"   rotate={1.5}  />
            <StatBlock value="70"  suffix="+" label="Store Customizations" bg="var(--accent-sky)"  rotate={-1}   />
            <StatBlock value="CKA" suffix=""  label="Certified"         bg="var(--accent-lavender)" rotate={2}   />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* MARQUEE - keyword ticker                       */}
      {/* ══════════════════════════════════════════════ */}
      <Marquee items={[
        '◆ SHOPIFY',
        '◆ SAP INTEGRATION',
        '◆ ACTIVEPIECES',
        '◆ DEVOPS',
        '◆ CKA CERTIFIED',
        '◆ KUBERNETES',
        '◆ GADGET',
        '◆ REACT',
        '◆ HARO',
        '◆ AI ORCHESTRATION',
        '◆ KUALA LUMPUR',
      ]} />

      {/* ══════════════════════════════════════════════ */}
      {/* ABOUT - Section 02                              */}
      {/* ══════════════════════════════════════════════ */}
      <section id="about" className="px-5 py-24 relative">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Sticker rotate={-3} bg="var(--main)">Section 02</Sticker>
            <Sticker rotate={2} bg="var(--accent-lavender)">Background</Sticker>
          </div>
          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display uppercase leading-[0.85] mb-12"
            style={{ fontSize: 'clamp(44px, 12vw, 140px)', letterSpacing: '-0.02em' }}
          >
            About
          </motion.h2>

          {/* Portrait + bio + meta grid */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 mb-14 items-start">

            {/* Portrait - already brutalist-framed, displayed bare with a sticker caption */}
            <motion.div
              initial={{ opacity: 0, y: 12, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 lg:col-span-4 flex flex-col items-start"
            >
              <img
                src="/me-in-neo-brutalism-frame.png"
                alt="Ikhmal Haziq"
                className="w-full max-w-[360px] mx-auto block select-none pointer-events-none"
                draggable={false}
              />
              <div className="self-center -mt-2 relative z-10">
                <Sticker rotate={3} bg="var(--main)">Ikhmal · Est. 1999</Sticker>
              </div>
            </motion.div>

            {/* Right column - bio + meta */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ background: 'var(--secondary-background)' }}
                className="border-2 border-border shadow-shadow p-6 md:p-8"
              >
                <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-3 opacity-60">Bio</p>
                <p className="font-display text-2xl md:text-3xl leading-tight mb-4 uppercase">
                  "Full-lifecycle Shopify & integration engineer, shipping most projects end-to-end."
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  Fullstack developer specializing in <b>Shopify commerce</b>, <b>enterprise system
                  integration</b>, and <b>DevOps</b>. Currently at Meekco.Asia, where I was appointed
                  by the CTO as Person-In-Charge of a bidirectional <b>SAP Business One to Shopify</b>{' '}
                  integration spanning 12 data domains, leading a lean development team.
                </p>
                <p className="text-sm leading-relaxed">
                  Experienced across web and mobile development, self-hosted infrastructure, and cloud
                  orchestration. <b>Certified Kubernetes Administrator (CKA)</b> with a strong foundation
                  in containerization, automation, and scalable system design.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{ background: 'var(--accent-peach)', transform: 'rotate(-1deg)' }}
                  className="border-2 border-border shadow-shadow p-5"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-2 opacity-70">Education</p>
                  <p className="font-display text-lg uppercase leading-tight">Diploma · Cyber Forensics</p>
                  <p className="text-xs mt-2">Cybernetics International College of Technologies · 2018-2020</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ background: 'var(--accent-sky)', transform: 'rotate(1.5deg)' }}
                  className="border-2 border-border shadow-shadow p-5"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-2 opacity-70">Based In</p>
                  <p className="font-display text-lg uppercase leading-tight">Ampang, KL</p>
                  <p className="text-xs mt-2">Malaysia · GMT+8</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Employment history accordion */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <Sticker rotate={-2} bg="var(--main)">Employment History</Sticker>
            <span className="text-xs tracking-[0.25em] uppercase opacity-50">2020 / Present</span>
          </div>
          <Accordion type="single" collapsible defaultValue={experiences[0].id} className="flex flex-col gap-4">
            {experiences.map((exp, i) => {
              const triggerBgs = ['var(--main)', 'var(--accent-lavender)', 'var(--accent-peach)']
              return (
                <AccordionItem key={exp.id} value={exp.id} style={{ background: 'var(--secondary-background)' }}>
                  <AccordionTrigger
                    style={{ background: triggerBgs[i % triggerBgs.length] }}
                    className="px-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-left">
                      <span className="font-display text-base uppercase">{exp.title}</span>
                      <span className="text-xs tracking-[0.2em] uppercase opacity-70">@ {exp.company} · {exp.period}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4">
                    <p className="text-xs tracking-[0.2em] uppercase mb-3 opacity-60">{exp.location}</p>
                    <p className="text-sm leading-relaxed">{exp.description}</p>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PROJECTS - Section 03                          */}
      {/* ══════════════════════════════════════════════ */}
      <section id="projects" className="px-5 py-24 relative border-t-4 border-border" style={{ background: 'var(--accent-cream)' }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Sticker rotate={-3} bg="var(--accent-peach)">Section 03</Sticker>
            <Sticker rotate={2} bg="var(--main)">Featured Work</Sticker>
          </div>
          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display uppercase leading-[0.85] mb-12"
            style={{ fontSize: 'clamp(44px, 12vw, 140px)', letterSpacing: '-0.02em' }}
          >
            Projects
          </motion.h2>

          {/* Featured project */}
          {(() => {
            const f = projectsData[0]
            return (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ background: 'var(--main)' }}
                className="border-4 border-border shadow-shadow-lg p-6 md:p-8 mb-12"
              >
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-black opacity-70">Featured · 01</span>
                  <Badge variant="neutral">{f.label}</Badge>
                  <span className="text-xs ml-auto opacity-70">{f.period}</span>
                </div>
                <h3 className="font-display text-3xl md:text-5xl uppercase leading-[0.9] mb-4">{f.title}</h3>
                <p className="text-sm md:text-base leading-relaxed mb-5 max-w-3xl">{f.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {f.highlights.map((h, hi) => (
                    <span key={hi} className="bg-secondary-background text-foreground border-2 border-border text-xs px-2 py-1 font-bold">
                      ★ {h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {f.tech.map((t, ti) => (
                    <Badge key={ti} variant="neutral" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </motion.div>
            )
          })()}

          {/* Rest of projects - 2-col grid alternating tilt + accent */}
          <div className="grid md:grid-cols-2 gap-6">
            {projectsData.slice(1).map((p, idx) => {
              // 4-color rotation so no two adjacent cards share a color
              const palette = ['var(--accent-lavender)', 'var(--accent-peach)', 'var(--accent-sky)', 'var(--secondary-background)']
              const rotate = idx % 2 === 0 ? -0.7 : 0.7
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 2) * 0.08 }}
                  style={{ background: palette[idx % palette.length], transform: `rotate(${rotate}deg)` }}
                  className="border-2 border-border shadow-shadow p-5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <span className="font-display text-2xl opacity-30">{String(idx + 2).padStart(2, '0')}</span>
                    <Badge variant="neutral" className="text-[10px]">{p.label}</Badge>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl uppercase leading-tight mb-3">{p.title}</h3>
                  <p className="text-xs leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 6).map((t, ti) => (
                      <span key={ti} className="text-[10px] border-2 border-border bg-secondary-background text-foreground px-1.5 py-0.5 font-bold">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 6 && (
                      <span className="text-[10px] px-1.5 py-0.5 font-bold opacity-50">+{p.tech.length - 6}</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Personal projects */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <Sticker rotate={-1} bg="var(--accent-lavender)">Personal Projects</Sticker>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {personalProjectsData.map((p, idx) => {
                const clickable = !!(p.href || p.internal)
                const anim = {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: idx * 0.05 },
                }
                const cardStyle = { background: 'var(--secondary-background)', transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)` }
                const cardCls = `block h-full border-2 border-border shadow-shadow p-5 ${clickable ? 'cursor-pointer hover:shadow-none transition-shadow' : ''}`
                const content = (
                  <>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-display text-lg uppercase leading-tight flex items-center gap-1.5">
                        {p.title}
                        {p.href && <ArrowUpRight size={14} className="opacity-60" />}
                      </h3>
                      <span className="text-[10px] opacity-60 shrink-0">{p.period}</span>
                    </div>
                    <p className="text-xs leading-relaxed mb-3">{p.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tech.map((t, ti) => (
                        <span key={ti} className="text-[10px] border-2 border-border bg-secondary-background text-foreground px-1.5 py-0.5 font-bold">{t}</span>
                      ))}
                    </div>
                    {p.internal && (
                      <span style={{ background: 'var(--main)', color: 'var(--main-foreground)' }} className="inline-flex items-center gap-1 mt-3 text-[10px] tracking-[0.15em] uppercase font-black border-2 border-border px-2 py-1">
                        ★ See spotlight below
                      </span>
                    )}
                    {p.href && (
                      <span style={{ background: 'var(--accent-sky)' }} className="inline-flex items-center gap-1 mt-3 text-[10px] tracking-[0.15em] uppercase font-black border-2 border-border px-2 py-1">
                        Visit site
                      </span>
                    )}
                  </>
                )
                if (p.href) {
                  return (
                    <motion.a key={idx} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} (opens in a new tab)`} {...anim} style={cardStyle} className={cardCls}>
                      {content}
                    </motion.a>
                  )
                }
                if (p.internal) {
                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => document.getElementById(p.internal)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      aria-label={`${p.title} (jump to spotlight)`}
                      {...anim}
                      style={cardStyle}
                      className={`${cardCls} w-full text-left`}
                    >
                      {content}
                    </motion.button>
                  )
                }
                return (
                  <motion.div key={idx} {...anim} style={cardStyle} className={cardCls}>
                    {content}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* HARO - Spotlight (own product)                 */}
      {/* ══════════════════════════════════════════════ */}
      <section id="haro" className="px-5 py-24 relative border-t-4 border-border" style={{ background: 'var(--secondary-background)' }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Sticker rotate={-3} bg="var(--main)">★ Spotlight</Sticker>
            <Sticker rotate={2} bg="var(--accent-lavender)">Own Product</Sticker>
            <Sticker rotate={-2} bg="var(--accent-sky)">Linux-First</Sticker>
          </div>
          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display lowercase leading-[0.85] mb-3"
            style={{ fontSize: 'clamp(44px, 12vw, 140px)', letterSpacing: '-0.03em' }}
          >
            haro<span style={{ color: 'var(--main)', WebkitTextStroke: '2px var(--border)' }}>.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-lg max-w-2xl mb-10 leading-relaxed font-bold"
          >
            A local-first, Linux-first orchestrator for AI coding agents. Designed and
            engineered end-to-end, from zero.
          </motion.p>

          {/* Intro: green feature card + highlights */}
          <div className="grid md:grid-cols-12 gap-6 mb-10 items-stretch">

            {/* Green feature card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ background: 'var(--main)', color: 'var(--main-foreground)' }}
              className="md:col-span-7 border-4 border-border shadow-shadow-lg p-6 md:p-8 flex flex-col"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-3 opacity-70">What it is</p>
              <p className="text-sm md:text-base leading-relaxed mb-5">
                Runs multiple AI coding agents <b>in parallel</b>, each isolated in its own{' '}
                <b>git worktree</b>, behind an <b>automatic test gate</b>: no agent's work is
                mergeable until its tests pass. You watch it happen live in <b>one window</b>:
                agent stream, Monaco editor, terminal, live preview, and the gate. Then commit,
                merge, and ship.
              </p>

              {/* North star callout */}
              <div
                style={{ background: 'var(--secondary-background)', color: 'var(--foreground)' }}
                className="border-2 border-border shadow-shadow-sm p-4 mt-auto"
              >
                <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-2 opacity-60">★ North Star</p>
                <p className="font-display text-base md:text-lg leading-tight uppercase">
                  "No work is mergeable until the gate is green, and you can watch it happen."
                </p>
              </div>

              <div className="mt-5">
                <Button asChild variant="neutral" className="w-full sm:w-auto justify-between">
                  <a href="mailto:ikhmalhaziq2907@gmail.com?subject=haro%20%E2%80%94%20interested">
                    <span className="flex items-center gap-2"><FaEnvelope size={12} /> Interested? Email me to join</span>
                    <ArrowUpRight size={14} />
                  </a>
                </Button>
                <p className="text-[11px] mt-2 opacity-70 font-bold">Private project · a walkthrough or collaboration is available on request.</p>
              </div>
            </motion.div>

            {/* Highlights grid */}
            <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Parallel Agents', 'Many at once, each in its own worktree', 'var(--accent-lavender)'],
                ['Automatic Test Gate', 'Vitest · pytest · lint. No merge till green', 'var(--accent-peach)'],
                ['One-Window Cockpit', 'Agent · editor · terminal · preview · git', 'var(--accent-sky)'],
                ['Worktree Isolation', 'Every agent boxed in a disposable branch', 'var(--accent-peach)'],
                ['Bring-Your-Own-Agent', 'Claude Code, or a local Ollama model', 'var(--accent-sky)'],
                ['Local-First', 'SQLite + local git · no cloud OAuth', 'var(--accent-lavender)'],
              ].map(([t, d, bg], i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  style={{ background: bg }}
                  className="border-2 border-border shadow-shadow p-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <p className="font-display text-sm md:text-base uppercase leading-tight">{t}</p>
                  <p className="text-[11px] mt-1.5 leading-snug opacity-80">{d}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-12">
            {['Python', 'FastAPI', 'asyncio', 'React', 'TypeScript', 'Vite', 'WebSockets', 'SQLite', 'Electron', 'Monaco', 'xterm.js', 'Vitest', 'Git Worktrees'].map((t, i) => (
              <Badge key={i} variant="neutral" className="text-[10px]">{t}</Badge>
            ))}
          </div>

          {/* Screenshot carousel */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Sticker rotate={-1} bg="var(--accent-peach)">Inside the cockpit</Sticker>
            <span className="text-xs tracking-[0.25em] uppercase opacity-50">Live screenshots · click to zoom</span>
          </div>
          <ScreenshotShowcase slides={HARO_SLIDES} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SKILLS - Section 04                            */}
      {/* ══════════════════════════════════════════════ */}
      <section id="skills" className="px-5 py-24 relative border-t-4 border-border">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Sticker rotate={-3} bg="var(--accent-sky)">Section 04</Sticker>
            <Sticker rotate={2} bg="var(--main)">Stack</Sticker>
          </div>
          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display uppercase leading-[0.85] mb-12"
            style={{ fontSize: 'clamp(44px, 12vw, 140px)', letterSpacing: '-0.02em' }}
          >
            Skills
          </motion.h2>

          {/* Category cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((category, ci) => {
              const palette = ['var(--main)', 'var(--accent-lavender)', 'var(--accent-peach)', 'var(--accent-sky)', 'var(--main)', 'var(--accent-lavender)', 'var(--accent-peach)']
              const rotate = ci % 2 === 0 ? -0.5 : 0.5
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: ci * 0.05 }}
                  style={{ background: palette[ci % palette.length], transform: `rotate(${rotate}deg)` }}
                  className="border-2 border-border shadow-shadow p-5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <p className="font-display text-2xl uppercase mb-4 leading-none">{category.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, ii) => (
                      <span
                        key={ii}
                        className="inline-flex items-center gap-1.5 bg-secondary-background text-foreground border-2 border-border px-2 py-1 text-xs font-bold"
                      >
                        {item.icon && (
                          <img
                            src={item.icon}
                            alt={item.name}
                            className={`h-3.5 w-auto ${item.invert ? 'dark:invert ' : ''}${item.invertLight ? 'invert dark:invert-0' : ''}`}
                          />
                        )}
                        {item.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* CONTACT - Section 05                           */}
      {/* ══════════════════════════════════════════════ */}
      <section id="contact" className="px-5 py-24 relative border-t-4 border-border" style={{ background: 'var(--accent-cream)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: 'var(--main)' }}
            className="border-4 border-border shadow-shadow-lg p-5 sm:p-8 md:p-14 relative"
          >
            {/* Sticker top-left */}
            <div className="absolute -top-4 -left-2 md:-top-5 md:-left-4">
              <Sticker rotate={-5} bg="var(--accent-lavender)">Section 05 · Contact</Sticker>
            </div>

            <h2
              className="font-display uppercase leading-[0.85] mb-6"
              style={{ fontSize: 'clamp(38px, 11vw, 140px)', letterSpacing: '-0.02em' }}
            >
              Let's<br />Work Together
            </h2>
            <p className="text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Building Shopify apps, ERP integrations, and self-hosted infrastructure end-to-end.
              If you have a commerce, integration, or DevOps challenge, let's talk.
            </p>

            {/* Primary CTA */}
            <div className="mb-8">
              <Button asChild size="lg" variant="neutral" className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-8">
                <a href="mailto:ikhmalhaziq2907@gmail.com" className="min-w-0">
                  <FaEnvelope size={14} className="mr-2 shrink-0" />
                  <span className="hidden sm:inline truncate">ikhmalhaziq2907@gmail.com</span>
                  <span className="sm:hidden">Email Me</span>
                  <ArrowUpRight size={16} className="ml-2 shrink-0" />
                </a>
              </Button>
            </div>

            {/* Socials */}
            <div className="flex gap-3 flex-wrap">
              <Button asChild variant="neutral" size="sm">
                <a href="https://github.com/HaziqLucii" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={12} className="mr-1.5" /> GitHub
                </a>
              </Button>
              <Button asChild variant="neutral" size="sm">
                <a href="https://linkedin.com/in/haziq-luffy" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={12} className="mr-1.5" /> LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-border py-6 mt-12">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2026 Ikhmal Haziq</p>
          <p>Built with React + Neobrutalism.dev</p>
        </div>
      </footer>
    </div>
  )
}
