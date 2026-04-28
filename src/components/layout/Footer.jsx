import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2.5 no-underline">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center">
              <img 
                src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} 
                alt="12 Electrons logo" 
                className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" 
              />
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--navy)]">
              12 Electrons
            </span>
          </Link>
          <p className="mt-4 text-[13px] leading-[1.7] text-[var(--text-tertiary)] max-w-[240px]">
            A student-first hardware marketplace for buying, selling, renting and repairing electronics on campus.
          </p>
        </div>
        
        <div>
          <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.04em] text-[var(--text-primary)]">Platform</div>
          <div className="flex flex-col gap-2">
            <Link to="/marketplace" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Marketplace</Link>
            <Link to="/rent" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Rent</Link>
            <Link to="/repair" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Repair</Link>
            <Link to="/sell" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Sell</Link>
            <Link to="/upcycle" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Upcycle</Link>
          </div>
        </div>
        
        <div>
          <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.04em] text-[var(--text-primary)]">Campus</div>
          <div className="flex flex-col gap-2">
            <Link to="/become-seller" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Become a seller</Link>
            <Link to="/verification" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Verification</Link>
            <Link to="/technician" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Technician program</Link>
            <Link to="/rep" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Campus rep</Link>
          </div>
        </div>
        
        <div>
          <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.04em] text-[var(--text-primary)]">Company</div>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">About</Link>
            <Link to="/blog" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Blog</Link>
            <Link to="/trust" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Safety & Trust</Link>
            <Link to="/contact" className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="text-xs text-[var(--text-muted)]">© 2026 12 Electrons. All rights reserved.</div>
          <div className="font-mono text-[11px] text-[var(--text-muted)]">Made for Makers</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
