import { useEffect, useRef, useState } from 'react'
import {
  AboutSection,
  ExperienceSection,
  NavBar,
  SearchOverlay,
  getFilteredGroups,
  useEscapeClose,
  useTimelineGlow,
} from './App.jsx'
import shivalikLogo from './assets/shivalik_logo.webp'
import awsCloudPractitionerCert from './assets/certificates/AWS Certified Cloud Practitioner certificate (1).pdf'
import cs50PythonCert from './assets/certificates/CS50P.pdf'
import hackerrankReactCert from './assets/certificates/frontend_developer_react certificate.pdf'
import nodeJsCert from './assets/certificates/node_js.pdf'
import oracleAiFoundationsCert from './assets/certificates/Oracle AI foundation Associate.pdf'
import pythonEssentialsCert from './assets/certificates/PythonEssential1_certificate_cisco.pdf'
import redHatLinuxCert from './assets/certificates/RedHat_os_certifiacte.pdf'
import mongodbCrudCert from './assets/certificates/SkillsCert20260129-32-wx0ke7.pdf'
import tcsIonCert from './assets/certificates/tcs_young_ion.pdf'

function AboutPage() {
  const githubUser = 'yashsinghal1234'
  const leetcodeUser = 'yash_singhal123'
  const codechefUser = 'yash_308'
  const codeforcesUser = 'singhal307'
  const codolioProfileUrl = 'https://r.jina.ai/http://codolio.com/profile/yashsinghal'
  const profileUrl = `https://github.com/${githubUser}`
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const timelineRef = useRef(null)
  const experienceRef = useRef(null)
  const [contributions, setContributions] = useState([])
  const [contributionTotal, setContributionTotal] = useState(0)
  const [weeks, setWeeks] = useState([])
  const [monthLabels, setMonthLabels] = useState([])
  const [stats, setStats] = useState({ followers: 0, repos: 0, stars: 0 })
  const [leetcodeWeeks, setLeetcodeWeeks] = useState([])
  const [leetcodeMonths, setLeetcodeMonths] = useState([])
  const [leetcodeStats, setLeetcodeStats] = useState({ solved: 0, rating: 0, rank: 0 })
  const [codechefStats, setCodechefStats] = useState({ solved: 0, rating: 0, stars: 0 })
  const [codeforcesStats, setCodeforcesStats] = useState({ rank: 'Unrated', rating: 0 })
  const [certificateQuery, setCertificateQuery] = useState('')
  const [activeCertificateTag, setActiveCertificateTag] = useState('All')
  const [certificateSort, setCertificateSort] = useState('newest')
  const certificates = [
    {
      id: 'cert-01',
      date: 'Jan 29, 2026',
      year: 2026,
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      summary: 'Foundational cloud certification covering AWS services, billing, and security.',
      issuedOn: 'January 29, 2026',
      validTill: 'January 29, 2029',
      credentialId: '1cef23cd9b46474d960ea4406e7b6d89',
      tags: ['cloud', 'aws', 'fundamentals'],
      link: awsCloudPractitionerCert,
      preview: awsCloudPractitionerCert,
    },
    {
      id: 'cert-02',
      date: '2025',
      year: 2025,
      title: 'CS50’s Introduction to Programming with Python',
      issuer: 'Harvard University',
      summary: 'Completed 9 problem sets and a final project in Python fundamentals.',
      issuedOn: '2025',
      location: 'Cambridge, Massachusetts',
      instructor: 'David J. Malan',
      tags: ['python', 'cs50', 'programming'],
      link: 'https://cs50.harvard.edu/certificates/72516af6-ebcf-4dd6-8db7-97ac98c50454',
      preview: cs50PythonCert,
    },
    {
      id: 'cert-03',
      date: 'Nov 12, 2025',
      year: 2025,
      title: 'Frontend Developer (React)',
      issuer: 'HackerRank',
      summary: 'Passed the HackerRank Role Certification Test for Frontend Developer (React).',
      issuedOn: 'November 12, 2025',
      credentialId: 'AFF20365FF41',
      tags: ['frontend', 'react', 'javascript'],
      link: hackerrankReactCert,
      preview: hackerrankReactCert,
    },
    {
      id: 'cert-04',
      date: 'Jun 03, 2025',
      year: 2025,
      title: 'Python Essentials 1',
      issuer: 'Cisco Networking Academy · OpenEDG Python Institute',
      summary: 'Python fundamentals covering syntax, libraries, and algorithmic thinking.',
      issuedOn: 'June 03, 2025',
      tags: ['python', 'fundamentals'],
      link: pythonEssentialsCert,
      preview: pythonEssentialsCert,
    },
    {
      id: 'cert-05',
      date: 'Sep 06, 2025',
      year: 2025,
      title: 'Getting Started with Linux Fundamentals (RH104)',
      issuer: 'Red Hat, Inc.',
      summary: 'Certificate of attendance for Linux fundamentals and system basics.',
      issuedOn: 'September 06, 2025',
      credentialId: 'RH104 · RHA (v9.1)',
      tags: ['linux', 'devops', 'systems'],
      link: 'https://www.credly.com/badges/5e186bc0-57b0-4f88-9d72-02ca5e8762af',
      preview: redHatLinuxCert,
    },
    {
      id: 'cert-06',
      date: 'May 24, 2025',
      year: 2025,
      title: 'TCS iON Career Edge – Young Professional',
      issuer: 'TCS iON (Tata Consultancy Services)',
      summary: 'Career readiness program covering communication, business etiquette, and IT basics.',
      issuedOn: 'May 24, 2025',
      credentialId: '240640-28321817-1016',
      tags: ['career', 'soft-skills', 'professional'],
      link: tcsIonCert,
      preview: tcsIonCert,
    },
    {
      id: 'cert-07',
      date: 'Nov 13, 2025',
      year: 2025,
      title: 'Introduction to Node.js (LFW111)',
      issuer: 'The Linux Foundation',
      summary: 'Completed the LFW111 course covering Node.js fundamentals and runtime basics.',
      issuedOn: 'November 13, 2025',
      credentialId: 'LF-69o5a51ho2',
      tags: ['node', 'backend', 'javascript'],
      link: nodeJsCert,
      preview: nodeJsCert,
    },
    {
      id: 'cert-08',
      date: 'Sep 20, 2025',
      year: 2025,
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle University (Oracle Corporation)',
      summary: 'Validated OCI AI foundations, cloud concepts, and responsible AI basics.',
      issuedOn: 'September 20, 2025',
      validTill: 'September 20, 2027',
      credentialId: '102704196OCI25AICFA',
      tags: ['oracle', 'cloud', 'ai'],
      link: oracleAiFoundationsCert,
      preview: oracleAiFoundationsCert,
    },
    {
      id: 'cert-09',
      date: 'Jan 29, 2026',
      year: 2026,
      title: 'CRUD Operations in MongoDB',
      issuer: 'MongoDB, Inc.',
      summary: 'MongoDB skill badge covering CRUD operations and core database workflows.',
      issuedOn: 'January 29, 2026',
      credentialId: '1b0e93a4-45c5-4ae0-96a1-eba6368f5f37',
      tags: ['mongodb', 'database', 'backend'],
      link: 'https://www.credly.com/badges/1b0e93a4-45c5-4ae0-96a1-eba6368f5f37',
      preview: mongodbCrudCert,
    },
  ]
  const certificateTags = ['All', 'cloud', 'aws', 'python', 'devops', 'backend', 'frontend', 'database', 'ai']
  const certificateQueryLower = certificateQuery.trim().toLowerCase()
  const filteredCertificates = certificates.filter((cert) => {
    const matchesTag =
      activeCertificateTag === 'All' ||
      (cert.tags || []).includes(activeCertificateTag)
    if (!matchesTag) return false
    if (!certificateQueryLower) return true
    const haystack = [cert.title, cert.issuer, cert.summary, cert.duration]
      .concat(cert.tags || [])
      .join(' ')
      .toLowerCase()
    return haystack.includes(certificateQueryLower)
  })
  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    const yearA = a.year || Number(a.date) || 0
    const yearB = b.year || Number(b.date) || 0
    const titleA = a.title.toLowerCase()
    const titleB = b.title.toLowerCase()

    switch (certificateSort) {
      case 'oldest':
        return yearA - yearB
      case 'az':
        return titleA.localeCompare(titleB)
      case 'za':
        return titleB.localeCompare(titleA)
      case 'newest':
      default:
        return yearB - yearA
    }
  })

  useTimelineGlow(timelineRef, experienceRef)
  useEscapeClose(isSearchOpen, () => setIsSearchOpen(false))

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
        setContributions(sorted)
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
          setContributions([])
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

  useEffect(() => {
    let cancelled = false
    const loadLeetCode = async () => {
      try {
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUser}`)
        if (!response.ok) return
        const data = await response.json()

        const totalSolved = Number(data?.totalSolved || 0)
        const rating = Number(
          data?.contestRating || data?.contestRating?.rating || data?.rating || 0
        )
        const rank = Number(data?.ranking || 0)
        const calendar = data?.submissionCalendar || {}
        const contributionMap = new Map()
        Object.entries(calendar).forEach(([timestamp, count]) => {
          const dateKey = new Date(Number(timestamp) * 1000).toISOString().slice(0, 10)
          contributionMap.set(dateKey, (contributionMap.get(dateKey) || 0) + Number(count || 0))
        })

        const endDate = new Date()
        const startDate = new Date()
        startDate.setFullYear(endDate.getFullYear() - 1)
        const start = new Date(startDate)
        start.setDate(start.getDate() - start.getDay())
        const end = new Date(endDate)
        end.setDate(end.getDate() + (6 - end.getDay()))

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

        if (!cancelled) {
          setLeetcodeStats((prev) => ({
            solved: totalSolved,
            rating: rating ? Math.round(rating) : prev.rating,
            rank,
          }))
          setLeetcodeWeeks(nextWeeks)
          setLeetcodeMonths(nextMonthLabels)
        }
      } catch (error) {
        if (!cancelled) {
          setLeetcodeStats({ solved: 0, rating: 0, rank: 0 })
          setLeetcodeWeeks([])
          setLeetcodeMonths([])
        }
      }
    }

    loadLeetCode()
    return () => {
      cancelled = true
    }
  }, [leetcodeUser])

  useEffect(() => {
    let cancelled = false
    const loadCodolioLeetCodeRating = async () => {
      try {
        const response = await fetch(codolioProfileUrl)
        if (!response.ok) return
        const text = await response.text()
        const ratingMatch = text.match(/LEETCODE[\s\S]*?###\s*(\d{3,4})/i)
        const rating = ratingMatch ? Number(ratingMatch[1]) : 0
        if (!cancelled && rating) {
          setLeetcodeStats((prev) => ({ ...prev, rating }))
        }
      } catch (error) {
        // Ignore Codolio errors; rating will stay as-is.
      }
    }

    loadCodolioLeetCodeRating()
    return () => {
      cancelled = true
    }
  }, [codolioProfileUrl])

  useEffect(() => {
    let cancelled = false
    const loadCodeChef = async () => {
      try {
        const response = await fetch(`https://r.jina.ai/http://codechef.com/users/${codechefUser}`)
        if (!response.ok) return
        const text = await response.text()
        const solvedMatch = text.match(/Total Problems Solved:\s*(\d+)/i)
        const ratingMatch = text.match(/Highest Rating\s*(\d{3,4})/i)
        const starsMatch = text.match(/Username:\s*([0-9])★/i)
        const solved = solvedMatch ? Number(solvedMatch[1]) : 0
        const rating = ratingMatch ? Number(ratingMatch[1]) : 0
        const stars = starsMatch ? Number(starsMatch[1]) : 0
        if (!cancelled) {
          setCodechefStats({ solved, rating, stars })
        }
      } catch (error) {
        if (!cancelled) {
          setCodechefStats({ solved: 0, rating: 0, stars: 0 })
        }
      }
    }

    loadCodeChef()
    return () => {
      cancelled = true
    }
  }, [codechefUser])

  useEffect(() => {
    let cancelled = false
    const loadCodeforces = async () => {
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.info?handles=${codeforcesUser}`
        )
        if (!response.ok) return
        const data = await response.json()
        const profile = Array.isArray(data?.result) ? data.result[0] : null
        if (!cancelled) {
          setCodeforcesStats({
            rank: profile?.rank || 'Unrated',
            rating: Math.round(profile?.rating || 0),
          })
        }
      } catch (error) {
        if (!cancelled) {
          setCodeforcesStats({ rank: 'Unrated', rating: 0 })
        }
      }
    }

    loadCodeforces()
    return () => {
      cancelled = true
    }
  }, [codeforcesUser])

  const getIntensity = (count) => {
    if (count <= 0) return 'empty'
    if (count <= 2) return 'low'
    if (count <= 5) return 'mid'
    if (count <= 9) return 'high'
    return 'max'
  }

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
      <section className="education-section" id="education" aria-label="Education">
        <div className="open-source-header">
          <p className="open-source-kicker">EDUCATION</p>
          <h2 className="open-source-title">
            Academic <span>Journey</span>
          </h2>
        </div>

        <div className="education-grid">
          <article className="education-card">
            <div className="education-meta">
              <div className="education-brand">
                <img
                  className="education-logo"
                  src="https://kiet.edu/assets/images/logo/KIET-Logo.jpg"
                  alt="KIET Group of Institutions"
                  loading="lazy"
                />
                <div>
                  <p className="education-label">KIET Group of Institutions</p>
                  <p className="education-title">B.Tech, Computer Science</p>
                  <p className="education-subtitle">2024 - 2028 · CGPA 8.77</p>
                </div>
              </div>
              <p className="education-focus">
                Focused on system design, software engineering, and practical problem solving.
              </p>
            </div>
            <ul className="education-list">
              <li>Core subjects: DSA, Operating Systems, DBMS, Computer Networks.</li>
              <li>Specialized coursework in IoT, distributed systems, and DevOps.</li>
              <li>Built full-stack projects and data-driven applications.</li>
              <li>Practiced competitive programming and algorithm design.</li>
            </ul>
          </article>

          <article className="education-card">
            <div className="education-meta">
              <div className="education-brand">
                <img
                  className="education-logo"
                  src={shivalikLogo}
                  alt="Shivalik Cambridge College"
                  loading="lazy"
                />
                <div>
                  <p className="education-label">Shivalik Cambridge College</p>
                  <p className="education-title">Class XII (PCM + Physical Education)</p>
                  <p className="education-subtitle">CBSE · 89% in board exams</p>
                </div>
              </div>
              <p className="education-focus">
                Strong foundation in analytical problem solving and core science disciplines.
              </p>
            </div>
            <ul className="education-list">
              <li>Physics, Chemistry, Mathematics, and Physical Education.</li>
              <li>Focused on structured problem solving and logical reasoning.</li>
              <li>Participated in school singing competitions and cultural events.</li>
            </ul>
          </article>

          <article className="education-card">
            <div className="education-meta">
              <div className="education-brand">
                <img
                  className="education-logo"
                  src={shivalikLogo}
                  alt="Shivalik Cambridge College"
                  loading="lazy"
                />
                <div>
                  <p className="education-label">Shivalik Cambridge College</p>
                  <p className="education-title">Class X</p>
                  <p className="education-subtitle">CBSE · 93% in board exams</p>
                </div>
              </div>
              <p className="education-focus">
                Built strong fundamentals across science and mathematics.
              </p>
            </div>
            <ul className="education-list">
              <li>Developed core problem-solving and analytical skills.</li>
              <li>Active in academics and school activities.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="certificates-section" id="certificates" aria-label="Certificates">
        <div className="certificates-shell">
          <header className="certificates-header">
            <span className="certificates-kicker">THE ARCHIVE</span>
            <h2 className="certificates-title">
              Handpicked <span>Certificates</span>
            </h2>
            <p className="certificates-subtitle">A curated list of verified credentials.</p>
          </header>

          <div className="certificates-layout">
            <aside className="certificates-sidebar" aria-label="Certificates filters">
              <div className="certificates-sidebar-block">
                <p className="certificates-sidebar-label">EXPLORE</p>
                <div className="certificates-sidebar-row">
                  <p className="certificates-sidebar-title">Library</p>
                  <label className="certificates-sort">
                    <span className="certificates-sort-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M7 4v14m0 0l-3-3m3 3l3-3M17 20V6m0 0l-3 3m3-3l3 3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <select
                      value={certificateSort}
                      onChange={(event) => setCertificateSort(event.target.value)}
                      aria-label="Sort certificates"
                    >
                      <option value="newest">New to old</option>
                      <option value="oldest">Old to new</option>
                      <option value="az">A to Z</option>
                      <option value="za">Z to A</option>
                    </select>
                  </label>
                </div>
                <p className="certificates-sidebar-meta">
                  Showing {sortedCertificates.length} certificates
                </p>
              </div>
              <div className="certificates-sidebar-block">
                <p className="certificates-sidebar-label">SEARCH</p>
                <label className="certificates-search">
                  <span className="certificates-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M16.5 16.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={certificateQuery}
                    onChange={(event) => setCertificateQuery(event.target.value)}
                    placeholder="Search certificates"
                  />
                </label>
              </div>
              <div className="certificates-sidebar-block">
                <p className="certificates-sidebar-label">TOPICS</p>
                <div className="certificates-tags">
                  {certificateTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`certificates-tag ${
                        activeCertificateTag === tag ? 'is-active' : ''
                      }`}
                      onClick={() => {
                        if (tag === 'All') {
                          setActiveCertificateTag('All')
                          return
                        }
                        setActiveCertificateTag((prev) => (prev === tag ? 'All' : tag))
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="certificates-feed">
              {sortedCertificates.map((cert) => (
                <article className="certificate-card" key={cert.id}>
                  <div className="certificate-copy">
                    <p className="certificate-date">{cert.date}</p>
                    <h3 className="certificate-title">{cert.title}</h3>
                    <p className="certificate-issuer">Organization: {cert.issuer}</p>
                    <p className="certificate-summary">{cert.summary}</p>
                    <div className="certificate-meta">
                      {cert.issuedOn ? <span>Issued {cert.issuedOn}</span> : null}
                      {cert.validTill ? <span>Valid till {cert.validTill}</span> : null}
                      {cert.credentialId ? <span>ID {cert.credentialId}</span> : null}
                      {cert.instructor ? <span>Instructor {cert.instructor}</span> : null}
                      {cert.location ? <span>{cert.location}</span> : null}
                      <a href={cert.link} className="certificate-link">
                        View Certificate →
                      </a>
                    </div>
                  </div>
                  <div className="certificate-cover" aria-hidden="true">
                    {cert.preview ? (
                      <object
                        data={cert.preview}
                        type="application/pdf"
                        aria-label={`${cert.title} preview`}
                      />
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ExperienceSection experienceRef={experienceRef} timelineRef={timelineRef} showGlow />

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

      <section className="open-source dsa-section" aria-label="DSA practice">
        <div className="open-source-header">
          <p className="open-source-kicker">DSA</p>
          <h2 className="open-source-title">
            Problem <span>Solving</span>
          </h2>
        </div>

        <div className="open-source-grid">
          <article className="open-source-card">
            <div className="open-source-profile">
              <div className="open-source-left">
                <a
                  className="open-source-link"
                  href="https://leetcode.com/u/yash_singhal123/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="open-source-avatar" aria-hidden="true">
                    <img src="https://cdn.simpleicons.org/leetcode/FFFFFF" alt="" />
                  </div>
                </a>
                <div className="open-source-meta">
                  <a
                    className="open-source-link"
                    href="https://leetcode.com/u/yash_singhal123/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="open-source-handle">LeetCode Activity</p>
                  </a>
                  <p className="open-source-subtitle">Daily problem solving streak</p>
                </div>
              </div>
              <div className="open-source-total">
                <p className="open-source-total-number">{leetcodeStats.solved}</p>
                <span className="open-source-total-label">QUESTIONS SOLVED</span>
              </div>
            </div>

            <div className="open-source-graph">
              <div
                className="open-source-months"
                style={{ '--week-count': leetcodeWeeks.length || 52 }}
              >
                {(leetcodeMonths.length
                  ? leetcodeMonths
                  : Array.from({ length: 52 }, () => '')
                ).map((month, index) => (
                  <span key={`${month}-${index}`}>{month}</span>
                ))}
              </div>
              <div
                className="open-source-cells"
                style={{ '--week-count': leetcodeWeeks.length || 52 }}
                aria-hidden="true"
              >
                {leetcodeWeeks.length
                  ? leetcodeWeeks.flatMap((week) =>
                      week.map((entry) => (
                        <span
                          key={entry.date}
                          className={`contribution-cell ${getIntensity(entry.count)}`}
                          title={`${entry.count} submissions on ${entry.date}`}
                        />
                      ))
                    )
                  : Array.from({ length: 52 * 7 }, (_, index) => (
                      <span key={index} className="contribution-cell empty" />
                    ))}
              </div>
              <div className="open-source-footer">
                <span>LeetCode submissions in the last year</span>
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
              <p className="stat-label">LeetCode</p>
              <p className="stat-value accent-pink">{leetcodeStats.solved}</p>
              <p className="stat-note">
                Rating {leetcodeStats.rating || 'N/A'}
                {leetcodeStats.rank ? ` · Rank ${leetcodeStats.rank}` : ''}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">CodeChef</p>
              <p className="stat-value accent-teal">{codechefStats.solved}</p>
              <p className="stat-note">
                Rating {codechefStats.rating || 'N/A'}
                {codechefStats.stars ? ` · ${'★'.repeat(codechefStats.stars)}` : ''}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Codeforces</p>
              <p className="stat-value accent-gold">{codeforcesStats.rank}</p>
              <p className="stat-note">Rating {codeforcesStats.rating || 'N/A'}</p>
            </div>
          </div>
        </div>
      </section>

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
                <a href="/#home">Home</a>
                <a href="/#about">About</a>
                <a href="/#projects">Projects</a>
                <a href="/#skills">Skills</a>
              </div>
              <div className="footer-col">
                <p className="footer-heading">Specifics</p>
                <a href="/#experience">Education & Certifications</a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
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
        <div className="footer-bar" style={{marginTop: '10px'}} aria-hidden="true" />
      </div>
    </div>
  )
}

export default AboutPage
