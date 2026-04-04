import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    ContactDialog,
    CustomCursor,
    NavBar,
    SearchOverlay,
    getFilteredGroups,
    portfolioProjects,
    useEscapeClose,
} from './App.jsx'
import './PortfolioDetailPage.css'
import resumePdf from '../data/resume.pdf'

const tagIconMap = {
    'Next.js': 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
    React: 'https://cdn.simpleicons.org/react/61DAFB',
    'Tailwind CSS': 'https://cdn.simpleicons.org/tailwindcss/38BDF8',
    TypeScript: 'https://cdn.simpleicons.org/typescript/3178C6',
    Expo: 'https://cdn.simpleicons.org/expo/FFFFFF',
    Firebase: 'https://cdn.simpleicons.org/firebase/FFCA28',
    Zod: 'https://cdn.simpleicons.org/zod/3E67B1',
    Zustand: 'https://cdn.simpleicons.org/zustand/FFB300',
    'Node.js': 'https://cdn.simpleicons.org/nodedotjs/339933',
    Express: 'https://cdn.simpleicons.org/express/FFFFFF',
    MongoDB: 'https://cdn.simpleicons.org/mongodb/47A248',
    Mongoose: 'https://cdn.simpleicons.org/mongoose/880000',
    JWT: 'https://cdn.simpleicons.org/jsonwebtokens/FFFFFF',
    Docker: 'https://cdn.simpleicons.org/docker/2496ED',
    Vite: 'https://cdn.simpleicons.org/vite/646CFF',
}

const projectDetails = {
    'coupon-care': {
        title: 'CouponCare',
        type: 'Web App',
        role: 'Full-stack Developer',
        built: 'March 2026',
        updated: 'April 4, 2026',
        visitUrl: 'https://couponcare-vaen.vercel.app',
        sourceUrl: 'https://github.com/yashsinghal1234/couponcare',
        summary:
            'CouponCare is a full-stack web app for donating and requesting discount coupons. Donors can list coupons, recipients can request them, and approvals are handled when required.',
        techStack: [
            'React',
            'Vite',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'Express',
            'MongoDB',
            'Mongoose',
            'JWT',
            'Docker',
        ],
        sections: [
            {
                title: 'Why I Built This',
                body: [
                    'Many times, people need a coupon but don’t have one, while someone else has that same coupon but doesn’t plan to use it. As a result, these coupons often go to waste. I built CouponCare to solve this problem by creating a platform where users can exchange unused coupons with others—so value doesn’t just disappear because of timing or lack of visibility.',
                    'But beyond the idea, I also noticed something else: most small projects in this space are built quickly and left messy—poor data handling, no proper validation, and features that break as soon as the system scales even a little.',
                    'I didn’t just want to build another coupon app. I wanted to build it properly.',
                    'Not just to show that I can use a tech stack, but to show that I can make the tough engineering decisions—how to structure coupon data so it doesn’t become chaotic over time, how to handle edge cases like expired or duplicate coupons, how to design flows where users can trust what they see, and what breaks when real users start interacting with the system in unpredictable ways.',
                    'This project was as much about solving a real-world problem as it was about learning how to design systems that hold up beyond the “it works on my machine” stage.',
                ],
            },
            {
                title: 'How It Works',
                body: [
                    'CouponCare is built as a full-stack platform where users can either donate unused coupons or request ones they need.',
                    'The system is designed to feel simple for users, while handling the complexity of state, ownership, and requests behind the scenes.',
                ],
                bullets: [
                    'Users authenticate using JWT-based auth to securely access the platform.',
                    'Donors can list coupons with relevant details (type, value, expiry, etc.).',
                    'Recipients can browse available coupons and request them.',
                    'Some coupons require approval, giving donors control over how their coupons are distributed.',
                    'The backend (Node.js, Express, MongoDB) handles data storage, request flows, and validation.',
                    'The frontend (React + Tailwind CSS) provides a clean interface for browsing and interacting with coupons.',
                ],
            },
            {
                title: 'Key Decisions',
                body: [
                    'This project was less about stacking tools and more about making deliberate engineering choices:',
                ],
                bullets: [
                    'Separation of concerns: split into clear frontend and backend layers instead of a tightly coupled system.',
                    'Schema-driven design (Mongoose) to keep coupon, user, and request data consistent.',
                    'Controlled exchange flow with request + approval logic to prevent misuse and preserve ownership.',
                    'JWT-based authentication to keep the backend stateless and scalable.',
                    'Developer experience focus: Vite and Docker for fast setup and iteration.',
                ],
            },
            {
                title: 'Challenges',
                body: [
                    'Some of the harder problems weren’t obvious at first—they showed up once the system started behaving like a real app:',
                ],
                bullets: [
                    'State consistency across listing, requesting, and approval flows.',
                    'Edge cases in exchange logic (multiple requests, expired coupons, withdrawals).',
                    'Auth flow design to keep protected routes and token state in sync.',
                    'Data modeling trade-offs between database logic and application logic.',
                    'Local setup + environment management across backend, frontend, and database.',
                ],
            },
            {
                title: 'What I Learned',
                body: [
                    'CouponCare ended up being more than just a feature project—it was about thinking like a system designer:',
                    'How to design real-world workflows, not just CRUD APIs. The importance of data integrity and validation early on. Why clear boundaries between frontend and backend matter as complexity grows. How small decisions (like request flows or schema design) have long-term impact.',
                    'Most importantly, I learned that good projects aren’t defined by features—they’re defined by how well they handle the messy, unpredictable behavior of real users.',
                ],
            },
        ],
    },
}

