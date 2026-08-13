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
    'phishshield-x': {
        title: 'PhishShield-X',
        type: 'Web App / Cyber Threat Framework',
        role: 'Security Engineer',
        built: '2026 (Ongoing)',
        sourceUrl: 'https://github.com/yashsinghal1234/PhishShield-X',
        summary:
            'PhishShield-X is an adaptive multi-modal cyber threat detection framework designed to intelligently detect phishing attempts and malicious URLs.',
        techStack: [
            'React',
            'FastAPI',
            'Python',
            'TensorFlow',
            'Tailwind CSS'
        ],
        sections: [
            {
                title: 'Why I Built This',
                body: [
                    'Traditional phishing detection systems are fundamentally flawed. They rely too heavily on static blocklists, which are perpetually one step behind attackers who register new domains daily. I realized that to catch zero-day phishing attacks, a system needs to behave less like a simple filter and more like an enterprise-grade Security Operations Center (SOC).',
                    'Attackers are also shifting tactics—moving away from just malicious links to "Quishing" (QR code phishing) and sophisticated email spoofing. I built PhishShield-X to bridge the gap between static analysis and intelligent, real-time threat detection across multiple vectors.',
                    'The goal was to create a Defense-in-Depth pipeline that doesn’t just output a blind score, but interrogates the threat from multiple angles—structural, lexical, and behavioral—to provide Explainable AI (XAI) insights.'
                ],
            },
            {
                title: 'How It Works (The Defense-in-Depth Pipeline)',
                body: [
                    'When a URL or QR code is submitted to PhishShield-X, it goes through a multi-layered interrogation process in milliseconds. The system uses a Three-Tier Risk Classification to balance strict security with false-positive prevention.'
                ],
                bullets: [
                    'The Bouncer (Whitelist): Checks the domain against the top 100,000 safest global websites to ensure blazing-fast performance on legitimate traffic.',
                    'The Brain (Deep Learning): A custom-trained 1D Convolutional Neural Network (CNN) analyzes the URL string’s character entropy and structural patterns to identify obfuscation.',
                    'The Detectives (Live APIs): Queries VirusTotal and Google Safe Browsing across 70+ global security vendors in real-time.',
                    'Live Heuristics & Interrogation: Performs WHOIS domain age checks, Typosquatting/Homograph analysis, and active SSL/TLS querying.',
                    'The QR Decoder: Uses OpenCV to analyze QR module density and error correction levels, while unrolling hidden URLs via active HEAD requests.',
                    'Email Fraud Engine: Parses raw .eml headers to validate SPF/DKIM/DMARC and detect Return-Path impersonation.'
                ],
            },
            {
                title: 'Key Decisions & Challenges',
                body: [
                    'One of the hardest problems was dealing with conflicting evidence. What happens if the Deep Learning model is 95% confident a URL is phishing, but Google Safe Browsing says it is clean? To solve this, I engineered an Override Logic system.',
                    'The system weighs live API data against heuristic and ML scores, gracefully downgrading uncertain threats to a "Suspicious (41% - 74%)" warning rather than a hard block.',
                    'Another major hurdle was defeating QR code obfuscation. Attackers often use high Error Correction Levels (ECL) to embed fake bank logos inside QR codes, combined with obscure URL shorteners. I solved this by implementing a Multimodal Fusion Engine that analyzes both the visual structure of the matrix and actively unrolls the lexical payload.'
                ],
            },
            {
                title: 'What I Learned',
                body: [
                    'Building PhishShield-X taught me that cybersecurity engineering is as much about orchestration as it is about algorithms. Integrating a Deep Learning model with live network requests (like WHOIS and SSL handshakes) in a highly concurrent FastAPI backend completely changed how I think about system architecture and latency optimization.'
                ],
            },
        ],
    },
    'sanrachna': {
        title: 'Sanrachna',
        type: 'Web App',
        role: 'Full-stack Developer',
        built: '2026',
        visitUrl: 'https://sanrachna-final.vercel.app',
        sourceUrl: 'https://github.com/yashsinghal1234/sanrachna_final',
        summary:
            'An AI-enabled construction management ecosystem for planning, workforce coordination, issue tracking, and predictive analytics.',
        techStack: [
            'React',
            'Node.js',
            'TypeScript',
            'FastAPI',
            'MongoDB'
        ],
        sections: [
            {
                title: 'Why I Built This',
                body: [
                    '"Sanrachna" translates to structure, architecture, and intelligent construction systems. I built this platform because I noticed a massive operational gap in the construction industry: projects are incredibly complex, yet teams often rely on fragmented communication, manual clipboard reporting, and disconnected tools.',
                    'When site engineers, supervisors, and project owners aren’t looking at the same real-time data, it leads to delayed decision-making, blown budgets, and safety hazards.',
                    'I wanted to create a unified ecosystem that doesn’t just act as a digital filing cabinet, but actively assists the team using AI to predict bottlenecks and streamline workflows.'
                ],
            },
            {
                title: 'How It Works',
                body: [
                    'Sanrachna serves as the central nervous system for a construction site. It offers role-based dashboards that adapt to whether the user is a field worker submitting a daily log or a project owner monitoring the overall burn rate.'
                ],
                bullets: [
                    'AI Planning Studio: Generates complete project execution plans, breaking down milestones and assisting with resource allocation.',
                    'Real-Time Dashboard: Tracks live project health, timeline progress, and cost burn-rate analytics.',
                    'Smart Task Management: Role-based assignments with lifecycle monitoring for field teams.',
                    'Daily Progress Logs: Allows workers to submit structured on-site reports for engineering approval.',
                    'Safety & Emergency Management: Features severity-based emergency classification and an audit trail for incident reporting.'
                ],
            },
            {
                title: 'Key Decisions & Challenges',
                body: [
                    'A major engineering challenge was designing a robust state architecture that could handle offline-first scenarios or spotty network connections typically found on active construction sites. Ensuring that daily progress logs and safety incidents sync reliably when the connection is restored was critical.',
                    'Integrating the AI Copilot via a FastAPI microservice allowed me to separate the heavy machine learning tasks (like schedule optimization and cost prediction) from the core Node.js transactional backend. This prevented the main API from blocking during intense AI generation tasks.'
                ],
            },
        ],
    },
    'kaya-forgery-detection': {
        title: 'Kaya Forgery Detection',
        type: 'Web App',
        role: 'AI Developer',
        built: '2026',
        visitUrl: 'https://kaya-forgery-detection.onrender.com',
        sourceUrl: 'https://github.com/yashsinghal1234/Kaya-Forgery_Detection',
        summary:
            'Kaya is an AI-powered forgery detection system that analyzes images, PDFs, and source code to identify tampering or fraud.',
        techStack: [
            'Python',
            'Machine Learning'
        ],
        sections: [
            {
                title: 'Why I Built This',
                body: [
                    'With the rapid proliferation of Generative AI (LLMs) and advanced image manipulation tools, the digital world is facing a crisis of authenticity. It has become trivially easy to forge documents, manipulate images, or generate thousands of lines of synthetic source code.',
                    'I built Kaya to act as a digital forensic investigator. The goal was to provide a tool that doesn’t just say "this is fake," but provides a confidence-based forensic report analyzing exactly where and how a file was manipulated.'
                ],
            },
            {
                title: 'How It Works',
                body: [
                    'Kaya provides a streamlined workflow where users upload a suspicious file (an image, a PDF, or a code snippet). The backend routes the file to the appropriate forensic engine.'
                ],
                bullets: [
                    'AI Code Detection: Trained on datasets like the AIGCodeSet from Hugging Face to identify subtle statistical markers and token distributions unique to LLM-generated code.',
                    'Image Forensics: Analyzes pixel-level compression artifacts and metadata inconsistencies to detect splicing or manipulation.',
                    'PDF Tampering: Inspects the internal structure of PDFs to identify unauthorized modifications to text or signatures.',
                    'Reporting: Generates downloadable, professional forensic reports detailing confidence scores and analysis vectors.'
                ],
            },
            {
                title: 'What I Learned',
                body: [
                    'Training the code detector taught me the nuances of natural language processing applied to formal programming languages. I learned how to manage large-scale datasets, handle tokenization for code, and deal with the high variance between human-written and machine-generated syntax.'
                ],
            },
        ],
    },
    'kts-site': {
        title: 'KTS Official Site',
        type: 'Web App',
        role: 'Frontend Engineer',
        built: '2026',
        sourceUrl: 'https://github.com/yashsinghal1234/kts_site',
        summary:
            'A modern, responsive official website leveraging Next.js for server-side rendering and performance.',
        techStack: [
            'Next.js',
            'React',
            'TypeScript',
            'Tailwind CSS'
        ],
        sections: [
            {
                title: 'Why I Built This',
                body: [
                    'Corporate and official websites often suffer from bloat, slow time-to-interactive (TTI), and poor SEO because they rely on heavy client-side rendering or outdated CMS platforms.',
                    'I built the KTS Official Site to deliver a premium, lightning-fast user experience that respects modern web vitals while providing a highly maintainable codebase for the engineering team.'
                ],
            },
            {
                title: 'How It Works',
                body: [
                    'The site is built on the Next.js App Router paradigm, heavily utilizing React Server Components (RSC) to ship zero-javascript HTML to the client wherever possible.'
                ],
                bullets: [
                    'Server-Side Rendering (SSR) and Static Site Generation (SSG) for instantaneous page loads.',
                    'Strict TypeScript adoption across the entire component tree to eliminate runtime type errors.',
                    'Tailwind CSS for a highly cohesive and responsive design system that adapts fluidly to any device viewport.',
                    'Optimized asset loading using next/font (Geist) and next/image to prevent layout shifts (CLS).'
                ],
            },
            {
                title: 'Key Decisions & What I Learned',
                body: [
                    'One of the best decisions was moving away from traditional global stylesheets and embracing utility-first CSS. This prevented the styling from degrading as the site grew. Additionally, working deeply with the Next.js App Router solidified my understanding of server vs. client boundaries, data fetching strategies, and how to properly cache aggressive edge routes.'
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
