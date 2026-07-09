import { Outlet } from 'react-router-dom'
import { useThemeStore } from './themeStore'
import { useEffect } from 'react'

const Layout = () => {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">Sidebar</aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-100 p-4 border-b">Header</header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <footer className="bg-gray-100 p-4 border-t">Footer</footer>
      </div>
    </div>
  )
}

export default Layout
