import { useState, useEffect, useCallback } from 'react'
import './AdminPage.css'

// ─── Constants ───────────────────────────────────────────────────────────────
const ADMIN_CREDS_KEY = 'portfolio_admin_creds'
const GITHUB_CONFIG_KEY = 'portfolio_github_config'
const REPO_OWNER = 'yashsinghal1234'
const REPO_NAME = 'Portfolio'
const FILE_PATH = 'public/projects.json'
const BRANCH = 'main'

// ─── Default new project template ────────────────────────────────────────────
const newProjectTemplate = () => ({
  id: '',
  title: '',
  type: 'Web app',
  date: new Date().getFullYear().toString(),
  subtitle: '',
  description: '',
  bullets: ['', '', ''],
  tags: [],
  accent: 'violet',
  githubUrl: '',
  liveUrl: '',
  visible: true,
})

// ─── Helper: slug from title ──────────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ─── GitHub API helpers ───────────────────────────────────────────────────────
async function getFileSha(token) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } }
  )
  if (!res.ok) throw new Error(`GitHub API error ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.sha
}

async function commitProjects(token, projects, sha) {
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(projects, null, 2))))
  const body = {
    message: `chore: update projects.json [skip ci]`,
    content,
    sha,
    branch: BRANCH,
  }
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) throw new Error(`Commit failed: ${await res.text()}`)
  return await res.json()
}

// ─── Toast component ──────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="admin-toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`admin-toast admin-toast-${t.type}`}>
          <span className="admin-toast-icon">{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const STORED = JSON.parse(localStorage.getItem(ADMIN_CREDS_KEY) || 'null')
  const DEFAULT_USER = STORED?.username || 'admin'
  const DEFAULT_PASS = STORED?.password || 'portfolio2026'

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === DEFAULT_USER && password === DEFAULT_PASS) {
      onLogin()
    } else {
      setError('Invalid credentials')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="admin-login-bg">
      <div className={`admin-login-card ${shake ? 'shake' : ''}`}>
        <div className="admin-login-logo">
          <span className="admin-login-mark">YS</span>
        </div>
        <h1 className="admin-login-title">Portfolio Admin</h1>
        <p className="admin-login-sub">Sign in to manage your projects</p>
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-field">
            <label className="admin-label">Username</label>
            <input
              className="admin-input"
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError('') }}
              placeholder="admin"
              autoFocus
              autoComplete="username"
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Password</label>
            <input
              className="admin-input"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="admin-login-error">{error}</p>}
          <button className="admin-btn admin-btn-primary admin-btn-full" type="submit">
            Sign In
          </button>
        </form>
        <p className="admin-login-hint">Default: admin / portfolio2026 — change in Settings</p>
      </div>
    </div>
  )
}

// ─── GitHub Setup Modal ───────────────────────────────────────────────────────
function GitHubSetupModal({ onSave, onClose }) {
  const stored = JSON.parse(localStorage.getItem(GITHUB_CONFIG_KEY) || '{}')
  const [token, setToken] = useState(stored.token || '')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const sha = await getFileSha(token)
      setTestResult({ ok: true, message: `✓ Connected! File SHA: ${sha.slice(0, 8)}…` })
    } catch (err) {
      setTestResult({ ok: false, message: err.message })
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify({ token }))
    onSave(token)
    onClose()
  }

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>GitHub Setup</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body">
          <div className="admin-setup-steps">
            <div className="admin-step">
              <span className="admin-step-num">1</span>
              <div>
                <strong>Create a Personal Access Token</strong>
                <p>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer">github.com/settings/tokens</a> → Generate new token (classic) → check <code>repo</code> scope</p>
              </div>
            </div>
            <div className="admin-step">
              <span className="admin-step-num">2</span>
              <div>
                <strong>Paste your token below</strong>
                <p>It starts with <code>ghp_</code> and is stored only in your browser's localStorage.</p>
              </div>
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-label">GitHub Personal Access Token</label>
            <input
              className="admin-input admin-input-mono"
              type="password"
              value={token}
              onChange={(e) => { setToken(e.target.value); setTestResult(null) }}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            />
          </div>
          {testResult && (
            <p className={`admin-test-result ${testResult.ok ? 'ok' : 'fail'}`}>{testResult.message}</p>
          )}
          <div className="admin-modal-actions">
            <button className="admin-btn admin-btn-ghost" onClick={handleTest} disabled={!token || testing}>
              {testing ? 'Testing…' : 'Test Connection'}
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={!token}>
              Save Token
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Settings Modal ───────────────────────────────────────────────────────────
function SettingsModal({ onClose }) {
  const stored = JSON.parse(localStorage.getItem(ADMIN_CREDS_KEY) || '{}')
  const [username, setUsername] = useState(stored.username || 'admin')
  const [password, setPassword] = useState(stored.password || 'portfolio2026')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')

  const handleSave = () => {
    if (password !== confirm) { setMsg('Passwords do not match'); return }
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify({ username, password }))
    setMsg('Credentials updated!')
    setTimeout(onClose, 1200)
  }

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>Change Credentials</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body">
          <div className="admin-field">
            <label className="admin-label">Username</label>
            <input className="admin-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">New Password</label>
            <input className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Confirm Password</label>
            <input className="admin-input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          {msg && <p className={`admin-test-result ${msg.includes('updated') ? 'ok' : 'fail'}`}>{msg}</p>}
          <div className="admin-modal-actions">
            <button className="admin-btn admin-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Project Editor Form ──────────────────────────────────────────────────────
function ProjectEditor({ project, onSave, onCancel }) {
  const [form, setForm] = useState({ ...project })
  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState({})

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const setBullet = (i, val) => {
    const bullets = [...form.bullets]
    bullets[i] = val
    set('bullets', bullets)
  }

  const addBullet = () => set('bullets', [...form.bullets, ''])
  const removeBullet = (i) => set('bullets', form.bullets.filter((_, idx) => idx !== i))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    setTagInput('')
  }
  const removeTag = (t) => set('tags', form.tags.filter((x) => x !== t))

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.id.trim()) e.id = 'ID is required'
    if (!form.subtitle.trim()) e.subtitle = 'Subtitle is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    const cleaned = { ...form, bullets: form.bullets.filter((b) => b.trim()) }
    onSave(cleaned)
  }

  const ACCENTS = ['pink', 'violet', 'teal', 'gold', 'magenta', 'cyan']

  return (
    <div className="admin-editor">
      <div className="admin-editor-header">
        <h2>{project.id ? `Editing: ${project.title}` : 'New Project'}</h2>
        <div className="admin-editor-actions">
          <button className="admin-btn admin-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save Project</button>
        </div>
      </div>

      <div className="admin-editor-grid">
        {/* Left column */}
        <div className="admin-editor-col">
          <div className="admin-section">
            <h3 className="admin-section-title">Basic Info</h3>
            <div className="admin-field">
              <label className="admin-label">Title <span className="admin-req">*</span></label>
              <input
                className={`admin-input ${errors.title ? 'admin-input-error' : ''}`}
                value={form.title}
                onChange={(e) => {
                  set('title', e.target.value)
                  if (!form.id || form.id === slugify(form.title)) set('id', slugify(e.target.value))
                }}
                placeholder="My Awesome Project"
              />
              {errors.title && <span className="admin-error-msg">{errors.title}</span>}
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label className="admin-label">ID / Slug <span className="admin-req">*</span></label>
                <input
                  className={`admin-input admin-input-mono ${errors.id ? 'admin-input-error' : ''}`}
                  value={form.id}
                  onChange={(e) => set('id', slugify(e.target.value))}
                  placeholder="my-awesome-project"
                />
                {errors.id && <span className="admin-error-msg">{errors.id}</span>}
              </div>
              <div className="admin-field">
                <label className="admin-label">Type</label>
                <select className="admin-input admin-select" value={form.type} onChange={(e) => set('type', e.target.value)}>
                  <option>Web app</option>
                  <option>Mobile app</option>
                  <option>Library</option>
                  <option>API</option>
                  <option>CLI tool</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label className="admin-label">Date</label>
                <input className="admin-input" value={form.date} onChange={(e) => set('date', e.target.value)} placeholder="2026 or 08 2026" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Accent Color</label>
                <div className="admin-accent-picker">
                  {ACCENTS.map((a) => (
                    <button
                      key={a}
                      className={`admin-accent-swatch admin-accent-${a} ${form.accent === a ? 'selected' : ''}`}
                      onClick={() => set('accent', a)}
                      title={a}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Subtitle <span className="admin-req">*</span></label>
              <input
                className={`admin-input ${errors.subtitle ? 'admin-input-error' : ''}`}
                value={form.subtitle}
                onChange={(e) => set('subtitle', e.target.value)}
                placeholder="One-line project description"
              />
              {errors.subtitle && <span className="admin-error-msg">{errors.subtitle}</span>}
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-input admin-textarea"
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Detailed project description…"
                rows={4}
              />
            </div>
          </div>

          <div className="admin-section">
            <h3 className="admin-section-title">Links</h3>
            <div className="admin-field">
              <label className="admin-label">GitHub URL</label>
              <input className="admin-input" value={form.githubUrl || ''} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div className="admin-field">
              <label className="admin-label">Live URL</label>
              <input className="admin-input" value={form.liveUrl || ''} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="admin-section">
            <h3 className="admin-section-title">Visibility</h3>
            <label className="admin-toggle-label">
              <span>Show on portfolio</span>
              <div className={`admin-toggle ${form.visible ? 'on' : ''}`} onClick={() => set('visible', !form.visible)}>
                <div className="admin-toggle-knob" />
              </div>
            </label>
          </div>
        </div>

        {/* Right column */}
        <div className="admin-editor-col">
          <div className="admin-section">
            <h3 className="admin-section-title">Tech Tags</h3>
            <div className="admin-tag-input-row">
              <input
                className="admin-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                placeholder="React, Node.js, Python…"
              />
              <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={addTag} type="button">Add</button>
            </div>
            <div className="admin-tags-preview">
              {form.tags.map((t) => (
                <span className="admin-tag-chip" key={t}>
                  {t}
                  <button className="admin-tag-remove" onClick={() => removeTag(t)} type="button">✕</button>
                </span>
              ))}
            </div>
          </div>

          <div className="admin-section">
            <div className="admin-section-header">
              <h3 className="admin-section-title">Bullet Points</h3>
              <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={addBullet} type="button">+ Add</button>
            </div>
            {form.bullets.map((b, i) => (
              <div className="admin-bullet-row" key={i}>
                <span className="admin-bullet-num">{i + 1}</span>
                <input
                  className="admin-input"
                  value={b}
                  onChange={(e) => setBullet(i, e.target.value)}
                  placeholder={`Bullet point ${i + 1}`}
                />
                <button className="admin-bullet-remove" onClick={() => removeBullet(i)} type="button">✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Project Card (in list view) ──────────────────────────────────────────────
function ProjectCard({ project, index, onEdit, onDelete, onToggleVisible, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <div className={`admin-project-card ${!project.visible ? 'hidden-project' : ''}`}>
      <div className="admin-card-left">
        <div className="admin-card-order">
          <button className="admin-order-btn" onClick={onMoveUp} disabled={isFirst} title="Move up">↑</button>
          <span className="admin-order-num">{String(index + 1).padStart(2, '0')}</span>
          <button className="admin-order-btn" onClick={onMoveDown} disabled={isLast} title="Move down">↓</button>
        </div>
        <div className={`admin-card-accent admin-accent-${project.accent}`} />
        <div className="admin-card-info">
          <div className="admin-card-title">{project.title}</div>
          <div className="admin-card-meta">
            <span className="admin-card-type">{project.type}</span>
            <span className="admin-card-date">{project.date}</span>
            <span className={`admin-card-status ${project.visible ? 'visible' : 'hidden'}`}>
              {project.visible ? '● Live' : '○ Hidden'}
            </span>
          </div>
          <div className="admin-card-subtitle">{project.subtitle}</div>
          <div className="admin-card-tags">
            {project.tags.slice(0, 5).map((t) => <span className="admin-card-tag" key={t}>{t}</span>)}
            {project.tags.length > 5 && <span className="admin-card-tag-more">+{project.tags.length - 5}</span>}
          </div>
        </div>
      </div>
      <div className="admin-card-actions">
        <button className="admin-action-btn" onClick={onToggleVisible} title={project.visible ? 'Hide' : 'Show'}>
          {project.visible ? '👁' : '🙈'}
        </button>
        <button className="admin-action-btn" onClick={onEdit} title="Edit">✏️</button>
        <button className="admin-action-btn admin-action-danger" onClick={onDelete} title="Delete">🗑</button>
      </div>
    </div>
  )
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('admin_session') === '1')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState(null)
  const [isNewProject, setIsNewProject] = useState(false)
  const [showGitHubSetup, setShowGitHubSetup] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [githubToken, setGithubToken] = useState(() => {
    const cfg = JSON.parse(localStorage.getItem(GITHUB_CONFIG_KEY) || '{}')
    return cfg.token || ''
  })
  const [publishing, setPublishing] = useState(false)
  const [toasts, setToasts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  // Load projects from public/projects.json
  useEffect(() => {
    if (!isLoggedIn) return
    fetch(`/projects.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false) })
      .catch(() => { addToast('Failed to load projects', 'error'); setLoading(false) })
  }, [isLoggedIn, addToast])

  const handleLogin = () => {
    sessionStorage.setItem('admin_session', '1')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session')
    setIsLoggedIn(false)
  }

  // ── Publish to GitHub ───────────────────────────────────────────────────────
  const handlePublish = async () => {
    if (!githubToken) { setShowGitHubSetup(true); return }
    setPublishing(true)
    try {
      addToast('Fetching current file SHA…', 'info')
      const sha = await getFileSha(githubToken)
      addToast('Committing changes…', 'info')
      await commitProjects(githubToken, projects, sha)
      addToast('✓ Published! Vercel will deploy in ~30s', 'success')
    } catch (err) {
      addToast(`Publish failed: ${err.message}`, 'error')
    } finally {
      setPublishing(false)
    }
  }

  // ── Project CRUD ────────────────────────────────────────────────────────────
  const handleSaveProject = (updated) => {
    if (isNewProject) {
      setProjects((p) => [...p, updated])
      addToast(`Project "${updated.title}" added`, 'success')
    } else {
      setProjects((p) => p.map((x) => (x.id === updated.id ? updated : x)))
      addToast(`Project "${updated.title}" updated`, 'success')
    }
    setEditingProject(null)
    setIsNewProject(false)
  }

  const handleDeleteProject = (id) => {
    setProjects((p) => p.filter((x) => x.id !== id))
    setConfirmDelete(null)
    addToast('Project deleted', 'info')
  }

  const handleToggleVisible = (id) => {
    setProjects((p) => p.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)))
  }

  const handleMoveUp = (i) => {
    if (i === 0) return
    setProjects((p) => { const a = [...p]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a })
  }
  const handleMoveDown = (i) => {
    if (i === projects.length - 1) return
    setProjects((p) => { const a = [...p]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a })
  }

  const filteredProjects = projects.filter((p) =>
    !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // ── Render ──────────────────────────────────────────────────────────────────
  if (!isLoggedIn) return <LoginScreen onLogin={handleLogin} />

  if (editingProject) {
    return (
      <div className="admin-page">
        <Toast toasts={toasts} />
        <ProjectEditor
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => { setEditingProject(null); setIsNewProject(false) }}
        />
      </div>
    )
  }

  return (
    <div className="admin-page">
      <Toast toasts={toasts} />

      {showGitHubSetup && (
        <GitHubSetupModal
          onSave={(t) => setGithubToken(t)}
          onClose={() => setShowGitHubSetup(false)}
        />
      )}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {confirmDelete && (
        <div className="admin-modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="admin-modal admin-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Delete Project?</h2>
              <button className="admin-modal-close" onClick={() => setConfirmDelete(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <p>Are you sure you want to delete <strong>{confirmDelete.title}</strong>? This cannot be undone until you publish.</p>
              <div className="admin-modal-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => setConfirmDelete(null)}>Cancel</button>
                <button className="admin-btn admin-btn-danger" onClick={() => handleDeleteProject(confirmDelete.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <span className="admin-topbar-mark">YS</span>
          <div>
            <h1 className="admin-topbar-title">Portfolio Admin</h1>
            <p className="admin-topbar-sub">
              {projects.length} projects · {projects.filter((p) => p.visible).length} visible
            </p>
          </div>
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setShowGitHubSetup(true)}>
            {githubToken ? '🔑 GitHub' : '⚠ Setup GitHub'}
          </button>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setShowSettings(true)}>⚙ Settings</button>
          <button
            className="admin-btn admin-btn-publish"
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing ? 'Publishing…' : '🚀 Publish to Live'}
          </button>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={handleLogout} title="Log out">↩</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-wrap">
          <span className="admin-search-icon">⌕</span>
          <input
            className="admin-search"
            type="search"
            placeholder="Search projects or tags…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { setEditingProject(newProjectTemplate()); setIsNewProject(true) }}
        >
          + New Project
        </button>
      </div>

      {/* Info banner */}
      {!githubToken && (
        <div className="admin-info-banner">
          <span>⚠</span>
          <span>GitHub token not configured. Your changes won't be published until you <button className="admin-banner-link" onClick={() => setShowGitHubSetup(true)}>set up GitHub</button>.</span>
        </div>
      )}

      {/* Projects list */}
      <div className="admin-projects-list">
        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading projects…</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="admin-empty">
            <p>{searchQuery ? 'No projects match your search.' : 'No projects yet.'}</p>
          </div>
        ) : (
          filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isFirst={i === 0}
              isLast={i === filteredProjects.length - 1}
              onEdit={() => { setEditingProject(project); setIsNewProject(false) }}
              onDelete={() => setConfirmDelete(project)}
              onToggleVisible={() => handleToggleVisible(project.id)}
              onMoveUp={() => handleMoveUp(i)}
              onMoveDown={() => handleMoveDown(i)}
            />
          ))
        )}
      </div>

      <div className="admin-footer">
        <p>Changes are local until you click <strong>Publish to Live</strong> — Vercel deploys automatically after.</p>
        <a href="/" className="admin-footer-link">← Back to Portfolio</a>
      </div>
    </div>
  )
}
