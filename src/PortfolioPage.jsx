import { useEffect, useState } from 'react'
import {
    ContactDialog,
    CustomCursor,
    NavBar,
    SearchOverlay,
    getFilteredGroups,
    portfolioProjects,
    useEscapeClose,
} from './App.jsx'
import './PortfolioPage.css'
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
    'Express.js': 'https://cdn.simpleicons.org/express/FFFFFF',
    MongoDB: 'https://cdn.simpleicons.org/mongodb/47A248',
    Vite: 'https://cdn.simpleicons.org/vite/646CFF',
    'Sanity CMS': 'https://cdn.simpleicons.org/sanity/F03E2F',
    Markdown: 'https://cdn.simpleicons.org/markdown/FFFFFF',
}

function PortfolioPage() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const githubUser = 'yashsinghal1234'
    const profileUrl = `https://github.com/${githubUser}`
    const [contributionTotal, setContributionTotal] = useState(0)
    const [weeks, setWeeks] = useState([])
    const [monthLabels, setMonthLabels] = useState([])
    const [stats, setStats] = useState({ followers: 0, repos: 0, stars: 0 })

    useEscapeClose(isSearchOpen, () => setIsSearchOpen(false))
    useEscapeClose(isContactOpen, () => setIsContactOpen(false))

    const handleOpenContact = (event) => {
        if (event) event.preventDefault()
        setIsContactOpen(true)
    }

    const filteredGroups = getFilteredGroups(searchQuery)

    useEffect(() => {
        let cancelled = false
        const loadContributions = async () => {
            try {
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`
                )
                if (!response.ok) return
                const data = await response.json()
                if (cancelled || !Array.isArray(data?.contributions)) return
                const total = data.contributions.reduce(
                    (sum, entry) => sum + (entry.count || 0),
                    0
                )
                const sorted = [...data.contributions].sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                )
                setContributionTotal(total)

                const startDate = new Date(sorted[0].date)
                const endDate = new Date(sorted[sorted.length - 1].date)
                const start = new Date(startDate)
                start.setDate(start.getDate() - start.getDay())
                const end = new Date(endDate)
                end.setDate(end.getDate() + (6 - end.getDay()))

                const contributionMap = new Map(sorted.map((entry) => [entry.date, entry.count]))
                const nextWeeks = []
                const nextMonthLabels = []
                let cursor = new Date(start)
                while (cursor <= end) {
                    const week = []
                    const label = cursor.getDate() <= 7
                        ? cursor.toLocaleString('en-US', { month: 'short' })
                        : ''
                    nextMonthLabels.push(label)
                    for (let day = 0; day < 7; day += 1) {
                        const dateKey = cursor.toISOString().slice(0, 10)
                        week.push({ date: dateKey, count: contributionMap.get(dateKey) || 0 })
                        cursor.setDate(cursor.getDate() + 1)
                    }
                    nextWeeks.push(week)
                }
                setWeeks(nextWeeks)
                setMonthLabels(nextMonthLabels)
            } catch (error) {
                if (!cancelled) {
                    setContributionTotal(0)
                    setWeeks([])
                    setMonthLabels([])
                }
            }
        }

        loadContributions()
        return () => {
            cancelled = true
        }
    }, [githubUser])

    useEffect(() => {
        let cancelled = false
        const loadStats = async () => {
            try {
                const profileResponse = await fetch(`https://api.github.com/users/${githubUser}`)
                if (!profileResponse.ok) return
                const profileData = await profileResponse.json()

                let stars = 0
                let page = 1
                while (true) {
                    const reposResponse = await fetch(
                        `https://api.github.com/users/${githubUser}/repos?per_page=100&page=${page}`
                    )
                    if (!reposResponse.ok) break
                    const repos = await reposResponse.json()
                    if (!Array.isArray(repos) || repos.length === 0) break
                    repos.forEach((repo) => {
                        stars += repo.stargazers_count || 0
                    })
                    if (repos.length < 100) break
                    page += 1
                }

                if (!cancelled) {
                    setStats({
                        followers: profileData.followers || 0,
                        repos: profileData.public_repos || 0,
                        stars,
                    })
                }
            } catch (error) {
                if (!cancelled) {
                    setStats({ followers: 0, repos: 0, stars: 0 })
                }
            }
        }

        loadStats()
        return () => {
            cancelled = true
        }
    }, [githubUser])

    const getIntensity = (count) => {
        if (count <= 0) return 'empty'
        if (count <= 2) return 'low'
        if (count <= 5) return 'mid'
        if (count <= 9) return 'high'
        return 'max'
    }

    return (
        <div className="page portfolio-page">
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

            <header className="portfolio-hero">
                <p className="portfolio-kicker">Case studies</p>
                <h1 className="portfolio-title">Curated <span>work</span></h1>
                <p className="portfolio-sub">
                    A focused collection of product builds spanning full-stack systems, product design, and
                    modern UI engineering.
                </p>
            </header>

            <section className="portfolio-timeline" id="projects" aria-label="Projects">
                {portfolioProjects.map((project, index) => {
                    const indexLabel = String(index + 1).padStart(2, '0')
                    const typeLabel = project.type ?? 'Project'
                    const dateLabel = project.date ?? '2026'
                    const detailHref = `/portfolio/${project.id}`

                    return (
                        <article
                            key={project.id}
                            id={project.id}
                            className={`portfolio-item ${index % 2 === 0 ? 'is-left' : 'is-right'} ${project.accent ?? ''}`}
                        >
                            <div className="portfolio-meta">
                                <span className="portfolio-index">{indexLabel}</span>
                                <span className="portfolio-type">{typeLabel}</span>
                                <span className="portfolio-date">{dateLabel}</span>
                            </div>
                            <h2 className="portfolio-name">{project.title}</h2>
                            <a className="portfolio-card" href={detailHref} aria-label={`View ${project.title} case study`}>
                                <p className="portfolio-summary">{project.subtitle}</p>
                                <div className="portfolio-media">
                                    <div className="portfolio-media-frame">
                                        {project.media?.type === 'video' ? (
                                            <video
                                                className="portfolio-video"
                                                src={project.media.src}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <div className="portfolio-media-placeholder" aria-hidden="true" />
                                        )}
                                    </div>
                                </div>
                            </a>
                            <p className="portfolio-description">{project.description}</p>
                            <ul className="portfolio-bullets">
                                {project.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                            <div className="portfolio-tags">
                                {project.tags.map((tag) => {
                                    const icon = tagIconMap[tag]
                                    return (
                                        <span className="portfolio-tag" key={tag}>
                                            {icon ? (
                                                <img className="portfolio-tag-icon" src={icon} alt="" aria-hidden="true" />
                                            ) : (
                                                <span className="portfolio-tag-dot" aria-hidden="true" />
                                            )}
                                            <span className="portfolio-tag-label">{tag}</span>
                                        </span>
                                    )
                                })}
                            </div>
                        </article>
                    )
                })}
            </section>

            <section className="open-source" aria-label="Open source activity">
                <div className="open-source-header">
                    <p className="open-source-kicker">OPEN SOURCE</p>
                    <h2 className="open-source-title">
                        Code &amp; <span>Contributions</span>
                    </h2>
                </div>

                <div className="open-source-grid">
                    <article className="open-source-card">
                        <div className="open-source-profile">
                            <div className="open-source-left">
                                <a className="open-source-link" href={profileUrl} target="_blank" rel="noreferrer">
                                    <div className="open-source-avatar" aria-hidden="true">
                                        <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="" />
                                    </div>
                                </a>
                                <div className="open-source-meta">
                                    <a className="open-source-link" href={profileUrl} target="_blank" rel="noreferrer">
                                        <p className="open-source-handle">@{githubUser}</p>
                                    </a>
                                    <p className="open-source-subtitle">Contribution Graph</p>
                                </div>
                            </div>
                            <div className="open-source-total">
                                <p className="open-source-total-number">{contributionTotal || 0}</p>
                                <span className="open-source-total-label">LAST 12 MONTHS</span>
                            </div>
                        </div>

                        <div className="open-source-graph">
                            <div
                                className="open-source-months"
                                style={{ '--week-count': weeks.length || 52 }}
                            >
                                {(monthLabels.length ? monthLabels : Array.from({ length: 52 }, () => '')).map(
                                    (month, index) => (
                                        <span key={`${month}-${index}`}>{month}</span>
                                    )
                                )}
                            </div>
                            <div
                                className="open-source-cells"
                                style={{ '--week-count': weeks.length || 52 }}
                                aria-hidden="true"
                            >
                                {weeks.length
                                    ? weeks.flatMap((week) =>
                                        week.map((entry) => (
                                            <span
                                                key={entry.date}
                                                className={`contribution-cell ${getIntensity(entry.count)}`}
                                                title={`${entry.count} contributions on ${entry.date}`}
                                            />
                                        ))
                                    )
                                    : Array.from({ length: 52 * 7 }, (_, index) => (
                                        <span key={index} className="contribution-cell empty" />
                                    ))}
                            </div>
                            <div className="open-source-footer">
                                <span>{contributionTotal} contributions in the last year</span>
                                <div className="open-source-legend">
                                    <span>Less</span>
                                    <div className="legend-scale">
                                        <span className="contribution-cell empty" />
                                        <span className="contribution-cell low" />
                                        <span className="contribution-cell mid" />
                                        <span className="contribution-cell high" />
                                        <span className="contribution-cell max" />
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="open-source-stats">
                        <div className="stat-card">
                            <p className="stat-label">Followers</p>
                            <p className="stat-value accent-pink">{stats.followers}</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Repos</p>
                            <p className="stat-value accent-teal">{stats.repos}</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">GitHub Stars</p>
                            <p className="stat-value accent-gold">{stats.stars}</p>
                        </div>
                    </div>
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
                                <a href="/#projects">Projects</a>
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

export default PortfolioPage
