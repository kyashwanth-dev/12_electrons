import { motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

function Sell() {
  const { currentUser } = useAuth()
  const { notifyComponentAdded } = useEventNotifications()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    condition: 'Working',
    status: 'available',
    description: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name || !formData.price || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      await addDoc(collection(db, 'components'), {
        name: formData.name.trim(),
        price: Number(formData.price),
        condition: formData.condition,
        status: formData.status,
        description: formData.description.trim(),
        ownerId: currentUser.uid,
        createdAt: serverTimestamp(),
      })

      setFormData({ name: '', price: '', condition: 'Working', status: 'available', description: '' })
      notifyComponentAdded(formData.name)
      toast.success('Component listed successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to submit component')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--navy)]">Sell Component</h1>
        <p className="mt-2 text-base text-[var(--text-secondary)]">Submit your spare components and reach verified student buyers.</p>
      </section>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-[var(--shadow-lg)] space-y-5"
      >
        <div>
          <label htmlFor="name" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Component name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Arduino Nano"
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        <div>
          <label htmlFor="condition" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)] appearance-none"
          >
            <option>Working</option>
            <option>Refurbished</option>
            <option>Faulty</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Expected price (₹)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 150"
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mention age, included accessories, and performance details"
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-4 w-full justify-center py-3 text-[14px] disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit Listing'}
        </button>
      </motion.form>
    </div>
  )
}

export default Sell
