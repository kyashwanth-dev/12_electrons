import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Submit a component to the carrier collection
 * @param {Object} componentData - Component data from form
 * @param {string} source - 'sell' or 'repair' to track source
 * @returns {Promise<string>} Document ID of the carrier entry
 */
export const submitToCarrier = async (componentData, source) => {
  try {
    const carrierData = {
      ...componentData,
      source, // 'sell' or 'repair'
      createdAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'carrier'), carrierData)
    return docRef.id
  } catch (error) {
    console.error('Error submitting to carrier:', error)
    throw error
  }
}

/**
 * Get user's components in carrier
 * @param {string} userId - User ID
 * @param {Function} callback - Callback function to handle changes
 * @returns {Function} Unsubscribe function
 */
export const watchUserCarrier = (userId, callback) => {
  const q = query(
    collection(db, 'carrier'),
    where('ownerId', '==', userId),
  )

  return onSnapshot(q, (snapshot) => {
    const components = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(components)
  })
}

/**
 * Delete a component from carrier (cancel submission)
 * @param {string} carrierId - ID of carrier document
 */
export const deleteFromCarrier = async (carrierId) => {
  try {
    await deleteDoc(doc(db, 'carrier', carrierId))
  } catch (error) {
    console.error('Error deleting from carrier:', error)
    throw error
  }
}

