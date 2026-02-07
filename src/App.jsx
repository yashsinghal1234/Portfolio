import { useEffect, useRef, useState } from 'react'
import './App.css'
import { World } from './WorldGlobe'
import profileImage from './assets/seedream-4-high-res-fal_Create_a_realistic_b.jpeg'

const skills = [
  { iconUrl: 'https://cdn.simpleicons.org/html5/E34F26', label: 'HTML' },
  { iconUrl: '/icons/css.svg', label: 'CSS' },
  { iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E', label: 'JavaScript' },
  { iconUrl: 'https://cdn.simpleicons.org/react/61DAFB', label: 'React' },
  { iconUrl: 'https://cdn.simpleicons.org/nodedotjs/339933', label: 'Node.js' },
  { iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248', label: 'MongoDB' },
  { iconUrl: 'https://cdn.simpleicons.org/mysql/4479A1', label: 'MySQL' },
  { iconUrl: 'https://cdn.simpleicons.org/git/F05032', label: 'Git' },
  { iconUrl: 'https://cdn.simpleicons.org/vercel/FFFFFF', label: 'Vercel' },
  { iconUrl: 'https://cdn.simpleicons.org/render/46E3B7', label: 'Render' },
  { iconUrl: 'https://cdn.simpleicons.org/python/3776AB', label: 'Python' },
  { iconUrl: '/icons/java.svg', label: 'Java' },
  { iconUrl: 'https://cdn.simpleicons.org/cplusplus/00599C', label: 'C++' },
  { iconUrl: '/icons/aws.svg', label: 'AWS' },
  { iconUrl: 'https://cdn.simpleicons.org/docker/2496ED', label: 'Docker' },
  { iconUrl: 'https://cdn.simpleicons.org/postman/FF6C37', label: 'Postman' },
  { iconUrl: '/icons/django.svg', label: 'Django' },
  { iconUrl: 'https://cdn.simpleicons.org/flask/FFFFFF', label: 'Flask' },
  { iconUrl: 'https://cdn.simpleicons.org/express/FFFFFF', label: 'Express' },
  { iconUrl: 'https://cdn.simpleicons.org/github/FFFFFF', label: 'GitHub' },
  { iconUrl: 'https://cdn.simpleicons.org/gitlab/FC6D26', label: 'GitLab' },
  { iconUrl: 'https://cdn.simpleicons.org/fastapi/009688', label: 'FastAPI' },
  { iconUrl: '/icons/original-59e1174770bd0010f95ddaf2f81eeec0.webp', label: 'GenAI' },
]

const techLogoRows = [
  [
    { name: 'HTML', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
    { name: 'CSS', logo: '/icons/css.svg' },
    { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Express', logo: 'https://cdn.simpleicons.org/express/FFFFFF' },
    { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
  ],
  [
    { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1' },
    { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'Django', logo: '/icons/django.svg' },
    { name: 'Flask', logo: 'https://cdn.simpleicons.org/flask/FFFFFF' },
    { name: 'FastAPI', logo: 'https://cdn.simpleicons.org/fastapi/009688' },
    { name: 'Java', logo: '/icons/java.svg' },
    { name: 'C++', logo: 'https://cdn.simpleicons.org/cplusplus/00599C' },
  ],
  [
    { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/FFFFFF' },
    { name: 'GitLab', logo: 'https://cdn.simpleicons.org/gitlab/FC6D26' },
    { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
    { name: 'Render', logo: 'https://cdn.simpleicons.org/render/46E3B7' },
    { name: 'AWS', logo: '/icons/aws.svg' },
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman/FF6C37' },
    { name: 'GenAI', logo: '/icons/original-59e1174770bd0010f95ddaf2f81eeec0.webp' },
  ],
]

const locations = [
  { name: 'UK', lat: 55, lon: -2 },
  { name: 'India', lat: 22, lon: 78 },
  { name: 'US', lat: 38, lon: -97 },
]

const globeConfig = {
  pointSize: 1,
  atmosphereColor: '#ffffff',
  showAtmosphere: true,
  atmosphereAltitude: 0.1,
  polygonColor: 'rgba(255,255,255,0.7)',
  globeColor: '#0b2d6b',
  emissive: '#061a3a',
  emissiveIntensity: 0.25,
  shininess: 0.9,
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
}

const globeArcs = [
  {
    startLat: 22,
    startLng: 78,
    endLat: 55,
    endLng: -2,
    color: '#ffd37a',
    arcAlt: 0.2,
    order: 1,
  },
  {
    startLat: 22,
    startLng: 78,
    endLat: 38,
    endLng: -97,
    color: '#ffb347',
    arcAlt: 0.25,
    order: 2,
  },
  {
    startLat: 55,
    startLng: -2,
    endLat: 38,
    endLng: -97,
    color: '#ffe08a',
    arcAlt: 0.22,
    order: 3,
  },
]

const projects = [
  {
    id: 'next-ventures',
    title: 'Next Ventures',
    subtitle:
      'A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design',
    description:
      "A platform designed for early-stage entrepreneurs to pitch, browse, and engage with startup ideas. It's built to impress both users and investors with blazing speed, compelling visuals, and a modern tech stack.",
    bullets: [
      'Leveraged partial prerendering for faster loading.',
      'Simplified idea submission with a clean, intuitive flow.',
      'Enhanced browsing with smooth performance optimizations.',
    ],
    tags: ['Next.js', 'React', 'Sanity CMS', 'TypeScript', 'Tailwind CSS'],
    accent: 'magenta',
  },
  {
    id: 'finote-app',
    title: 'Finote App',
    subtitle:
      'An intuitive mobile companion for organizing your digital wallets and analyzing your financial health',
    description:
      'An intuitive mobile companion for organizing wallets and analyzing financial health through interactive charts. Built with Expo for a modern, responsive experience.',
    bullets: [
      'Create and manage multiple wallets to keep finances organized.',
      'Visualize spending trends with interactive charts.',
      'Attach receipts and sync data in real time using cloud storage.',
      'Navigate smoothly with custom animations and modern UI.',
    ],
    tags: ['Expo', 'TypeScript', 'Firebase', 'Zod', 'Zustand'],
    accent: 'violet',
  },
]

const experiences = [
  {
    id: 'zomato',
    date: 'Sept 2025 - Nov 2025',
    role: 'Data Science Intern',
    company: 'Zomato',
    location: 'Gurugram, India',
    mode: 'On-site',
    summary:
      'Developed a data-driven routing system to automate slot assignments using an OR-Tools based fleet optimization pipeline.',
    techStack: ['Python', 'Redash', 'OR-Tools', 'GoLang', 'API Integration'],
    bullets: [
      'Built an ensemble learning model to forecast frozen product demand, improving inventory management.',
      'Integrated the forecasting model with the replenishment system to adjust inventory based on demand.',
      'Tech stack: Python, Redash, OR-Tools, GoLang, API integration.',
    ],
  },
  {
    id: 'tech-mahindra',
    date: 'Dec 2024 - Feb 2025',
    role: 'Software Developer Intern',
    company: 'Tech Mahindra',
    location: 'Noida, India',
    mode: 'Hybrid',
    summary:
      'Built backend systems for multi-agent network automation to speed up issue detection and resolution.',
    techStack: ['PostgreSQL', 'Prisma', 'Next.js', 'JWT', 'LangGraph', 'GroqAPI'],
    bullets: [
      'Designed two multi-agent systems for automated ticketing and user communication.',
      'Developed backend services to detect network issues and verify incident reports.',
      'Tech stack: PostgreSQL, Prisma, Next.js, JWT, LangGraph, GroqAPI.',
    ],
  },
  {
    id: 'samsung',
    date: 'Oct 2023 - Mar 2024',
    role: 'Machine Learning Intern',
    company: 'Samsung Innovation Lab',
    location: 'Bengaluru, India',
    mode: 'Remote',
    summary:
      'Developed deep learning architectures for EEG-based stress classification achieving 98.73% accuracy.',
    techStack: ['ResNet18', 'DenseNet', 'VGG16', 'EfficientNetB0', 'Python'],
    bullets: [
      'Engineered three deep learning models (ResNet18, DenseNet, VGG16) on EEG data.',
      'Conducted SAM vs MAT dataset analysis for cognitive stress classification.',
      'Achieved 98.73% accuracy using EfficientNetB0 on MAT dataset.',
    ],
  },
]

const searchIconMap = {
  home: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h10l4 4v12H5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 4v4h4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  guestbook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h10a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 5v14" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  bucket: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h12l-1 12H7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 7V5h6v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  call: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5l4 1 2 4-3 3a12 12 0 0 0 7 7l3-3 4 2 1 4-3 1C9 22 2 15 3 7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  uses: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  attribution: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l6 3v6c0 4-3 7-6 9-3-2-6-5-6-9V6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  links: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 15l-2 2a3 3 0 1 1-4-4l2-2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 9l2-2a3 3 0 1 1 4 4l-2 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 19c-3 1-3-2-4-2m8 4v-3c0-1 .4-2 1-2 0 0-4.5-.5-4.5-5a4 4 0 0 1 1-3c0-1 .1-2 1-2a6 6 0 0 1 3 1 6 6 0 0 1 3-1c.9 0 1 1 1 2a4 4 0 0 1 1 3c0 4.5-4.5 5-4.5 5 .6.5 1 1.3 1 2.5V21" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9v9M6 6v.2M10 18v-6a3 3 0 0 1 6 0v6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 7a4 4 0 0 1-2 1 3 3 0 0 0-5 2v1a7 7 0 0 1-6-3s-2 4 3 6a8 8 0 0 1-4 1c5 3 11 0 11-6v-1a4 4 0 0 0 2-1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 4v3h3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  privacy: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  terms: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h14v16H5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8h8M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
}

const searchGroups = [
  {
    title: 'Pages',
    items: [
      { label: 'Home', href: '/#home', icon: 'home' },
      { label: 'About', href: '/about', icon: 'about' },
      { label: 'Projects', href: '/#projects', icon: 'projects' },
      { label: 'Blog', href: '/#blog', icon: 'blog' },
      { label: 'Guestbook', href: '/#guestbook', icon: 'guestbook' },
      { label: 'Bucket List', href: '/#bucket-list', icon: 'bucket' },
      { label: 'Book a call', href: 'mailto:singhalyash307@gmail.com', icon: 'call' },
      { label: 'Uses', href: '/#uses', icon: 'uses' },
      { label: 'Attribution', href: '/#attribution', icon: 'attribution' },
      { label: 'Links', href: '/#links', icon: 'links' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { label: 'GitHub', href: 'https://github.com/yashsinghal1234', external: true, icon: 'github' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/yash-singhal-94894b317/',
        external: true,
        icon: 'linkedin',
      },
      { label: 'X (Twitter)', href: 'https://x.com/', external: true, icon: 'twitter' },
      { label: 'Resume', href: '/resume.pdf', external: true, icon: 'resume' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/#privacy', icon: 'privacy' },
      { label: 'Terms of Use', href: '/#terms', icon: 'terms' },
    ],
  },
]

const getFilteredGroups = (query) => {
  const normalizedQuery = query.trim().toLowerCase()
  return searchGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        !normalizedQuery || item.label.toLowerCase().includes(normalizedQuery)
      ),
    }))
    .filter((group) => group.items.length > 0)
}

const SearchOverlay = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  filteredGroups,
}) => (
  <div className={`search-overlay ${isOpen ? 'is-open' : ''}`}>
    <div className="search-backdrop" role="presentation" onClick={onClose} />
    <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-header">
        <div className="search-input">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <button className="search-close" type="button" onClick={onClose}>
          ESC
        </button>
      </div>

      <div className="search-body">
        {filteredGroups.length === 0 ? (
          <p className="search-empty">No matches found.</p>
        ) : (
          filteredGroups.map((group) => (
            <div className="search-group" key={group.title}>
              <p className="search-heading">{group.title}</p>
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  onClick={onClose}
                >
                  <span className="search-icon" aria-hidden="true">
                    {searchIconMap[item.icon]}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)

const NavBar = ({aboutHref, aboutNewTab, onSearchOpen}) => (
  <header className="nav">
    <div className="brand">Portfolio</div>
    <nav className="nav-links" aria-label="Primary">
      <a href="/#home">Home</a>
      <a href="/#skills">Skills</a>
      <a href={aboutHref} target={aboutNewTab ? '_blank' : undefined} rel={aboutNewTab ? 'noreferrer' : undefined}>
        About
      </a>
      <a className="nav-cta" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
      <a href="/#contact">Contact</a>
    </nav>
    <div className="nav-actions">
      <button className="search-trigger" type="button" aria-label="Open search" onClick={onSearchOpen}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16.5 16.5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </header>
)

const useTimelineGlow = (timelineRef, sectionRef) => {
  useEffect(() => {
    const timelineEl = timelineRef.current
    const sectionEl = sectionRef.current
    if (!timelineEl || !sectionEl) return

    let rafId = 0

    const updateProgress = () => {
      rafId = 0
      const rect = sectionEl.getBoundingClientRect()
      const viewHeight = window.innerHeight || 1
      const total = rect.height + viewHeight
      const progressed = viewHeight - rect.top
      const progress = Math.min(Math.max(progressed / total, 0), 1)
      timelineEl.style.setProperty('--timeline-progress', progress.toFixed(3))
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [timelineRef, sectionRef])
}

const useEscapeClose = (isOpen, onClose) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])
}

const AboutSection = () => (
  <section className="about-highlight" id="about-more">
    <p className="chip">KNOW ABOUT ME</p>
    <div className="about-grid">
      <div className="about-copy">
        <h2 className="about-title">
          Full-Stack Developer and
          <span className="about-emphasis"> a little bit of everything</span>
        </h2>
        <p>
          I'm Yash Singhal, a proactive full-stack developer passionate about creating dynamic web
          experiences. From frontend to backend, I thrive on solving complex problems with clean,
          efficient code. My expertise spans React, Next.js, and Node.js, and I'm always eager to
          learn more.
        </p>
        <p>
          When I'm not immersed in work, I'm exploring new ideas and staying curious. Life's about
          balance, and I love embracing every part of it.
        </p>
        <p>I believe in waking up each day eager to make a difference!</p>
        <div className="about-actions">
          <div className="social-icons" aria-label="Social links">
            <a
              href="https://www.linkedin.com/in/yash-singhal-94894b317/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-label="LinkedIn"
            >
              <img className="icon-white" src="/icons/linkedin_2931621.png" alt="" />
            </a>
            <a
              href="https://leetcode.com/u/yash_singhal123/"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              data-label="LeetCode"
            >
              <img src="https://cdn.simpleicons.org/leetcode/FFFFFF" alt="" />
            </a>
            <a
              href="https://www.codechef.com/users/yash_308"
              target="_blank"
              rel="noreferrer"
              aria-label="CodeChef"
              data-label="CodeChef"
            >
              <img src="https://cdn.simpleicons.org/codechef/FFFFFF" alt="" />
            </a>
            <a
              href="https://codeforces.com/profile/singhal307"
              target="_blank"
              rel="noreferrer"
              aria-label="Codeforces"
              data-label="Codeforces"
            >
              <img src="https://cdn.simpleicons.org/codeforces/FFFFFF" alt="" />
            </a>
            <a
              href="https://github.com/yashsinghal1234"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-label="GitHub"
            >
              <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="" />
            </a>
          </div>
          <a className="work-cta" href="#experience">
            <span>Education & Certifications</span>
            <span className="work-cta-icon" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="about-image">
        <img className="about-photo" src={profileImage} alt="Profile" />
      </div>
    </div>
  </section>
)

const ExperienceSection = ({experienceRef, timelineRef, variant = 'default', showGlow = true}) => (
  <section
    className={`experience ${variant === 'showcase' ? 'experience-showcase' : ''}`}
    id="experience"
    ref={experienceRef}
  >
    {variant === 'showcase' ? (
      <div className="experience-header">
        <p className="experience-kicker">THE EXPERIENCE</p>
        <h2 className="experience-heading">
          Experience That Brings <span>Ideas to Life</span>
        </h2>
      </div>
    ) : (
      <h2 className="experience-title">Professional Journey</h2>
    )}
    <div
      className={`timeline ${variant === 'showcase' ? 'experience-timeline' : ''} ${showGlow ? '' : 'timeline-no-glow'}`}
      ref={timelineRef}
    >
      {experiences.map((experience) => (
        <article
          className={`timeline-item ${variant === 'showcase' ? 'experience-item' : ''}`}
          key={experience.id}
        >
          {variant === 'showcase' ? (
            <>
              <div className="experience-meta">
                <p className="experience-date">{experience.date}</p>
                <div className="experience-company">
                  <span className="experience-logo" aria-hidden="true">
                    {experience.company.slice(0, 1)}
                  </span>
                  <span>{experience.company}</span>
                </div>
                <p className="experience-meta-row">
                  <span className="experience-meta-icon location" aria-hidden="true" />
                  {experience.location}
                </p>
                <p className="experience-meta-row">
                  <span className="experience-meta-icon briefcase" aria-hidden="true" />
                  {experience.mode}
                </p>
              </div>
              <div className="experience-line" aria-hidden="true" />
              <div className="experience-content">
                <h3 className="experience-role">{experience.role}</h3>
                <p className="experience-summary">{experience.summary}</p>
                {experience.techStack?.length ? (
                  <div className="experience-stack" aria-label="Tech stack">
                    {experience.techStack.map((tech) => (
                      <span className="experience-pill" key={tech}>{tech}</span>
                    ))}
                  </div>
                ) : null}
                <ul className="experience-list">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="timeline-date">
                <span>{experience.date}</span>
              </div>
              <div className="timeline-content">
                <h3 className="timeline-role">
                  <span className="timeline-role-accent">{experience.role}</span>
                  <span> at {experience.company}</span>
                </h3>
                <p className="timeline-summary">{experience.summary}</p>
                <div className="timeline-media" aria-hidden="true">
                  <div className="timeline-media-card" />
                  <div className="timeline-media-card" />
                </div>
                <ul className="timeline-list">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  </section>
)

function App() {
  const [selectedZone, setSelectedZone] = useState('India')
  const [activeProject, setActiveProject] = useState(projects[0].id)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const projectRefs = useRef([])
  const timelineRef = useRef(null)
  const experienceRef = useRef(null)

  const activeLocation =
    locations.find((loc) => loc.name === selectedZone) ?? locations[0]

  useEffect(() => {
    const nodes = projectRefs.current.filter(Boolean)
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProject(entry.target.dataset.project)
          }
        })
      },
      { threshold: 0.6 }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  useTimelineGlow(timelineRef, experienceRef)
  useEscapeClose(isSearchOpen, () => setIsSearchOpen(false))

  const filteredGroups = getFilteredGroups(searchQuery)

  return (
    <div className="page">
      <NavBar aboutHref="/about" aboutNewTab onSearchOpen={() => setIsSearchOpen(true)} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredGroups={filteredGroups}
      />

      <main className="hero" id="home">
        <p className="eyebrow">Hello, I'm <span className="accent">Yash Singhal</span></p>
        <h1>
          I help founders turn
          <span className="gradient"> ideas into seamless</span>
          digital experiences
        </h1>

        <div className="subhead" aria-label="Role">a Full Stack Developer</div>
        <p className="supporting">Passionate about cutting-edge technologies</p>

        <div className="cta-row">
          <a className="btn primary" href="#contact">Let's Connect</a>
          <a className="btn ghost" href="/resume.pdf" target="_blank" rel="noreferrer">
            <span className="mail-icon" aria-hidden="true">↗</span>
            Resume
          </a>
          <span className="status">OPEN TO WORK</span>
        </div>
        <div className="cen">
          <div className="mouse" aria-hidden="true">
            <span className="wheel" />
          </div>
        </div>
      </main>

      <section className="skills" id="skills">
        <p className="chip">MY SKILLS</p>
        <h2 className="section-title">The Secret <span className="pink">Sauce</span></h2>
        <div className="skills-grid" role="list">
          {skills.map((skill) => (
            <div className="skill-tile" key={skill.label} role="listitem">
              <span className="skill-icon" aria-hidden="true">
                <img src={skill.iconUrl} alt="" loading="lazy" />
              </span>
              <span className="skill-label">{skill.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-grid" id="about">
        <div className="panel collaboration">
          <div className="rings" aria-hidden="true">
            <span className="ring center" />
            <span className="ring left" />
            <span className="ring right" />
            <div className="avatar" aria-hidden="true">YS</div>
          </div>
          <p className="label">COLLABORATION</p>
          <p className="panel-text">I prioritize client collaboration, fostering open communication</p>
        </div>

        <div className="panel tech-pills" style={{ paddingLeft: '0', paddingRight: '0' }}>
          <h3 className="panel-heading" style={{ paddingLeft: '20px', paddingRight: '20px' }}>Passionate about cutting-edge technologies</h3>
          <div className="logo-rows">
            {techLogoRows.map((row, idx) => (
              <div className="logo-row" key={idx}>
                <div className="logo-track">
                  {row.map((tool) => (
                    <div className="logo-pill" key={tool.name}>
                      {tool.logo && (
                        <span className="logo-icon-wrap">
                          <img className="logo-icon" src={tool.logo} alt={tool.name} loading="lazy" />
                        </span>
                      )}
                      <span className="logo-label">{tool.name}</span>
                    </div>
                  ))}
                  {/* duplicate once for seamless looping */}
                  {row.map((tool) => (
                    <div className="logo-pill" key={`${tool.name}-dup`}>
                      {tool.logo && (
                        <span className="logo-icon-wrap">
                          <img className="logo-icon" src={tool.logo} alt={tool.name} loading="lazy" />
                        </span>
                      )}
                      <span className="logo-label">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-grid bottom-row">
        <div className="panel timezone " style={{ paddingBottom: '0' }}>
          <h3 className="panel-heading" style={{ marginBottom: '16px' }}>
            I'm very flexible with <span className="gradient-inline">time zone communications</span>
          </h3>
          <div className="pill-row globe-pills">
            {locations.map((loc) => (
              <button
                key={loc.name}
                type="button"
                className={`pill pill-button ${loc.name === selectedZone ? 'pill-active' : ''}`}
                onClick={() => setSelectedZone(loc.name)}
              >
                {loc.name}
              </button>
            ))}
          </div>
          <p className="panel-sub">Select a region to reorient the globe.</p>
          <div
            style={{
              width: '100%',
              height: 230,
              marginTop: '1rem',
              overflow: 'hidden',
              borderRadius: 24,
            }}
          >
            <div
              style={{
                width: '100%',
                height: 420,
                transform: 'translateY(-50px)',
              }}
            >
              <World globeConfig={globeConfig} data={globeArcs} activeLocation={activeLocation} />
            </div>
          </div>
        </div>

        <div className="panel contact" id="contact">
          <div className="crest" aria-hidden="true">YS</div>
          <p className="panel-heading">Let's work together on your next project</p>
          <a className="btn primary wide" href="mailto:hello@example.com">singhalyash307@gmail.com</a>
        </div>
      </section>

      <section className="case-studies" id="projects">
        <p className="chip">CASE STUDIES</p>
        <h2 className="section-title">Curated <span className="pink">work</span></h2>
        <div className="case-grid">
          <div className="case-left">
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className={`project-card project-link ${project.accent}`}
                data-project={project.id}
                ref={(el) => {
                  projectRefs.current[index] = el
                }}
              >
                <div className="project-heading">
                  <p>{project.subtitle}</p>
                  <span className="project-arrow">→</span>
                </div>
                <div className="project-media" aria-hidden="true">
                  <div className="project-frame" />
                </div>
              </a>
            ))}
          </div>
          <div className="case-right">
            {projects.map((project) => (
              <div
                key={project.id}
                id={project.id}
                className={`project-details ${activeProject === project.id ? 'is-active' : ''}`}
              >
                <div className="project-title">
                  <span className="project-dash" />
                  <h3>{project.title}</h3>
                </div>
                <p className="project-description">{project.description}</p>
                <ul className="project-list">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="pill" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <a className="work-cta" href="#projects">
          <span>See more projects</span>
          <span className="work-cta-icon" aria-hidden="true">→</span>
        </a>
      </section>

      <AboutSection />
      <ExperienceSection
        experienceRef={experienceRef}
        timelineRef={timelineRef}
        variant="showcase"
      />

      <section className="impact-banner" aria-label="Call to action">
        <div className="impact-content">
          <div className="impact-mark" aria-hidden="true">
            <span className="impact-mark-ring" />
            <span className="impact-mark-text">YS</span>
          </div>
          <h2 className="impact-title">
            <span>From concept to</span>
            <span className="impact-emphasis">creation</span>
            <span>let&apos;s make it happen!</span>
          </h2>
          <a className="impact-cta" href="#contact">
            <span>Get in touch</span>
            <span className="impact-cta-icon" aria-hidden="true">→</span>
          </a>
          <p className="impact-sub">I&apos;m available for full-time roles &amp; freelance projects.</p>
          <p className="impact-note">
            I thrive on crafting dynamic web applications, and delivering seamless user experiences.
          </p>
        </div>
        <div className="impact-badge" aria-hidden="true">
          <span>Open to work</span>
        </div>
      </section>

      <div className="footer-wrap">
        <footer className="site-footer">
          <div className="footer-main">
            <div className="footer-profile">
              <div className="footer-mark">YS</div>
              <p className="footer-description">
                I&apos;m Yash - a full-stack developer, freelancer &amp; problem solver. Thanks for checking
                out my site!
              </p>
              <span className="footer-status">
                <span className="footer-dot" aria-hidden="true" />
                Available for work
              </span>
            </div>

            <div className="footer-columns">
              <div className="footer-col">
                <p className="footer-heading">General</p>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#skills">Skills</a>
              </div>
              <div className="footer-col">
                <p className="footer-heading">Specifics</p>
                <a href="#experience">Education & Certifications</a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
                <a href="#contact">Contact</a>
                <a href="#experience">Professional Journey</a>
              </div>
              <div className="footer-col">
                <p className="footer-heading">More</p>
                <a href="mailto:singhalyash307@gmail.com">Book a call</a>
                <a href="https://github.com/yashsinghal1234" target="_blank" rel="noreferrer">Links</a>
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">© 2026 Yash Singhal. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Use</a>
            </div>
          </div>
        </footer>
        <div className="footer-bar" style={{marginTop: '10px'}} aria-hidden="true" />
      </div>
    </div>
  )
}

export function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const timelineRef = useRef(null)
  const experienceRef = useRef(null)

  useTimelineGlow(timelineRef, experienceRef)
  useEscapeClose(isSearchOpen, () => setIsSearchOpen(false))

  const filteredGroups = getFilteredGroups(searchQuery)

  return (
    <div className="page">
      <NavBar aboutHref="/about" onSearchOpen={() => setIsSearchOpen(true)} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredGroups={filteredGroups}
      />
      <AboutSection />
      <ExperienceSection experienceRef={experienceRef} timelineRef={timelineRef} showGlow />
    </div>
  )
}

export default App
