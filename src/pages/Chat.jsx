import { motion } from 'framer-motion'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

const SUPPORT_EMAIL = 'support@12electrons.in'

function Chat() {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!currentUser) return

    const messagesQuery = query(
      collection(db, 'chats', currentUser.uid, 'messages'),
      orderBy('createdAt', 'asc'),
    )

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
      },
      (error) => {
        toast.error(error.message || 'Failed to load messages')
      },
    )

    return unsubscribe
  }, [currentUser])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || !currentUser) return

    try {
      setSending(true)
      await addDoc(collection(db, 'chats', currentUser.uid, 'messages'), {
        text: trimmed,
        senderUid: currentUser.uid,
        senderEmail: currentUser.email,
        isSupport: false,
        createdAt: serverTimestamp(),
      })
      setText('')
    } catch (error) {
      toast.error(error.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const formatTime = (ts) => {
    if (!ts) return ''
    const date = ts.toDate ? ts.toDate() : new Date(ts)
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-[var(--text-secondary)]">Please login to use the Enquiry Chat.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 space-y-6">
      <section className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--navy)]">Enquiry Chat</h1>
        <p className="mt-2 text-base text-[var(--text-secondary)]">Chat with our support team for any queries.</p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col rounded-2xl border border-[var(--green)]/40 bg-white shadow-[var(--shadow-lg)] overflow-hidden"
        style={{ minHeight: '480px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--green)]/10 border border-[var(--green)]/20">
            <span className="text-[16px]">🛠️</span>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[var(--text-primary)]">12 Electrons Support</p>
            <p className="text-[11px] text-[var(--green)]">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: '360px' }}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full py-8">
              <p className="text-[13px] text-[var(--text-muted)] text-center">
                Send a message to start the conversation. Our team will respond shortly.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = !msg.isSupport
              return (
                <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                      isMe
                        ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20'
                        : 'bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20'
                    }`}
                  >
                    {isMe ? currentUser.email[0].toUpperCase() : 'S'}
                  </div>
                  <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2 text-[14px] leading-relaxed ${
                        isMe
                          ? 'rounded-tr-sm bg-[var(--accent)] text-white'
                          : 'rounded-tl-sm bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] px-1">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              )
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-3 py-2.5"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2 text-[14px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={sending || !text.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--green)] text-white transition hover:bg-[var(--green-hover)] disabled:opacity-50"
            aria-label="Send"
          >
            <Send size={16} />
          </button>
        </form>
      </motion.div>

      <p className="text-center text-[12px] text-[var(--text-muted)]">
        Support: {SUPPORT_EMAIL}
      </p>
    </div>
  )
}

export default Chat