function PortfolioDetailPage() {
    const { projectId } = useParams()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    useEscapeClose(isSearchOpen, () => setIsSearchOpen(false))
    useEscapeClose(isContactOpen, () => setIsContactOpen(false))

    const handleOpenContact = (event) => {
        if (event) event.preventDefault()
        setIsContactOpen(true)
    }

    const filteredGroups = getFilteredGroups(searchQuery)

    const project = useMemo(
        () => portfolioProjects.find((item) => item.id === projectId),
        [projectId]
    )

    const detail = projectDetails[projectId]

    if (!project) {
        return (
            <div className="page portfolio-detail">
                <CustomCursor />
                <NavBar
                    aboutHref="/about"
                    onSearchOpen={() => setIsSearchOpen(true)}
                />
                <SearchOverlay
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filteredGroups={filteredGroups}
                />
                <main className="detail-empty">
                    <p>Project not found.</p>
                    <a className="detail-back" href="/portfolio">Back to projects</a>
                </main>
            </div>
        )
    }

    const title = detail?.title ?? project.title
    const summary = detail?.summary ?? project.subtitle
    const techStack = detail?.techStack ?? project.tags
    const heroVideo = project.media?.type === 'video' ? project.media.src : null
    const visitUrl = detail?.visitUrl ?? project.media?.link
    const sourceUrl = detail?.sourceUrl
    const projectIndex = portfolioProjects.findIndex((item) => item.id === projectId)
    const nextProject = projectIndex >= 0
        ? portfolioProjects[(projectIndex + 1) % portfolioProjects.length]
        : null

    return (
        <div className="page portfolio-detail">
            <CustomCursor />
            <NavBar
                aboutHref="/about"
                onSearchOpen={() => setIsSearchOpen(true)}
                onContactOpen={handleOpenContact}
            />
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filteredGroups={filteredGroups}
            />
            <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            <nav className="detail-breadcrumb" aria-label="Breadcrumb">
                <a className="detail-crumb" href="/">Home</a>
                <span className="detail-crumb-sep" aria-hidden="true">&gt;</span>
                <a className="detail-crumb" href="/portfolio">Projects</a>
                <span className="detail-crumb-sep" aria-hidden="true">&gt;</span>
                <span className="detail-crumb-current" aria-current="page">{title}</span>
            </nav>

            <header className="detail-hero">
                <div className="detail-hero-text">
                    <h1>{title}</h1>
                    <p>{summary}</p>
                </div>
                <div className="detail-hero-actions">
                    {visitUrl ? (
                        <a className="rainbow-btn" href={visitUrl} target="_blank" rel="noreferrer">
                            <span className="rainbow-inner">
                                <svg className="rainbow-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M7 17l10-10M10 7h7v7"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span>Visit live</span>
                            </span>
                        </a>
                    ) : null}
                    {sourceUrl ? (
                        <a className="rainbow-btn dark" href={sourceUrl} target="_blank" rel="noreferrer">
                            <span className="rainbow-inner">
                                <svg className="rainbow-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M9 19c-3 1-3-2-4-2m8 4v-3c0-1 .4-2 1-2 0 0-4.5-.5-4.5-5a4 4 0 0 1 1-3c0-1 .1-2 1-2a6 6 0 0 1 3 1 6 6 0 0 1 3-1c.9 0 1 1 1 2a4 4 0 0 1 1 3c0 4.5-4.5 5-4.5 5 .6.5 1 1.3 1 2.5V21"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Star on GitHub</span>
                            </span>
                        </a>
                    ) : null}
                </div>
            </header>

            <section className="detail-meta">
                <div className="detail-meta-block">
                    <p className="detail-meta-label">Type</p>
                    <p className="detail-meta-value">{detail?.type ?? project.type}</p>
                </div>
                <div className="detail-meta-block">
                    <p className="detail-meta-label">Role</p>
                    <p className="detail-meta-value">{detail?.role ?? '—'}</p>
                </div>
                <div className="detail-meta-block">
                    <p className="detail-meta-label">Built</p>
                    <p className="detail-meta-value">{detail?.built ?? '—'}</p>
                </div>
                <div className="detail-meta-block">
                    <p className="detail-meta-label">Updated</p>
                    <p className="detail-meta-value">{detail?.updated ?? '—'}</p>
                </div>
                <div className="detail-meta-block">
                    <p className="detail-meta-label">Visit</p>
                    {visitUrl ? (
                        <a className="detail-meta-link" href={visitUrl} target="_blank" rel="noreferrer">
                            {visitUrl.replace('https://', '')}
                        </a>
                    ) : (
                        <p className="detail-meta-value">—</p>
                    )}
                </div>
                <div className="detail-meta-block">
                    <p className="detail-meta-label">Source</p>
                    {sourceUrl ? (
                        <a className="detail-meta-link" href={sourceUrl} target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                    ) : (
                        <p className="detail-meta-value">—</p>
                    )}
                </div>
                <div className="detail-meta-block detail-meta-tech">
                    <p className="detail-meta-label">Tech stack</p>
                    <div className="detail-tech">
                        {techStack.map((tag) => {
                            const icon = tagIconMap[tag]
                            return (
                                <span className="detail-tech-pill" key={tag}>
                                    {icon ? (
                                        <img className="detail-tech-icon" src={icon} alt="" aria-hidden="true" />
                                    ) : (
                                        <span className="detail-tech-dot" aria-hidden="true" />
                                    )}
                                    <span className="detail-tech-label">{tag}</span>
                                </span>
                            )
                        })}
                    </div>
                </div>
            </section>

            {heroVideo ? (
                <section className="detail-media">
                    <video className="detail-video" src={heroVideo} autoPlay loop muted playsInline />
                </section>
            ) : null}

            <section className="detail-sections">
                {(detail?.sections ?? []).map((section, index) => (
                    <article className="detail-section" key={section.title}>
                        <div className="detail-section-title">
                            <span className="detail-section-index">{String(index + 1).padStart(2, '0')}</span>
                            <h2>{section.title}</h2>
                        </div>
                        <div className="detail-section-body">
                            {section.body?.map((paragraph) => (
                                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
                            ))}
                            {section.bullets ? (
                                <ul>
                                    {section.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </article>
                ))}
            </section>

            {nextProject && portfolioProjects.length > 1 ? (
                <section className="detail-up-next" aria-label="Up next">
                    <div className="detail-up-next-heading">
                        <span>Up next</span>
                    </div>
                    <a
                        className="detail-up-next-card"
                        href={`/portfolio/${nextProject.id}`}
                        data-cursor="view-details"
                    >
                        <h3 className="detail-up-next-title">{nextProject.title}</h3>
                        <p className="detail-up-next-sub">{nextProject.subtitle}</p>
                        <div className="detail-up-next-meta">
                            <span className="detail-up-next-type">{nextProject.type ?? 'Project'}</span>
                            <span className="detail-up-next-action" aria-hidden="true">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M7 17l10-10M10 7h7v7"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </div>
                    </a>
                </section>
            ) : null}

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
                    <button className="impact-cta" type="button" onClick={handleOpenContact}>
                        <span>Get in touch</span>
                        <span className="impact-cta-icon" aria-hidden="true">→</span>
                    </button>
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
                                <a href="/#home">Home</a>
                                <a href="/#about">About</a>
                                <a href="/portfolio">Projects</a>
                                <a href="/#skills">Skills</a>
                            </div>
                            <div className="footer-col">
                                <p className="footer-heading">Specifics</p>
                                <a href="/#experience">Education & Certifications</a>
                                <a href={resumePdf} target="_blank" rel="noreferrer">Resume</a>
                                <a href="/#contact">Contact</a>
                                <a href="/#experience">Professional Journey</a>
                            </div>
                            <div className="footer-col">
                                <p className="footer-heading">More</p>
                                <a href="https://github.com/yashsinghal1234" target="_blank" rel="noreferrer">Links</a>
                                <a href="https://x.com/singhalyash307" target="_blank" rel="noreferrer">X (Twitter)</a>
                                <a href="/#privacy">Privacy</a>
                                <a href="/#terms">Terms</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copy">© 2026 Yash Singhal. All rights reserved.</p>
                        <div className="footer-legal">
                            <a href="/#privacy">Privacy Policy</a>
                            <a href="/#terms">Terms of Use</a>
                        </div>
                    </div>
                </footer>
                <div className="footer-bar" style={{ marginTop: '10px' }} aria-hidden="true" />
            </div>
        </div>
    )
}

export default PortfolioDetailPage
