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

function App() {
  const [selectedZone, setSelectedZone] = useState('India')
  const [activeProject, setActiveProject] = useState(projects[0].id)
  const projectRefs = useRef([])

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

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">Portfolio</div>
        <nav className="nav-links" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a className="nav-cta" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

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
                >
                  <img src="https://cdn.simpleicons.org/linkedin/FFFFFF" alt="" />
                </a>
                <a
                  href="https://github.com/yashsinghal1234"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="" />
                </a>
              </div>
              <a className="work-cta" href="#projects">
                <span>Work Experience</span>
                <span className="work-cta-icon" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="about-image">
            <img className="about-photo" src={profileImage} alt="Profile" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
