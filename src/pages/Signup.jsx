import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setError('')
      setLoading(true)
      await signup(email, password)
      toast.success('Account created successfully')
      navigate('/marketplace')
    } catch (authError) {
      setError(authError.message || 'Unable to create account')
      toast.error(authError.message || 'Unable to create account')
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
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--navy)]">Create an account</h1>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">Join the campus hardware marketplace</p>
        </div>

        {error ? <p className="rounded-lg bg-rose-50 p-3 text-[13px] font-medium text-rose-600 border border-rose-200">{error}</p> : null}

        <div>
          <label htmlFor="signup-email" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            placeholder="you@campus.edu"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div>
          <label htmlFor="signup-confirm-password" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Confirm password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            placeholder="Repeat password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-2 w-full justify-center py-2.5 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Signup'}
        </button>

        <p className="text-center text-[13px] text-[var(--text-secondary)] pt-2">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

export default Signup
