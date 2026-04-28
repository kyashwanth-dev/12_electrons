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

function generateSoldItemId() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `SLD-${timestamp}-${random}`
}

function Delivery() {
  const { currentUser } = useAuth()
  const { notifyDeliveryComplete } = useEventNotifications()
  const [pendingRequests, setPendingRequests] = useState([])
  const [loading, setLoading] = useState(!!currentUser)
  const [processingId, setProcessingId] = useState(null)
  const [deliveryData, setDeliveryData] = useState({})

  useEffect(() => {
    if (!currentUser) {
      return
    }

    const requestsQuery = query(
      collection(db, 'requests'),
      where('type', '==', 'buy'),
      where('deliveryStatus', '==', 'uncompleted'),
      orderBy('createdAt', 'desc'),
    )

    const unsubscribe = onSnapshot(
      requestsQuery,
      (snapshot) => {
        setPendingRequests(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      () => setLoading(false),
    )

    return unsubscribe
  }, [currentUser])

  const handleDataChange = (requestId, field, value) => {
    setDeliveryData((prev) => ({
      ...prev,
      [requestId]: { ...(prev[requestId] || {}), [field]: value },
    }))
  }

  const handleComplete = async (request) => {
    const data = deliveryData[request.id] || {}
    if (!data.personName || !data.contact) {
      toast.error('Buyer name and contact are required')
      return
    }

    try {
      setProcessingId(request.id)
      const soldItemId = generateSoldItemId()
      const now = new Date()

      await addDoc(collection(db, 'solded'), {
        soldItemId,
        componentId: request.componentId,
        componentName: request.componentName,
        price: request.price || 0,
        costToBeSolded: data.costToBeSolded ? Number(data.costToBeSolded) : request.price || 0,
        sellTo: data.personName.trim(),
        contact: data.contact.trim(),
        sellerId: request.sellerId || '',
        buyerId: request.userId,
        buyerEmail: request.userEmail || '',
        deliveryStatus: 'completed',
        deliveryDate: now.toLocaleDateString('en-GB'),
        deliveryTime: now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
        location: data.location || 'CMRCET',
        result: 'Success',
        requestId: request.id,
        createdAt: serverTimestamp(),
      })

      await updateDoc(doc(db, 'requests', request.id), { deliveryStatus: 'completed' })

      notifyDeliveryComplete(request.componentName)
      toast.success(`Delivery of ${request.componentName} completed!`)
      setDeliveryData((prev) => { const copy = { ...prev }; delete copy[request.id]; return copy })
    } catch (error) {
      toast.error(error.message || 'Failed to complete delivery')
    } finally {
      setProcessingId(null)
    }
  }

  const handleCancel = async (request) => {
    try {
      setProcessingId(request.id)
      await updateDoc(doc(db, 'requests', request.id), { deliveryStatus: 'cancelled' })
      toast.success('Delivery cancelled')
    } catch (error) {
      toast.error(error.message || 'Failed to cancel delivery')
    } finally {
      setProcessingId(null)
    }
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-[var(--text-secondary)]">Please login to access delivery management.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--navy)]">Delivery Management</h1>
        <p className="mt-2 text-base text-[var(--text-secondary)]">Manage pending buy requests and complete deliveries.</p>
      </section>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner label="Loading pending deliveries..." />
        </div>
      ) : pendingRequests.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-white p-10 text-center shadow-[var(--shadow-sm)]">
          <p className="text-[var(--text-secondary)]">No pending deliveries.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {pendingRequests.map((request) => {
            const data = deliveryData[request.id] || {}
            const isProcessing = processingId === request.id

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--navy)]">
                      {request.componentName || 'Component'}
                    </h3>
                    <p className="text-[12px] font-mono text-[var(--text-muted)]">{request.componentId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[18px] font-medium text-[var(--text-primary)]">₹{request.price || '—'}</span>
                    <p className="text-[11px] text-[var(--text-muted)]">listed price</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[12px] font-medium text-[var(--text-secondary)]">
                      Buyer name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.personName || ''}
                      onChange={(e) => handleDataChange(request.id, 'personName', e.target.value)}
                      placeholder="Full name"
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-[var(--text-secondary)]">
                      Buyer contact <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={data.contact || ''}
                      onChange={(e) => handleDataChange(request.id, 'contact', e.target.value)}
                      placeholder="Mobile number"
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-[var(--text-secondary)]">
                      Cost to be sold (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={data.costToBeSolded || ''}
                      onChange={(e) => handleDataChange(request.id, 'costToBeSolded', e.target.value)}
                      placeholder={`Depends on bargain (${request.price || 0})`}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-[var(--text-secondary)]">
                      Delivery location
                    </label>
                    <input
                      type="text"
                      value={data.location || 'CMRCET'}
                      onChange={(e) => handleDataChange(request.id, 'location', e.target.value)}
                      placeholder="e.g. CMRCET"
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleComplete(request)}
                    className="btn-primary flex-1 py-2.5 text-[13px] disabled:opacity-60"
                  >
                    {isProcessing ? 'Processing...' : 'Mark Delivered'}
                  </button>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleCancel(request)}
                    className="btn-secondary flex-1 py-2.5 text-[13px] disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Delivery
