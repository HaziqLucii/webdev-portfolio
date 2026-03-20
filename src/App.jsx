import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import SplitText from './TextAnimations/SplitText/SplitText';
import TextType from './TextAnimations/TextType/TextType';
import Counter from './Components/Counter/Counter';
import { projectsData, personalProjectsData } from './data/projects';
import { navItems } from './data/navigation';
import { skills } from './data/skills';
import { experiences } from './data/experiences';
import Lanyard from './Components/Lanyard/Lanyard';
import Clock from './Components/Clock/Clock';
import Weather from './Components/Weather/Weather';

/* ─── Fade-up wrapper used throughout ─────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Vertical scroll timeline ─────────────────────── */
const TIMELINE_SECTIONS = [
  { id: 'home',     label: '01' },
  { id: 'about',    label: '02' },
  { id: 'projects', label: '03' },
  { id: 'skills',   label: '04' },
];

function ScrollTimeline({ activeSection }) {
  const activeIndex = TIMELINE_SECTIONS.findIndex(s => s.id === activeSection);
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      {TIMELINE_SECTIONS.map((section, i) => (
        <div key={section.id} className="flex flex-col items-center">
          {/* Connecting line segment (above each node except first) */}
          {i > 0 && (
            <div className="w-px h-14 relative overflow-hidden"
              style={{ backgroundColor: 'var(--border-mid)' }}>
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{ backgroundColor: 'var(--accent)' }}
                initial={{ height: '0%' }}
                animate={{ height: i <= activeIndex ? '100%' : '0%' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          )}
          {/* Node */}
          <button
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1.5 group"
            aria-label={`Go to section ${section.label}`}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                backgroundColor: i === activeIndex
                  ? 'var(--accent)'
                  : i < activeIndex
                  ? 'var(--text-muted)'
                  : 'var(--border-strong)',
                scale: i === activeIndex ? 1.4 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="text-[9px] tracking-[0.3em] font-mono"
              animate={{
                color: i === activeIndex ? 'var(--accent)' : 'var(--text-muted)',
                opacity: i === activeIndex ? 1 : 0.45,
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

/* ─── Section header ───────────────────────────────── */
function SectionHeader({ number, children }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-xs tracking-[0.45em]" style={{ color: 'var(--text-muted)' }}>
          {number}
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
      </div>
      {children}
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
      const scrollY = window.scrollY + 100;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
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
    <div className="min-h-screen" style={{ color: 'var(--text-primary)' }}>

      {/* ── Scroll timeline (desktop only) ─────────── */}
      <ScrollTimeline activeSection={activeSection} />

      {/* ── Widgets (desktop only) ──────────────────── */}
      <div className="fixed top-[72px] left-4 z-40 hidden lg:block">
        <div className="px-4 py-3 w-[148px]"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5 tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>Time</div>
          <Clock />
        </div>
      </div>

      <div className="fixed top-[168px] left-4 z-40 hidden lg:block group">
        <div className="px-4 py-3 w-[148px] relative"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5 tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>Weather</div>
          <Weather />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            <div className="text-xs px-3 py-1.5 whitespace-nowrap"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              Source: data.gov.my
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(12,11,9,0.92)' : 'var(--bg-primary)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          {/* Monogram */}
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs tracking-[0.4em] uppercase transition-colors duration-200 hover:opacity-70"
            style={{ color: 'var(--accent)' }}
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
                  className="relative px-4 py-4 text-xs tracking-[0.22em] uppercase transition-colors duration-200"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-3 left-4 right-4 h-px"
                      style={{ backgroundColor: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile nav — icons */}
          <nav className="flex sm:hidden items-center gap-1">
            {navItems.map((item, i) => {
              const Icon = item.iconComponent;
              const isActive = item.sectionId === activeSection;
              return (
                <button
                  key={i}
                  onClick={item.onClick}
                  className="p-2.5 transition-colors duration-200"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
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
        className="min-h-screen flex items-center relative px-6 pt-14"
        style={{ overflow: 'visible' }}
      >
        <div
          className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto w-full"
          style={{ overflow: 'visible' }}
        >
          <div className="text-center md:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center justify-center md:justify-start gap-3 mb-9"
            >
              <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs tracking-[0.38em] uppercase" style={{ color: 'var(--accent)' }}>
                Fullstack Web Developer
              </span>
            </motion.div>

            {/* Name */}
            <div className="mb-5">
              <SplitText
                text="Ikhmal Haziq"
                className="font-display text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-none"
                splitType="chars"
                delay={65}
                duration={0.85}
                ease="power3.out"
                from={{ opacity: 0, y: 55 }}
                to={{ opacity: 1, y: 0 }}
              />
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mb-10 max-w-md mx-auto md:mx-0"
              style={{ color: 'var(--text-secondary)' }}
            >
              <TextType
                text={[
                  "Web & mobile development, DevOps, and geospatial systems.",
                  "Delivering scalable, efficient solutions since 2023.",
                ]}
                className="text-sm md:text-base leading-relaxed"
                typingSpeed={40}
                pauseDuration={2200}
                showCursor={true}
                cursorCharacter="|"
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="flex flex-wrap justify-center md:justify-start items-center gap-4"
            >
              <a
                href="mailto:ikhmalhaziq2907@gmail.com"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs tracking-[0.25em] uppercase transition-opacity duration-200 hover:opacity-75"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                <FaEnvelope size={12} />
                Get In Touch
              </a>
              <div className="flex items-center gap-5" style={{ color: 'var(--text-muted)' }}>
                <a href="https://github.com/HaziqLucii" target="_blank" rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white">
                  <FaGithub size={17} />
                </a>
                <a href="https://linkedin.com/in/haziq-luffy" target="_blank" rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white">
                  <FaLinkedin size={17} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Lanyard */}
          <div
            className="hidden md:flex justify-center items-center relative z-10"
            style={{ overflow: 'visible', height: '500px' }}
          >
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
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
                className="py-10 px-8"
                style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
              >
                <Counter
                  endValue={stat.end}
                  suffix={stat.suffix}
                  className="font-display text-5xl md:text-6xl font-light block mb-2"
                  duration={1.8}
                />
                <p className="text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
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
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader number="01">
            <SplitText
              text="About"
              className="font-display text-4xl md:text-5xl font-light"
              splitType="chars"
              delay={50}
              duration={0.7}
              ease="power3.out"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />
          </SectionHeader>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Bio */}
            <FadeUp>
              <p className="text-sm md:text-base leading-[1.95] mb-6" style={{ color: 'var(--text-secondary)' }}>
                Experienced Fullstack Developer & Technical Lead with a strong background
                in web and mobile development, DevOps, and geospatial systems. Passionate
                about delivering scalable and efficient solutions.
              </p>
              <p className="text-sm md:text-base leading-[1.95] mb-10" style={{ color: 'var(--text-secondary)' }}>
                Holds a Certified Kubernetes Administrator (CKA) certification, showcasing
                expertise in containerization and cloud orchestration. Adept at mentoring
                developers, leading projects, and optimizing system performance.
              </p>
              <div
                className="grid grid-cols-2 gap-6 pt-8"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div>
                  <h4 className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
                    Education
                  </h4>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Diploma in Cyber Forensics</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Cybernetics International College
                  </p>
                </div>
                <div>
                  <h4 className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
                    Location
                  </h4>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Ampang, Kuala Lumpur</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Malaysia</p>
                </div>
              </div>
            </FadeUp>

            {/* Experience timeline */}
            <div className="space-y-3">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="pl-5 pr-6 py-6"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '2px solid var(--accent)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="font-display text-xl font-light" style={{ color: 'var(--text-primary)' }}>
                      {exp.title}
                    </h3>
                    <span className="text-xs shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs tracking-[0.22em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
                    {exp.company} — {exp.location}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>
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
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader number="02">
            <SplitText
              text="Featured Projects"
              className="font-display text-4xl md:text-5xl font-light"
              splitType="chars"
              delay={50}
              duration={0.7}
              ease="power3.out"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />
          </SectionHeader>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ backgroundColor: 'var(--border-mid)', gap: '1px' }}
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.07, duration: 0.4 }}
                className="p-7 flex flex-col group cursor-default"
                style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
                    {String(index + 1).padStart(3, '0')}
                  </span>
                  <span
                    className="text-xs tracking-[0.18em] uppercase px-2.5 py-1"
                    style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-dim)' }}
                  >
                    {project.label}
                  </span>
                </div>
                <h3
                  className="font-display text-xl font-light mb-3 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-[1.85] mb-6 flex-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-xs px-2 py-0.5"
                      style={{ color: 'var(--text-muted)', border: '1px solid var(--border-mid)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="space-y-1.5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  {project.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--accent)' }}>—</span>
                      {h}
                    </div>
                  ))}
                  <div className="text-xs text-right pt-1" style={{ color: 'var(--text-muted)' }}>
                    {project.period}
                  </div>
                </div>
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
          <SectionHeader number="02b">
            <SplitText
              text="Personal Projects"
              className="font-display text-3xl md:text-4xl font-light"
              splitType="chars"
              delay={50}
              duration={0.7}
              ease="power3.out"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />
          </SectionHeader>

          <div
            className="grid md:grid-cols-2"
            style={{ backgroundColor: 'var(--border-mid)', gap: '1px' }}
          >
            {personalProjectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-7 flex flex-col cursor-default"
                style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
                    {String(index + 1).padStart(3, '0')}
                  </span>
                  <span
                    className="text-xs tracking-[0.18em] uppercase px-2.5 py-1"
                    style={{ color: 'var(--accent-green)', backgroundColor: 'var(--accent-green-dim)' }}
                  >
                    {project.label}
                  </span>
                </div>
                <h3
                  className="font-display text-xl font-light mb-3 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-[1.85] mb-6 flex-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-xs px-2 py-0.5"
                      style={{ color: 'var(--text-muted)', border: '1px solid var(--border-mid)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="space-y-1.5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  {project.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--accent-green)' }}>—</span>
                      {h}
                    </div>
                  ))}
                  <div className="text-xs text-right pt-1" style={{ color: 'var(--text-muted)' }}>
                    {project.period}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SKILLS                                        */}
      {/* ══════════════════════════════════════════════ */}
      <section id="skills" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader number="03">
            <SplitText
              text="Technical Skills"
              className="font-display text-4xl md:text-5xl font-light"
              splitType="chars"
              delay={50}
              duration={0.7}
              ease="power3.out"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill, si) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.05, duration: 0.4 }}
                className="p-6"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}
              >
                <h3
                  className="text-xs tracking-[0.3em] uppercase mb-6"
                  style={{ color: 'var(--accent)' }}
                >
                  {skill.name}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {skill.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 py-3 px-2 cursor-default transition-all duration-200"
                      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-tertiary)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                      }}
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="h-7 w-auto max-w-[72px] object-contain"
                          style={{ filter: item.invert ? 'invert(1) brightness(0.88)' : 'brightness(0.88) saturate(0.7)' }}
                        />
                      ) : (
                        <div
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold"
                          style={{ color: 'var(--accent)' }}
                        >
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <span
                        className="text-xs text-center leading-tight"
                        style={{ color: 'var(--text-secondary)' }}
                      >
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
          <FadeUp>
            <div className="p-12 md:p-16" style={{ border: '1px solid var(--border)' }}>
              <div className="max-w-xl">
                <p
                  className="text-xs tracking-[0.4em] uppercase mb-8"
                  style={{ color: 'var(--accent)' }}
                >
                  — Open to opportunities
                </p>
                <div className="overflow-hidden mb-8" style={{ textAlign: 'left' }}>
                  <SplitText
                    text="Let's Work Together"
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
                    splitType="words"
                    textAlign="left"
                    delay={80}
                    duration={0.7}
                    ease="power3.out"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                </div>
                <p
                  className="text-sm leading-[1.9] mb-10"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Ready to bring your ideas to life with cutting-edge technology
                  and proven expertise in fullstack development and cloud systems.
                </p>
                <a
                  href="mailto:ikhmalhaziq2907@gmail.com"
                  className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-opacity duration-200 hover:opacity-75"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
                >
                  <FaEnvelope size={12} />
                  ikhmalhaziq2907@gmail.com
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="py-8 relative" style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2025 Ikhmal Haziq
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Built with React •{' '}
            <a
              href="https://reactbits.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-white"
            >
              React Bits
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}
