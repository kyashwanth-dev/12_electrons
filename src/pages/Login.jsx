import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { notifyLoginSuccess } = useEventNotifications()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/marketplace'

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    try {
      setError('')
      setLoading(true)
      await login(email, password)
      notifyLoginSuccess(email)
      toast.success('Welcome back')
      navigate(from, { replace: true })
    } catch (authError) {
      setError(authError.message || 'Unable to login')
      toast.error(authError.message || 'Unable to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md mt-12 sm:mt-20">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-[var(--shadow-lg)] space-y-5"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--navy)]">Welcome back</h1>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">Sign in to your account to continue</p>
        </div>

        {error ? <p className="rounded-lg bg-rose-50 p-3 text-[13px] font-medium text-rose-600 border border-rose-200">{error}</p> : null}

        <div>
          <label htmlFor="login-email" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            placeholder="you@campus.edu"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-2 w-full justify-center py-2.5 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="text-center text-[13px] text-[var(--text-secondary)] pt-2">
          New here?{' '}
          <Link to="/signup" className="font-medium text-[var(--accent)] hover:underline">
            Create an account
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

export default Login
