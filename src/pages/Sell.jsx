import { motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'
import { db, storage } from '../firebase'
import {
  CONDITION_NOT_WORKING,
  generateComponentId,
} from '../utils/componentUtils'

function Sell() {
  const { currentUser } = useAuth()
  const { notifyComponentAdded, notifyComponentRepair } = useEventNotifications()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    condition: 'Working',
    contact: '',
    description: '',
    opted: false,
  })
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name || !formData.price || !formData.contact) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const componentId = generateComponentId()

      let photoURL = null
      if (photoFile) {
        const photoRef = ref(storage, `components/${componentId}/${photoFile.name}`)
        await uploadBytes(photoRef, photoFile)
        photoURL = await getDownloadURL(photoRef)
      }

      const basePrice = Number(formData.price)
      const finalPrice = formData.opted ? Math.round(basePrice * 0.75) : basePrice

      const componentData = {
        componentId,
        name: formData.name.trim(),
        price: finalPrice,
        originalPrice: basePrice,
        opted: formData.opted,
        condition: formData.condition,
        contact: formData.contact.trim(),
        description: formData.description.trim(),
        photoURL,
        ownerId: currentUser.uid,
        ownerEmail: currentUser.email,
        createdAt: serverTimestamp(),
      }

      if (formData.condition === CONDITION_NOT_WORKING) {
        await addDoc(collection(db, 'repair'), {
          ...componentData,
          status: 'UnderRepair',
          location: 'CMRCET',
          collectedAt: serverTimestamp(),
        })
        notifyComponentRepair(formData.name)
        toast.success('Component sent for repair')
      } else {
        await addDoc(collection(db, 'marketplace'), {
          ...componentData,
          status: 'available',
        })
        notifyComponentAdded(formData.name)
        toast.success('Component listed in marketplace')
      }

      setFormData({ name: '', price: '', condition: 'Working', contact: '', description: '', opted: false })
      setPhotoFile(null)
      setPhotoPreview(null)
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
            Component name <span className="text-rose-500">*</span>
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
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
            <option value="Don't Know">Don&apos;t Know</option>
          </select>
          {formData.condition === CONDITION_NOT_WORKING && (
            <p className="mt-1.5 text-[12px] text-amber-600">
              ⚠️ &quot;Not Working&quot; components will be routed to the repair team instead of the marketplace.
            </p>
          )}
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
          <label htmlFor="price" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Expected price (₹) <span className="text-rose-500">*</span>
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

        <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
          <input
            id="opted"
            name="opted"
            type="checkbox"
            checked={formData.opted}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-[var(--border)] accent-[var(--accent)]"
          />
          <div>
            <label htmlFor="opted" className="text-[13px] font-medium text-[var(--text-secondary)] cursor-pointer">
              Opted price (25% off market price)
            </label>
            {formData.opted && formData.price && (
              <p className="mt-0.5 text-[12px] text-[var(--green)]">
                Final price: ₹{Math.round(Number(formData.price) * 0.75)}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="photo" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--accent)] file:px-3 file:py-1 file:text-[12px] file:font-medium file:text-white"
          />
          {photoPreview && photoPreview.startsWith('blob:') && (
            <img
              src={photoPreview}
              alt="Preview"
              className="mt-2 h-28 w-28 rounded-lg object-cover border border-[var(--border)]"
            />
          )}
        </div>

        <div>
          <label htmlFor="description" className="text-[13px] font-medium text-[var(--text-secondary)]">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mention age, included accessories, and performance details"
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 justify-center py-3 text-[14px] disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Sell'}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setFormData({ name: '', price: '', condition: 'Working', contact: '', description: '', opted: false })
              setPhotoFile(null)
              setPhotoPreview(null)
            }}
            className="btn-secondary flex-1 justify-center py-3 text-[14px] disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  )
}

export default Sell
