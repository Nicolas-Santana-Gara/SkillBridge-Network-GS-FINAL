import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme-dark') === 'true'
    setDark(saved)
    document.documentElement.classList.toggle('dark', saved)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme-dark', String(next))
  }

  return (
    <button
      onClick={toggle}
      className="rounded-xl border px-3 py-2 text-sm bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
