import { motion } from 'framer-motion'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

const categories = ['All', 'Arduino', 'Sensors', 'ICs', 'Tools']

function Marketplace() {
  const { currentUser } = useAuth()
  const { notifyBuyRequest, notifyRentRequest } = useEventNotifications()
  const [components, setComponents] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const componentsQuery = query(collection(db, 'components'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      componentsQuery,
      (snapshot) => {
        const liveComponents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setComponents(liveComponents)
        setLoading(false)
      },
      (error) => {
        setLoading(false)
        toast.error(error.message || 'Failed to fetch components')
      },
    )

    return unsubscribe
  }, [])

  const filteredComponents = useMemo(
    () =>
      components.filter(
        (item) =>
          (category === 'All' || item.category === category) &&
          item.condition !== 'Faulty',
      ),
    [components, category],
  )

  const handleAction = async (item, type) => {
    if (!currentUser) {
      toast.error('Please login to continue')
      return
    }

    try {
      await addDoc(collection(db, 'requests'), {
        userId: currentUser.uid,
        type,
        description: `${type.toUpperCase()} request for ${item.name}`,
        componentId: item.id,
        createdAt: serverTimestamp(),
      })
      if (type === 'buy') {
        notifyBuyRequest(item.name)
      } else if (type === 'rent') {
        notifyRentRequest(item.name)
      }
      toast.success(`${type === 'buy' ? 'Buy' : 'Rent'} request submitted`)
    } catch (error) {
      toast.error(error.message || 'Could not submit request')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--navy)]">Marketplace</h1>
        <p className="mt-2 text-base text-[var(--text-secondary)]">Live inventory from students, labs, and verified campus sellers.</p>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-white p-4 sm:p-5 shadow-[var(--shadow-sm)]">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="category" className="text-[13px] font-medium text-[var(--text-secondary)]">
              Category filter
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[14px] text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)] appearance-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center p-12">
          <Spinner label="Fetching components..." />
        </div>
      ) : filteredComponents.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-white p-10 text-center shadow-[var(--shadow-sm)]">
          <p className="text-[var(--text-secondary)]">
            {components.length === 0
              ? 'No components available yet. Add one from the Sell page!'
              : `No ${category !== 'All' ? category : ''} components found.`}
          </p>
          <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">
            (Total in database: {components.length})
          </p>
        </div>
      ) : (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredComponents.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">{item.category || 'General'}</p>
                <h3 className="mt-1.5 text-[16px] font-semibold tracking-[-0.01em] text-[var(--navy)] line-clamp-1">{item.name}</h3>
                
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[18px] font-medium tracking-tight text-[var(--text-primary)]">₹{item.price}</span>
                  <span
                    className={`rounded-full border px-2 py-[2px] text-[11px] font-medium ${
                      item.condition === 'Working'
                        ? 'bg-[var(--green-bg)] text-[var(--green)] border-[var(--green)]/20'
                        : item.condition === 'Refurbished'
                          ? 'bg-[var(--amber-bg)] text-[var(--amber)] border-[#fde68a]'
                          : 'bg-rose-50 text-rose-600 border-rose-200'
                    }`}
                  >
                    {item.condition}
                  </span>
                </div>
                <p className="mt-2 text-[13px] text-[var(--text-secondary)] capitalize">Status: {item.status || 'available'}</p>
              </div>
              
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAction(item, 'buy')}
                    disabled={!currentUser}
                    className="btn-primary py-2 text-[13px] disabled:opacity-50"
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(item, 'rent')}
                    disabled={!currentUser}
                    className="btn-secondary py-2 text-[13px] disabled:opacity-50"
                  >
                    Rent
                  </button>
                </div>
                {!currentUser ? <p className="mt-2 text-center text-[11px] text-[var(--text-tertiary)]">Login required for actions</p> : null}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Marketplace
