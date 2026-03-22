import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Counter from './Components/Counter/Counter';
import { projectsData, personalProjectsData } from './data/projects';
import { navItems } from './data/navigation';
import { skills } from './data/skills';
import { experiences } from './data/experiences';
import Clock from './Components/Clock/Clock';
import Weather from './Components/Weather/Weather';

/* ─── Fade-up wrapper ──────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated reveal line ─────────────────────────── */
function RevealLine({ delay = 0, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`} style={{ height: '1px', background: 'var(--border)' }}>
      <motion.div
        style={{ height: '1px', background: 'var(--bdr-s)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─── Section label ────────────────────────────────── */
function SectionLabel({ number, title }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-5">
        <span className="text-xs tracking-[0.5em]" style={{ color: 'var(--fg-3)' }}>
          {number}
        </span>
        <RevealLine className="flex-1" />
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold">
        {title}
      </h2>
    </div>
  );
}

/* ─── Scroll timeline (B&W) ────────────────────────── */
const SECTIONS = [
  { id: 'home',     label: '01' },
  { id: 'about',    label: '02' },
  { id: 'projects', label: '03' },
  { id: 'skills',   label: '04' },
];

function ScrollTimeline({ activeSection }) {
  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      {SECTIONS.map((section, i) => (
        <div key={section.id} className="flex flex-col items-center">
          {i > 0 && (
            <div className="w-px h-14 relative" style={{ background: 'var(--border)' }}>
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{ background: 'var(--fg)' }}
                initial={{ height: '0%' }}
                animate={{ height: i <= activeIndex ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
          <button
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1.5"
            aria-label={`Go to ${section.label}`}
          >
            <motion.div
              className="w-1.5 h-1.5"
              animate={{
                backgroundColor: i === activeIndex ? '#ffffff' : i < activeIndex ? '#555555' : '#222222',
                scale: i === activeIndex ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="text-[9px] tracking-[0.35em]"
              style={{ fontFamily: 'Space Mono, monospace' }}
              animate={{
                color: i === activeIndex ? '#ffffff' : '#444444',
                opacity: i === activeIndex ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            >
              {section.label}
            </motion.span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = ['home', 'about', 'projects', 'skills'];
      const scrollY = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ color: 'var(--fg)' }}>

      {/* ── Scroll Timeline ─────────────────────────── */}
      <ScrollTimeline activeSection={activeSection} />

      {/* ── Widgets (desktop) ───────────────────────── */}
      <div className="fixed top-[72px] left-4 z-40 hidden lg:block">
        <div className="px-4 py-3 w-[148px]"
          style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5 tracking-[0.3em] uppercase" style={{ color: 'var(--fg-3)' }}>Time</div>
          <Clock />
        </div>
      </div>

      <div className="fixed top-[168px] left-4 z-40 hidden lg:block group">
        <div className="px-4 py-3 w-[148px] relative"
          style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5 tracking-[0.3em] uppercase" style={{ color: 'var(--fg-3)' }}>Weather</div>
          <Weather />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            <div className="text-xs px-3 py-1.5 whitespace-nowrap"
              style={{ background: 'var(--bg-3)', color: 'var(--fg-3)', border: '1px solid var(--border)' }}>
              Source: data.gov.my
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-display text-sm font-bold italic tracking-tight transition-opacity hover:opacity-60"
          >
            IH
          </button>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center">
            {navItems.map((item, i) => {
              const isActive = item.sectionId === activeSection;
              return (
                <button
                  key={i}
                  onClick={item.onClick}
                  className="relative px-4 py-4 text-xs tracking-[0.28em] uppercase transition-colors duration-200"
                  style={{ color: isActive ? 'var(--fg)' : 'var(--fg-3)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-3 left-4 right-4 h-px"
                      style={{ background: 'var(--fg)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile nav */}
          <nav className="flex sm:hidden items-center gap-1">
            {navItems.map((item, i) => {
              const Icon = item.iconComponent;
              const isActive = item.sectionId === activeSection;
              return (
                <button
                  key={i}
                  onClick={item.onClick}
                  className="p-2.5 transition-colors duration-200"
                  style={{ color: isActive ? 'var(--fg)' : 'var(--fg-3)' }}
                >
                  <Icon size={14} />
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════ */}
      {/* HERO                                          */}
      {/* ══════════════════════════════════════════════ */}
      <section
        id="home"
        className="md:min-h-screen flex items-start md:items-center relative px-6 pt-24 pb-16 md:py-0 md:pt-14"
      >
        {/* Ghost section number */}
        <div
          className="absolute left-0 bottom-0 font-display font-black select-none pointer-events-none"
          style={{
            fontSize: 'clamp(180px, 28vw, 360px)',
            lineHeight: 0.85,
            color: 'rgba(255,255,255,0.022)',
            letterSpacing: '-0.05em',
          }}
        >
          00
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px w-10" style={{ background: 'var(--fg)' }} />
            <span className="text-xs tracking-[0.45em] uppercase" style={{ color: 'var(--fg-2)' }}>
              Fullstack Web Developer
            </span>
          </motion.div>

          {/* Name — masked wipe-up reveal */}
          <div className="mb-8">
            <div className="overflow-hidden">
              <motion.h1
                className="font-display font-black italic leading-none"
                style={{
                  fontSize: 'clamp(56px, 12vw, 160px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                }}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                Ikhmal
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="font-display font-black leading-none"
                style={{
                  fontSize: 'clamp(56px, 12vw, 160px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  color: 'var(--fg-3)',
                }}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.52, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                Haziq
              </motion.h1>
            </div>
          </div>

          {/* Divider + tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12"
          >
            <div className="h-px w-full sm:w-48" style={{ background: 'var(--bdr-m)' }} />
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--fg-2)' }}>
              Web & mobile development, DevOps,<br />
              and cloud systems. Based in Kuala Lumpur.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap items-center gap-5 mt-12"
          >
            <a
              href="mailto:ikhmalhaziq2907@gmail.com"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-200 hover:opacity-75"
              style={{ background: 'var(--fg)', color: 'var(--bg)' }}
            >
              <FaEnvelope size={11} />
              <span className="hidden sm:inline">ikhmalhaziq2907@gmail.com</span>
              <span className="sm:hidden">Get In Touch</span>
            </a>
            <div className="flex items-center gap-5" style={{ color: 'var(--fg-3)' }}>
              <a href="https://github.com/HaziqLucii" target="_blank" rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-white">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/haziq-luffy" target="_blank" rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-white">
                <FaLinkedin size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* STATS                                         */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}
          >
            {[
              { end: 2,  suffix: '+', label: 'Years Experience' },
              { end: 5,  suffix: '+', label: 'Projects Completed' },
              { end: 1,  suffix: '',  label: 'Team Leadership' },
              { end: 2,  suffix: '',  label: 'Certifications' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="py-10 px-8 cursor-default group"
                style={{
                  borderRight: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Counter
                  endValue={stat.end}
                  suffix={stat.suffix}
                  className="font-display text-5xl md:text-6xl font-black block mb-2"
                  duration={1.8}
                />
                <p className="text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--fg-3)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* ABOUT                                         */}
      {/* ══════════════════════════════════════════════ */}
      <section id="about" className="py-28 relative">
        {/* Ghost number */}
        <div
          className="absolute right-0 top-8 font-display font-black select-none pointer-events-none"
          style={{
            fontSize: 'clamp(120px, 18vw, 260px)',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.022)',
            letterSpacing: '-0.05em',
          }}
        >
          01
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionLabel number="01" title="About" />

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Bio */}
            <FadeUp>
              <p className="text-sm leading-[2] mb-6" style={{ color: 'var(--fg-2)' }}>
                Experienced Fullstack Developer & Technical Lead with a strong background
                in web and mobile development, DevOps, and geospatial systems. Passionate
                about delivering scalable and efficient solutions.
              </p>
              <p className="text-sm leading-[2] mb-10" style={{ color: 'var(--fg-2)' }}>
                Holds a Certified Kubernetes Administrator (CKA) certification, showcasing
                expertise in containerization and cloud orchestration. Adept at mentoring
                developers, leading projects, and optimizing system performance.
              </p>
              <div
                className="grid grid-cols-2 gap-6 pt-8"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div>
                  <h4 className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--fg-3)' }}>
                    Education
                  </h4>
                  <p className="text-sm mb-1">Diploma in Cyber Forensics</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                    Cybernetics International College
                  </p>
                </div>
                <div>
                  <h4 className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--fg-3)' }}>
                    Location
                  </h4>
                  <p className="text-sm mb-1">Ampang, Kuala Lumpur</p>
                  <p className="text-xs" style={{ color: 'var(--fg-2)' }}>Malaysia</p>
                </div>
              </div>
            </FadeUp>

            {/* Experience list */}
            <div>
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="py-6 relative"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  {/* Left accent bar (animated on mount) */}
                  <motion.div
                    className="absolute left-0 top-6 bottom-6 w-px"
                    style={{ background: 'var(--fg)' }}
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                  />
                  <div className="pl-5">
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <h3 className="font-display text-lg font-bold">{exp.title}</h3>
                      <span className="text-xs shrink-0 mt-1" style={{ color: 'var(--fg-3)' }}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs tracking-[0.22em] uppercase mb-3" style={{ color: 'var(--fg-2)' }}>
                      {exp.company} — {exp.location}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-3)' }}>
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FEATURED PROJECTS                             */}
      {/* ══════════════════════════════════════════════ */}
      <section id="projects" className="py-28 relative">
        <div
          className="absolute left-0 top-8 font-display font-black select-none pointer-events-none"
          style={{
            fontSize: 'clamp(120px, 18vw, 260px)',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.022)',
            letterSpacing: '-0.05em',
          }}
        >
          02
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionLabel number="02" title="Featured Projects" />

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05, duration: 0.45 }}
                className="group py-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-10 cursor-default relative"
                style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s', paddingLeft: '0' }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '20px'; }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0px'; }}
              >
                {/* Left accent bar on hover */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100"
                  style={{ background: 'var(--fg)', transition: 'opacity 0.2s' }}
                />

                {/* Number */}
                <span
                  className="font-display text-3xl font-black shrink-0 mt-1"
                  style={{ color: 'var(--bg-3)', WebkitTextStroke: '1px var(--border)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-display text-xl font-bold">{project.title}</h3>
                    <span
                      className="text-xs tracking-[0.2em] uppercase px-2.5 py-1"
                      style={{ border: '1px solid var(--border)', color: 'var(--fg-2)' }}
                    >
                      {project.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-2)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((tech, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-2 py-0.5"
                        style={{ border: '1px solid var(--border)', color: 'var(--fg-3)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {project.highlights.map((h, hi) => (
                      <div key={hi} className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg-3)' }}>
                        <span>—</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Period */}
                <span className="text-xs shrink-0 mt-1" style={{ color: 'var(--fg-3)' }}>
                  {project.period}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PERSONAL PROJECTS                             */}
      {/* ══════════════════════════════════════════════ */}
      <section className="pb-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs tracking-[0.5em]" style={{ color: 'var(--fg-3)' }}>02b</span>
              <RevealLine className="flex-1" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Personal Projects</h2>
          </div>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {personalProjectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05, duration: 0.45 }}
                className="group py-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-10 cursor-default relative"
                style={{ borderBottom: '1px solid var(--border)', transition: 'padding-left 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '20px'; }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0px'; }}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100"
                  style={{ background: 'var(--fg)', transition: 'opacity 0.2s' }}
                />

                <span
                  className="font-display text-3xl font-black shrink-0 mt-1"
                  style={{ color: 'var(--bg-3)', WebkitTextStroke: '1px var(--border)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-display text-xl font-bold">{project.title}</h3>
                    <span
                      className="text-xs tracking-[0.2em] uppercase px-2.5 py-1"
                      style={{ border: '1px solid var(--border)', color: 'var(--fg-2)' }}
                    >
                      {project.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-2)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((tech, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-2 py-0.5"
                        style={{ border: '1px solid var(--border)', color: 'var(--fg-3)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {project.highlights.map((h, hi) => (
                      <div key={hi} className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg-3)' }}>
                        <span>—</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                <span className="text-xs shrink-0 mt-1" style={{ color: 'var(--fg-3)' }}>
                  {project.period}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SKILLS                                        */}
      {/* ══════════════════════════════════════════════ */}
      <section id="skills" className="py-28 relative">
        <div
          className="absolute right-0 top-8 font-display font-black select-none pointer-events-none"
          style={{
            fontSize: 'clamp(120px, 18vw, 260px)',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.022)',
            letterSpacing: '-0.05em',
          }}
        >
          03
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionLabel number="03" title="Technical Skills" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, si) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="skill-card p-5"
              >
                <h3 className="skill-card-title text-xs tracking-[0.35em] uppercase mb-5">
                  {skill.name}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {skill.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="skill-item flex flex-col items-center gap-2 py-3 px-2"
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="skill-icon h-7 w-auto max-w-[72px] object-contain"
                        />
                      ) : (
                        <div className="skill-icon w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <span className="skill-item-label text-xs text-center leading-tight">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* CONTACT                                       */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <RevealLine className="mb-16" />
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <div>
                <p className="text-xs tracking-[0.45em] uppercase mb-6" style={{ color: 'var(--fg-3)' }}>
                  — Open to opportunities
                </p>
                <h2
                  className="font-display font-black leading-none mb-0"
                  style={{ fontSize: 'clamp(48px, 8vw, 110px)', letterSpacing: '-0.03em' }}
                >
                  Let's<br />
                  <span className="italic" style={{ color: 'var(--fg-2)' }}>Work</span><br />
                  Together
                </h2>
              </div>
              <div>
                <p className="text-sm leading-[1.9] mb-8" style={{ color: 'var(--fg-2)' }}>
                  Ready to bring your ideas to life with cutting-edge technology
                  and proven expertise in fullstack development and cloud systems.
                </p>
                <a
                  href="mailto:ikhmalhaziq2907@gmail.com"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-200 hover:opacity-75 w-full sm:w-auto"
                  style={{ background: 'var(--fg)', color: 'var(--bg)' }}
                >
                  <FaEnvelope size={12} />
                  <span className="hidden sm:inline">ikhmalhaziq2907@gmail.com</span>
                  <span className="sm:hidden">Get In Touch</span>
                </a>

                <div className="flex items-center gap-6 mt-6" style={{ color: 'var(--fg-3)' }}>
                  <a href="https://github.com/HaziqLucii" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-white">
                    <FaGithub size={15} />
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/haziq-luffy" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-white">
                    <FaLinkedin size={15} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="py-8 relative" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>
            © 2025 Ikhmal Haziq
          </p>
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>
            Built with React + Motion
          </p>
        </div>
      </footer>

    </div>
  );
}
