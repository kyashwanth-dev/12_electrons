import { motion } from 'framer-motion'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { generateComponentId, formatLocalDate, formatLocalTime } from '../utils/componentUtils'

function Repair() {
  const { currentUser } = useAuth()
  const { notifyRepairRequest, notifyRepairDone } = useEventNotifications()
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    priceOpted: '',
    location: 'CMRCET',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [myRepairs, setMyRepairs] = useState([])
  const [repairsLoading, setRepairsLoading] = useState(!!currentUser)
  const [activeTab, setActiveTab] = useState('submit')

  useEffect(() => {
    if (!currentUser) {
      return
    }

    const repairQuery = query(
      collection(db, 'repair'),
      where('ownerId', '==', currentUser.uid),
      orderBy('createdAt', 'desc'),
    )

    const unsubscribe = onSnapshot(
      repairQuery,
      (snapshot) => {
        setMyRepairs(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setRepairsLoading(false)
      },
      () => setRepairsLoading(false),
    )

    return unsubscribe
  }, [currentUser])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!currentUser) {
      toast.error('Please login to submit repair requests')
      return
    }

    if (!formData.name || !formData.contact) {
      toast.error('Component name and contact are required')
      return
    }

    try {
      setLoading(true)
      const componentId = generateComponentId()

      await addDoc(collection(db, 'repair'), {
        componentId,
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        priceOpted: formData.priceOpted ? Number(formData.priceOpted) : null,
        location: formData.location.trim() || 'CMRCET',
        description: formData.description.trim(),
        ownerId: currentUser.uid,
        ownerEmail: currentUser.email,
        status: 'UnderRepair',
        collectedAt: serverTimestamp(),
        collectedDate: formatLocalDate(),
        collectedTime: formatLocalTime(),
        createdAt: serverTimestamp(),
      })

      notifyRepairRequest(formData.name)
      toast.success('Repair request submitted')
      setFormData({ name: '', contact: '', priceOpted: '', location: 'CMRCET', description: '' })
      setActiveTab('track')
    } catch (error) {
      toast.error(error.message || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  const markAsDone = async (repairItem) => {
    try {
      await updateDoc(doc(db, 'repair', repairItem.id), { status: 'Done' })

      await addDoc(collection(db, 'marketplace'), {
        componentId: repairItem.componentId,
        name: repairItem.name,
        price: repairItem.priceOpted || 0,
        condition: 'Working',
        contact: repairItem.contact,
        description: repairItem.description || 'Repaired component',
        ownerId: repairItem.ownerId,
        ownerEmail: repairItem.ownerEmail,
        status: 'available',
        repairedFrom: repairItem.id,
        createdAt: serverTimestamp(),
      })

      notifyRepairDone(repairItem.name)
      toast.success(`${repairItem.name} marked as done and added to marketplace`)
    } catch (error) {
      toast.error(error.message || 'Failed to update status')
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--navy)]">Repair Request</h1>
        <p className="mt-2 text-base text-[var(--text-secondary)]">Submit faults and get matched with trusted repair support.</p>
      </section>

      <div className="flex gap-2 border-b border-[var(--border)]">
        <button
          type="button"
          onClick={() => setActiveTab('submit')}
          className={`px-4 py-2 text-[14px] font-medium border-b-2 transition-colors ${
            activeTab === 'submit'
              ? 'border-[var(--accent)] text-[var(--accent)]'
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Submit Request
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('track')}
          className={`px-4 py-2 text-[14px] font-medium border-b-2 transition-colors ${
            activeTab === 'track'
              ? 'border-[var(--accent)] text-[var(--accent)]'
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Track Repairs
          {myRepairs.filter((r) => r.status === 'UnderRepair').length > 0 && (
            <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] text-white">
              {myRepairs.filter((r) => r.status === 'UnderRepair').length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'submit' ? (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-[var(--shadow-lg)] space-y-5"
        >
          <div>
            <label htmlFor="name" className="text-[13px] font-medium text-[var(--text-secondary)]">
              Component name <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. ESP32 Dev Board"
              className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label htmlFor="contact" className="text-[13px] font-medium text-[var(--text-secondary)]">
              Contact (mobile number) <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label htmlFor="priceOpted" className="text-[13px] font-medium text-[var(--text-secondary)]">
              Price opted (₹) — after repair
            </label>
            <input
              id="priceOpted"
              name="priceOpted"
              type="number"
              min="0"
              value={formData.priceOpted}
              onChange={handleChange}
              placeholder="Expected price after repair"
              className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label htmlFor="location" className="text-[13px] font-medium text-[var(--text-secondary)]">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. CMRCET"
              className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-[13px] font-medium text-[var(--text-secondary)]">
              Issue description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe symptoms, failed behavior, and usage context"
              className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 justify-center py-3 text-[14px] disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => setFormData({ name: '', contact: '', priceOpted: '', location: 'CMRCET', description: '' })}
              className="btn-secondary flex-1 justify-center py-3 text-[14px] disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {!currentUser ? (
            <p className="text-center text-[var(--text-secondary)] py-8">Please login to view your repairs.</p>
          ) : repairsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner label="Loading repairs..." />
            </div>
          ) : myRepairs.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-white p-10 text-center shadow-[var(--shadow-sm)]">
              <p className="text-[var(--text-secondary)]">No repair requests yet.</p>
            </div>
          ) : (
            myRepairs.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-sm)] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--navy)]">{item.name}</h3>
                    {item.componentId && (
                      <p className="text-[11px] font-mono text-[var(--text-muted)]">{item.componentId}</p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-[3px] text-[12px] font-medium ${
                      item.status === 'Done'
                        ? 'bg-[var(--green-bg)] text-[var(--green)] border-[var(--green)]/20'
                        : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[13px]">
                  <p className="text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">Contact:</span> {item.contact}
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">Location:</span> {item.location}
                  </p>
                  {item.collectedDate && (
                    <p className="text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Date:</span> {item.collectedDate}
                    </p>
                  )}
                  {item.collectedTime && (
                    <p className="text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Time:</span> {item.collectedTime}
                    </p>
                  )}
                  {item.priceOpted != null && (
                    <p className="text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Price Opted:</span> ₹{item.priceOpted}
                    </p>
                  )}
                </div>

                {item.description && (
                  <p className="text-[13px] text-[var(--text-secondary)] border-t border-[var(--border)] pt-2">{item.description}</p>
                )}

                {item.status === 'UnderRepair' && (
                  <button
                    type="button"
                    onClick={() => markAsDone(item)}
                    className="btn-primary py-2 text-[13px] w-full mt-2"
                  >
                    Mark as Done → Add to Marketplace
                  </button>
                )}
              </div>
            ))
          )}
        </motion.div>
      )}
    </div>
  )
}

export default Repair
