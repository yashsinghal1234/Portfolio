import { useEffect, useState } from "react"

let cachedProjects = null
let fetchPromise = null

export function useProjects() {
  const [projects, setProjects] = useState(cachedProjects ?? [])
  const [loading, setLoading] = useState(!cachedProjects)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cachedProjects) {
      setProjects(cachedProjects)
      setLoading(false)
      return
    }
    if (!fetchPromise) {
      fetchPromise = fetch(`/projects.json?t=${Date.now()}`)
        .then((r) => {
          if (!r.ok) throw new Error("Failed to load projects")
          return r.json()
        })
        .then((data) => {
          cachedProjects = data
          return data
        })
        .catch((err) => {
          fetchPromise = null
          throw err
        })
    }
    fetchPromise
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const invalidateCache = () => {
    cachedProjects = null
    fetchPromise = null
  }

  return { projects: projects.filter((p) => p.visible !== false), allProjects: projects, loading, error, invalidateCache }
}

