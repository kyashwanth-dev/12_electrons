import { LogOut, Menu, User, X, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import NotificationBell from './NotificationBell'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Marketplace', to: '/marketplace' },
  { name: 'Sell', to: '/sell' },
  { name: 'Repair', to: '/repair' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const { currentUser, logout } = useAuth()
  const { notifyLogout } = useEventNotifications()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 px-3 py-1.5 rounded-md ${
      isActive 
        ? 'text-[var(--green)] bg-[var(--green-dim)]' 
        : 'text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg3)]'
    }`

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await logout()
      notifyLogout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Failed to log out')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <nav className="sticky top-0 z-[100] flex h-[64px] items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/85 px-4 sm:px-12 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-lg dark:logo-glow">
          <img 
            src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} 
            alt="12 Electrons logo" 
            className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" 
          />
        </div>
        <span className="text-base font-semibold text-[var(--text)]">
          12 Electrons
        </span>
      </Link>

      <button
        type="button"
        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-secondary)] md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div className="hidden items-center gap-9 md:flex">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="hidden items-center gap-3.5 md:flex">
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg3)] text-[15px] transition-colors hover:border-[var(--border2)] text-[var(--text2)] hover:text-[var(--text)]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <NotificationBell />
        {currentUser ? (
          <>
            <span className="inline-flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
              <User size={14} className="text-[var(--text-tertiary)]" />
              {currentUser.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 rounded-md border-none bg-transparent px-3 py-1.5 text-[13px] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg3)] hover:text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut size={14} />
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-[var(--text2)] transition-colors hover:text-[var(--text)] px-4 py-2">
              Log in
            </Link>
            <Link to="/signup" className="btn-primary py-[10px] px-5 rounded-lg text-sm">
              Get started &rarr;
            </Link>
          </>
        )}
      </div>

      {open ? (
        <div className="absolute left-0 right-0 top-[64px] flex flex-col gap-3 border-b border-[var(--border)] bg-[var(--bg)] p-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-3 border-t border-[var(--border)] pt-4">
            <button
              onClick={toggleTheme}
              className="flex w-full items-center justify-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg3)] px-4 py-2 text-[15px] transition-colors hover:border-[var(--border2)] text-[var(--text2)] hover:text-[var(--text)]"
            >
              {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
            </button>
            {currentUser ? (
              <>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)]">
                  {currentUser.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="btn-ghost justify-start px-0 text-left"
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn-ghost justify-start px-0"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="btn-primary justify-center"
                >
                  Get started &rarr;
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
