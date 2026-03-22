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

/* ─── Newspaper ink-bleed link ─────────────────────── */
/*
  Background floods in from left (scaleX 0→1) on hover,
  like ink soaking into newsprint. Text inverts to black
  slightly after the fill starts — making the link feel
  like a rubber stamp impression.
*/
function InkLink({ href, icon: Icon, children, target, rel }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="relative inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase overflow-hidden px-2 py-1.5 -mx-2 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ink fill — slides in from left */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--fg)', transformOrigin: 'left', zIndex: 0 }}
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Icon */}
      <motion.span
        className="relative z-10 shrink-0"
        animate={{ color: hovered ? 'var(--bg)' : 'var(--fg-3)' }}
        transition={{ duration: 0.12, delay: hovered ? 0.08 : 0 }}
      >
        {Icon && <Icon size={11} />}
      </motion.span>
      {/* Label */}
      <motion.span
        className="relative z-10"
        animate={{ color: hovered ? 'var(--bg)' : 'var(--fg)' }}
        transition={{ duration: 0.12, delay: hovered ? 0.08 : 0 }}
      >
        {children}
      </motion.span>
    </a>
  );
}

/* ─── Animated scaleX rule ─────────────────────────── */
function Rule({ delay = 0, thick = false, color = 'var(--border)' }) {
  return (
    <div style={{ height: thick ? '3px' : '1px', background: color, overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', background: thick ? 'var(--fg)' : 'var(--bdr-s)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─── Fade-up ───────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scroll dots ───────────────────────────────────── */
const SECTIONS = [
  { id: 'home',     label: '01' },
  { id: 'about',    label: '02' },
  { id: 'projects', label: '03' },
  { id: 'skills',   label: '04' },
];

function ScrollDots({ activeSection }) {
  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      {SECTIONS.map((section, i) => (
        <div key={section.id} className="flex flex-col items-center">
          {i > 0 && (
            <div className="w-px h-12 relative" style={{ background: 'var(--border)' }}>
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{ background: 'var(--fg)' }}
                initial={{ height: '0%' }}
                animate={{ height: i <= activeIndex ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
          <button
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1"
            aria-label={section.label}
          >
            <motion.div
              style={{ borderRadius: 0 }}
              animate={{
                width: i === activeIndex ? '8px' : '4px',
                height: i === activeIndex ? '8px' : '4px',
                backgroundColor: i === activeIndex ? '#fff' : i < activeIndex ? '#555' : '#222',
              }}
              transition={{ duration: 0.25 }}
            />
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
      const ids = ['home', 'about', 'projects', 'skills'];
      const scrollY = window.scrollY + 120;
      for (const id of ids) {
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

  const [featured, ...restProjects] = projectsData;

  return (
    <div className="min-h-screen" style={{ color: 'var(--fg)' }}>

      {/* ── Scroll dots ──────────────────────────────── */}
      <ScrollDots activeSection={activeSection} />

      {/* ── Widgets ──────────────────────────────────── */}
      <div className="fixed top-[72px] left-4 z-40 hidden lg:block">
        <div className="px-4 py-3 w-[148px]" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5 tracking-[0.3em] uppercase" style={{ color: 'var(--fg-3)' }}>Time</div>
          <Clock />
        </div>
      </div>
      <div className="fixed top-[168px] left-4 z-40 hidden lg:block group">
        <div className="px-4 py-3 w-[148px] relative" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5 tracking-[0.3em] uppercase" style={{ color: 'var(--fg-3)' }}>Weather</div>
          <Weather />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            <div className="text-xs px-3 py-1.5 whitespace-nowrap" style={{ background: 'var(--bg-3)', color: 'var(--fg-3)', border: '1px solid var(--border)' }}>
              Source: data.gov.my
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.94)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-12">
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-display text-sm font-black italic tracking-tight transition-opacity hover:opacity-55"
          >
            IH
          </button>
          <nav className="hidden sm:flex items-center">
            {navItems.map((item, i) => {
              const isActive = item.sectionId === activeSection;
              return (
                <button key={i} onClick={item.onClick}
                  className="relative px-4 py-3.5 text-xs tracking-[0.28em] uppercase transition-colors duration-200"
                  style={{ color: isActive ? 'var(--fg)' : 'var(--fg-3)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div layoutId="nav-line"
                      className="absolute bottom-2.5 left-4 right-4 h-px"
                      style={{ background: 'var(--fg)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
          <nav className="flex sm:hidden items-center gap-1">
            {navItems.map((item, i) => {
              const Icon = item.iconComponent;
              const isActive = item.sectionId === activeSection;
              return (
                <button key={i} onClick={item.onClick} className="p-2.5"
                  style={{ color: isActive ? 'var(--fg)' : 'var(--fg-3)' }}>
                  <Icon size={14} />
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════ */}
      {/* HERO — newspaper masthead layout              */}
      {/* ══════════════════════════════════════════════ */}
      <section id="home" className="pt-12 px-6 relative">
        <div className="max-w-6xl mx-auto">

          {/* Masthead metadata strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <span className="text-xs tracking-[0.45em] uppercase" style={{ color: 'var(--fg-3)' }}>
              Vol. I · Est. 2023
            </span>
            <span className="text-xs tracking-[0.45em] uppercase" style={{ color: 'var(--fg-3)' }}>
              Kuala Lumpur, Malaysia
            </span>
          </motion.div>

          {/* Giant masthead name */}
          <div className="py-4 overflow-hidden" style={{ borderBottom: '3px solid var(--fg)' }}>
            <motion.h1
              className="font-display font-black uppercase leading-none text-center"
              style={{
                fontSize: 'clamp(48px, 13vw, 180px)',
                letterSpacing: '-0.02em',
                lineHeight: 0.88,
              }}
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Ikhmal Haziq
            </motion.h1>
          </div>

          {/* 3-column newspaper below masthead */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 py-6 gap-6"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            {/* Col 1: role */}
            <div style={{ borderRight: '1px solid var(--border)' }} className="pr-6">
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--fg-3)' }}>
                Role
              </p>
              <p className="font-display text-lg font-bold italic leading-snug">
                Fullstack Web Developer
              </p>
              <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                Remote · Available
              </p>
            </div>

            {/* Col 2: bio excerpt */}
            <div className="sm:col-span-1" style={{ borderRight: '1px solid var(--border)' }}>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--fg-3)' }}>
                Profile
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                Experienced developer with 2+ years building web apps,
                DevOps pipelines and geospatial systems. CKA certified.
              </p>
            </div>

            {/* Col 3: CTAs */}
            <div className="pl-0 sm:pl-6">
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--fg-3)' }}>
                Contact
              </p>
              <div className="space-y-1">
                <InkLink href="mailto:ikhmalhaziq2907@gmail.com" icon={FaEnvelope}>
                  <span className="hidden sm:inline">ikhmalhaziq2907@gmail.com</span>
                  <span className="sm:hidden">Email</span>
                </InkLink>
                <InkLink href="https://github.com/HaziqLucii" icon={FaGithub} target="_blank" rel="noopener noreferrer">
                  GitHub / HaziqLucii
                </InkLink>
                <InkLink href="https://linkedin.com/in/haziq-luffy" icon={FaLinkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </InkLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* STATS — horizontal ticker strip               */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex divide-x" style={{ borderBottom: '1px solid var(--border)', borderColor: 'var(--border)' }}>
            {[
              { end: 2,  suffix: '+', label: 'Yrs Experience' },
              { end: 5,  suffix: '+', label: 'Projects' },
              { end: 1,  suffix: '',  label: 'Team Led' },
              { end: 2,  suffix: '',  label: 'Certifications' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="flex-1 py-7 px-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4"
                style={{ borderColor: 'var(--border)' }}
              >
                <Counter
                  endValue={stat.end}
                  suffix={stat.suffix}
                  className="font-display text-4xl sm:text-5xl font-black"
                  duration={1.8}
                />
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--fg-3)' }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* ABOUT — newspaper feature article             */}
      {/* ══════════════════════════════════════════════ */}
      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section header — newspaper style */}
          <div className="mb-10">
            <Rule thick delay={0} />
            <div className="flex items-center justify-between py-2">
              <h2 className="font-display text-xs font-black uppercase tracking-[0.5em]" style={{ color: 'var(--fg-3)' }}>
                Section 01 — About
              </h2>
              <span className="text-xs tracking-[0.3em]" style={{ color: 'var(--fg-3)' }}>2023 — Present</span>
            </div>
            <Rule delay={0.1} />
          </div>

          {/* Pull quote */}
          <FadeUp className="mb-12">
            <p
              className="font-display text-2xl md:text-3xl font-bold italic leading-snug border-l-4 pl-6"
              style={{ borderColor: 'var(--fg)', color: 'var(--fg-2)' }}
            >
              "Experienced developer building scalable systems — web, mobile, DevOps, and beyond."
            </p>
          </FadeUp>

          {/* 2-column newspaper body + meta */}
          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-3 gap-10 mb-16">
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm leading-[2]" style={{ color: 'var(--fg-2)' }}>
                  Experienced Fullstack Developer & Technical Lead with a strong background
                  in web and mobile development, DevOps, and geospatial systems. Passionate
                  about delivering scalable and efficient solutions that make a lasting impact.
                </p>
                <p className="text-sm leading-[2]" style={{ color: 'var(--fg-2)' }}>
                  Holds a Certified Kubernetes Administrator (CKA) certification, showcasing
                  expertise in containerization and cloud orchestration. Adept at mentoring
                  developers, leading teams, and optimizing system performance at scale.
                </p>
              </div>
              <div className="space-y-6 pt-1">
                <div style={{ borderTop: '1px solid var(--border)' }} className="pt-5">
                  <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--fg-3)' }}>Education</p>
                  <p className="text-sm font-bold mb-1">Diploma in Cyber Forensics</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-2)' }}>Cybernetics International College</p>
                </div>
                <div style={{ borderTop: '1px solid var(--border)' }} className="pt-5">
                  <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--fg-3)' }}>Based In</p>
                  <p className="text-sm font-bold">Ampang, Kuala Lumpur</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--fg-2)' }}>Malaysia</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Experience — date table layout */}
          <div>
            <div className="mb-4" style={{ borderTop: '3px solid var(--fg)', paddingTop: '8px' }}>
              <p className="text-xs tracking-[0.45em] uppercase" style={{ color: 'var(--fg-3)' }}>
                Employment History
              </p>
            </div>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-7"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                {/* Date column */}
                <div>
                  <p className="font-display text-sm font-bold">{exp.period}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--fg-3)' }}>{exp.location}</p>
                </div>
                {/* Content column */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-display text-xl font-bold">{exp.title}</h3>
                    <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--fg-2)' }}>
                      @ {exp.company}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PROJECTS — editorial featured + index list    */}
      {/* ══════════════════════════════════════════════ */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-10">
            <Rule thick delay={0} />
            <div className="flex items-center justify-between py-2">
              <h2 className="font-display text-xs font-black uppercase tracking-[0.5em]" style={{ color: 'var(--fg-3)' }}>
                Section 02 — Projects
              </h2>
              <span className="text-xs tracking-[0.3em]" style={{ color: 'var(--fg-3)' }}>Featured Work</span>
            </div>
            <Rule delay={0.1} />
          </div>

          {/* FEATURED project — full-width editorial card */}
          {featured && (
            <FadeUp className="mb-12">
              <div className="grid md:grid-cols-3 gap-8 py-8" style={{ borderBottom: '3px solid var(--fg)' }}>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-display text-6xl font-black" style={{ color: 'var(--bg-3)', WebkitTextStroke: '1.5px var(--border)' }}>
                      01
                    </span>
                    <div>
                      <span className="text-xs tracking-[0.3em] uppercase block mb-1" style={{ color: 'var(--fg-3)' }}>
                        — Featured
                      </span>
                      <span className="text-xs tracking-[0.2em] uppercase px-2 py-0.5" style={{ border: '1px solid var(--border)', color: 'var(--fg-2)' }}>
                        {featured.label}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-2)' }}>
                    {featured.description}
                  </p>
                  <div className="space-y-1.5">
                    {featured.highlights.map((h, hi) => (
                      <div key={hi} className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg-3)' }}>
                        <span>—</span> {h}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--fg-3)' }}>Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {featured.tech.map((tech, ti) => (
                        <span key={ti} className="text-xs px-2 py-0.5" style={{ border: '1px solid var(--border)', color: 'var(--fg-3)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs mt-4" style={{ color: 'var(--fg-3)' }}>{featured.period}</p>
                </div>
              </div>
            </FadeUp>
          )}

          {/* Rest of projects — 2-column index */}
          <div className="grid md:grid-cols-2 gap-x-12">
            {restProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="py-6"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl font-black shrink-0"
                    style={{ color: 'var(--bg-3)', WebkitTextStroke: '1px var(--border)' }}>
                    {String(index + 2).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-display text-lg font-bold">{project.title}</h3>
                      <span className="text-xs px-2 py-0.5" style={{ border: '1px solid var(--border)', color: 'var(--fg-3)' }}>
                        {project.label}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--fg-2)' }}>{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, ti) => (
                        <span key={ti} className="text-xs px-1.5 py-0.5" style={{ color: 'var(--fg-3)', border: '1px solid var(--border)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Personal projects — compact list */}
          <div className="mt-16">
            <div className="mb-6" style={{ borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
              <p className="text-xs tracking-[0.45em] uppercase" style={{ color: 'var(--fg-3)' }}>Personal Projects</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12">
              {personalProjectsData.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="py-5"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="font-display text-base font-bold">{project.title}</h3>
                    <span className="text-xs shrink-0 mt-0.5" style={{ color: 'var(--fg-3)' }}>{project.period}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--fg-2)' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, ti) => (
                      <span key={ti} className="text-xs px-1.5 py-0.5" style={{ color: 'var(--fg-3)', border: '1px solid var(--border)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SKILLS — horizontal reference table rows      */}
      {/* ══════════════════════════════════════════════ */}
      <section id="skills" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-10">
            <Rule thick delay={0} />
            <div className="flex items-center justify-between py-2">
              <h2 className="font-display text-xs font-black uppercase tracking-[0.5em]" style={{ color: 'var(--fg-3)' }}>
                Section 03 — Technical Skills
              </h2>
            </div>
            <Rule delay={0.1} />
          </div>

          <div>
            {skills.map((skill, si) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.05, duration: 0.45 }}
                className="skill-row flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-4 px-3 -mx-3"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                {/* Category label */}
                <span className="skill-row-label text-xs tracking-[0.35em] uppercase shrink-0 w-28">
                  {skill.name}
                </span>
                {/* Skill pills — horizontal */}
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <div key={idx} className="skill-pill inline-flex items-center gap-2 px-3 py-1.5">
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="skill-pill-icon h-4 w-auto max-w-[36px] object-contain"
                        />
                      )}
                      <span className="text-xs">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* CONTACT — INVERTED white section              */}
      {/* ══════════════════════════════════════════════ */}
      <section style={{ background: '#ffffff', color: '#000000' }} className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section header — inverted */}
          <div className="mb-14">
            <div className="h-[3px]" style={{ background: '#000' }} />
            <div className="flex items-center justify-between py-2">
              <h2 className="font-display text-xs font-black uppercase tracking-[0.5em]" style={{ color: '#888' }}>
                Section 04 — Contact
              </h2>
            </div>
            <div className="h-px" style={{ background: '#ddd' }} />
          </div>

          <FadeUp>
            <div className="grid md:grid-cols-2 gap-16 items-end">
              <div>
                <p className="text-xs tracking-[0.45em] uppercase mb-6" style={{ color: '#888' }}>
                  — Open to opportunities
                </p>
                <h2
                  className="font-display font-black leading-none"
                  style={{ fontSize: 'clamp(48px, 8vw, 110px)', letterSpacing: '-0.03em', color: '#000' }}
                >
                  Let's<br />
                  <span className="italic" style={{ color: '#777' }}>Work</span><br />
                  Together
                </h2>
              </div>
              <div>
                <p className="text-sm leading-[1.9] mb-8" style={{ color: '#555' }}>
                  Ready to bring your ideas to life with cutting-edge technology
                  and proven expertise in fullstack development and cloud systems.
                </p>
                <a
                  href="mailto:ikhmalhaziq2907@gmail.com"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-opacity hover:opacity-75 w-full sm:w-auto"
                  style={{ background: '#000', color: '#fff' }}
                >
                  <FaEnvelope size={12} />
                  <span className="hidden sm:inline">ikhmalhaziq2907@gmail.com</span>
                  <span className="sm:hidden">Get In Touch</span>
                </a>
                <div className="flex items-center gap-6 mt-6" style={{ color: '#888' }}>
                  <a href="https://github.com/HaziqLucii" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-black">
                    <FaGithub size={15} /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/haziq-luffy" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-black">
                    <FaLinkedin size={15} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="py-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>© 2025 Ikhmal Haziq</p>
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>Built with React + Motion</p>
        </div>
      </footer>

    </div>
  );
}
