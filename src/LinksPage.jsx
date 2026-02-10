import { useState } from 'react'
import {
  ContactDialog,
  NavBar,
  SearchOverlay,
  getFilteredGroups,
  useEscapeClose,
} from './App.jsx'
import './LinksPage.css'
import profileImage from './assets/seedream-4-high-res-fal_Create_a_realistic_b.jpeg'
import linkedinIcon from './assets/icons/linkedin.svg'

const linkSections = [
  {
    title: 'Code & Craft',
    items: [
      {
        label: 'GitHub',
        sub: '@yashsinghal1234',
        href: 'https://github.com/yashsinghal1234',
        icon: 'https://cdn.simpleicons.org/github/FFFFFF',
      },
      {
        label: 'Guestbook',
        sub: 'Leave a note',
        href: '/#guestbook',
        icon: 'https://cdn.simpleicons.org/discourse/FFFFFF',
      },
    ],
  },
  {
    title: 'Connect',
    items: [
      {
        label: 'LinkedIn',
        sub: 'in/yash-singhal-94894b317',
        href: 'https://www.linkedin.com/in/yash-singhal-94894b317/',
        icon: linkedinIcon,
      },
      {
        label: 'Twitter / X',
        sub: '@singhalyash307',
        href: 'https://x.com/singhalyash307',
        icon: 'https://cdn.simpleicons.org/x/FFFFFF',
      },
      {
        label: 'Email',
        sub: 'singhalyash307@gmail.com',
        href: 'mailto:singhalyash307@gmail.com',
        icon: 'https://cdn.simpleicons.org/gmail/FFFFFF',
      },
      {
        label: 'Resume',
        sub: 'View PDF',
        href: '/resume.pdf',
        icon: 'https://cdn.simpleicons.org/readthedocs/FFFFFF',
      },
    ],
  },
  {
    title: 'Problem Solving',
    items: [
      {
        label: 'LeetCode',
        sub: 'yash_singhal123',
        href: 'https://leetcode.com/u/yash_singhal123/',
        icon: 'https://cdn.simpleicons.org/leetcode/FFFFFF',
      },
      {
        label: 'CodeChef',
        sub: 'yash_308',
        href: 'https://www.codechef.com/users/yash_308',
        icon: 'https://cdn.simpleicons.org/codechef/FFFFFF',
      },
      {
        label: 'Codeforces',
        sub: 'singhal307',
        href: 'https://codeforces.com/profile/singhal307',
        icon: 'https://cdn.simpleicons.org/codeforces/FFFFFF',
      },
    ],
  },
]

function LinksPage() {
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

  return (
    <div className="page links-page">
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

      <header className="links-hero">
        <p className="links-kicker">NETWORK</p>
        <h1 className="links-title">
          Connect With <span>Me</span>
        </h1>
      </header>

      <section className="links-layout" aria-label="Links">
        <aside className="links-profile">
          <div className="links-avatar">
            <img src={profileImage} alt="Yash Singhal" />
            <span className="links-status" aria-hidden="true" />
          </div>
          <h2>Yash Singhal</h2>
          <div className="links-tags">
            <span>Developer</span>
            <span>Freelancer</span>
          </div>
          <div className="links-meta">
            <div>
              <span className="links-meta-icon" aria-hidden="true">📍</span>
              <span>India</span>
            </div>
            <div>
              <span className="links-meta-icon" aria-hidden="true">✉</span>
              <span>singhalyash307@gmail.com</span>
            </div>
          </div>
        </aside>

        <div className="links-sections">
          {linkSections.map((section) => (
            <div className="links-section" key={section.title}>
              <p className="links-section-title">{section.title}</p>
              <div className="links-grid">
                {section.items.map((item) => (
                  <a
                    key={item.label}
                    className="links-card"
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="links-card-icon" aria-hidden="true">
                      <img
                        src={item.icon}
                        alt=""
                        className={item.label === 'LinkedIn' ? 'links-icon-linkedin' : undefined}
                      />
                    </span>
                    <div>
                      <p className="links-card-label">{item.label}</p>
                      <p className="links-card-sub">{item.sub}</p>
                    </div>
                    <span className="links-card-arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LinksPage
