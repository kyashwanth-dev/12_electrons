import { motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

function Repair() {
  const { currentUser } = useAuth()
  const { notifyRepairRequest } = useEventNotifications()
  const [issueDescription, setIssueDescription] = useState('')
  const [componentType, setComponentType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!currentUser) {
      toast.error('Please login to submit repair requests')
      return
    }

    if (!issueDescription || !componentType) {
      toast.error('All fields are required')
      return
    }

    try {
      setLoading(true)
      await addDoc(collection(db, 'requests'), {
        userId: currentUser.uid,
        type: 'repair',
        description: `${componentType}: ${issueDescription}`,
        createdAt: serverTimestamp(),
      })
      setIssueDescription('')
      setComponentType('')
      notifyRepairRequest(componentType)
      toast.success('Repair request submitted')
    } catch (error) {
      toast.error(error.message || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--navy)]">Repair Request</h1>
        <p className="mt-2 text-base text-[var(--text-secondary)]">Submit faults and get matched with trusted repair support.</p>
      </section>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-[var(--shadow-lg)] space-y-5"
      >
        <div>
          <label htmlFor="componentType" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Component type
          </label>
          <input
            id="componentType"
            type="text"
            value={componentType}
            onChange={(event) => setComponentType(event.target.value)}
            placeholder="e.g. ESP32 Dev Board"
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        <div>
          <label htmlFor="issueDescription" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Issue description
          </label>
          <textarea
            id="issueDescription"
            rows="5"
            value={issueDescription}
            onChange={(event) => setIssueDescription(event.target.value)}
            placeholder="Describe symptoms, failed behavior, and usage context"
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-4 w-full justify-center py-3 text-[14px] disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Send Repair Request'}
        </button>
      </motion.form>
    </div>
  )
}

export default Repair
