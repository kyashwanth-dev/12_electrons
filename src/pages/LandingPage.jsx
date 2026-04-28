import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Cpu, ShieldCheck, Wrench, Zap, Navigation, Clock, CreditCard, Star } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { GlassCard } from '../components/ui/GlassCard'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

function LandingPage() {
  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-24">
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-20 lg:px-12">
        {/* LEFT */}
        <div className="relative z-10 flex flex-col items-start">
          <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(0,255,136,0.2)] bg-[var(--green-dim)] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-[var(--green)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]"></span>
            </span>
            Live on campus · CMRCET
          </motion.div>

          <motion.h1 variants={fadeUp} className="mb-5 text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text)] sm:text-[52px]">
            The smarter way to<br/>
            <span className="relative inline-block text-[var(--green)]">
              source electronics
              <span className="absolute bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-[var(--green)] opacity-30"></span>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mb-9 max-w-[400px] text-[15px] leading-[1.75] text-[var(--text3)]">
            Buy, sell, rent and repair electronics components — all on one trusted campus platform built for students and makers.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap items-center gap-3">
            <Button variant="primary" to="/marketplace">Browse marketplace &rarr;</Button>
            <Button variant="ghost" to="/sell">List a component</Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[var(--bg)] bg-[#3B82F6] text-[10px] font-semibold text-[#E6F1FB]">AK</div>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[var(--bg)] bg-[#8B5CF6] text-[10px] font-semibold text-[#EEEDFE]">SR</div>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[var(--bg)] bg-[#F59E0B] text-[10px] font-semibold text-[#FFF8E1]">VR</div>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[var(--bg)] bg-[#10B981] text-[10px] font-semibold text-[#E1F5EE]">PK</div>
            </div>
            <span className="text-[13px] text-[var(--text3)]"><strong className="font-medium text-[var(--text2)]">240+ students</strong> already trading</span>
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Card className="relative overflow-hidden p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full bg-[var(--green-dim)] opacity-50 blur-[40px]"></div>
          
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text4)]">Campus Activity</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.06em] text-[var(--green)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]"></span>
              </span>
              LIVE
            </span>
          </div>

          <div className="mb-4.5 grid grid-cols-3 gap-2">
            <div className="rounded-[10px] border border-[rgba(255,255,255,0.04)] bg-[var(--bg3)] p-3 text-center transition-colors hover:border-[var(--border2)]">
              <div className="mb-1 font-mono text-[22px] font-bold leading-none text-[var(--green)]">248</div>
              <div className="text-[9px] uppercase tracking-[0.08em] text-[var(--text4)]">Parts listed</div>
            </div>
            <div className="rounded-[10px] border border-[rgba(255,255,255,0.04)] bg-[var(--bg3)] p-3 text-center transition-colors hover:border-[var(--border2)]">
              <div className="mb-1 font-mono text-[22px] font-bold leading-none text-[var(--blue)]">12</div>
              <div className="text-[9px] uppercase tracking-[0.08em] text-[var(--text4)]">Today</div>
            </div>
            <div className="rounded-[10px] border border-[rgba(255,255,255,0.04)] bg-[var(--bg3)] p-3 text-center transition-colors hover:border-[var(--border2)]">
              <div className="mb-1 font-mono text-[22px] font-bold leading-none text-[var(--text)]">43</div>
              <div className="text-[9px] uppercase tracking-[0.08em] text-[var(--text4)]">Rentals</div>
            </div>
          </div>

          <div className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text4)]">Recent listings</div>

          <div className="flex flex-col gap-2">
            {[
              { icon: '🔌', type: 'sell', name: 'Arduino Uno R3', meta: '2 min ago · AK', price: '₹120', badge: 'Sell', iconClass: 'bg-[var(--green-dim)]', priceClass: 'text-[var(--green)]', badgeClass: 'bg-[var(--green-dim)] text-[var(--green)]' },
              { icon: '🍓', type: 'rent', name: 'Raspberry Pi 4B', meta: '8 min ago · SR', price: '₹80', per: '/day', badge: 'Rent', iconClass: 'bg-[var(--blue-dim)]', priceClass: 'text-[var(--blue)]', badgeClass: 'bg-[var(--blue-dim)] text-[var(--blue)]' },
              { icon: '🔧', type: 'repair', name: 'ESP32 Dev Board', meta: '15 min ago · VR', price: '₹60', badge: 'Repair', iconClass: 'bg-[var(--orange-dim)]', priceClass: 'text-[var(--orange)]', badgeClass: 'bg-[var(--orange-dim)] text-[var(--orange)]' },
              { icon: '📡', type: 'sell', name: 'NodeMCU ESP8266', meta: '22 min ago · PK', price: '₹90', badge: 'Sell', iconClass: 'bg-[var(--green-dim)]', priceClass: 'text-[var(--green)]', badgeClass: 'bg-[var(--green-dim)] text-[var(--green)]' }
            ].map((item, i) => (
              <div key={i} className="flex cursor-default items-center gap-2.5 rounded-[10px] border border-[rgba(255,255,255,0.04)] bg-[var(--bg3)] p-2.5 transition-all hover:border-[var(--border2)] hover:bg-[rgba(255,255,255,0.02)]">
                <div className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg text-[15px] ${item.iconClass}`}>{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="truncate whitespace-nowrap text-[12.5px] font-medium leading-[1.4] text-[#D1D5DB]">{item.name}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-[var(--text4)]">{item.meta}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end text-right">
                  <div className={`font-mono text-[13px] font-semibold leading-[1.3] ${item.priceClass}`}>{item.price}{item.per && <span className="text-[9px] font-normal text-[var(--text4)]">{item.per}</span>}</div>
                  <span className={`mt-1 inline-block rounded uppercase tracking-[0.08em] px-[7px] py-0.5 text-[8px] font-semibold ${item.badgeClass}`}>{item.badge}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Ticker */}
          <div className="mt-4 overflow-hidden border-t border-[rgba(255,255,255,0.05)] pt-3">
            <div className="flex animate-ticker gap-9 whitespace-nowrap hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-9">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text4)] transition-colors"><span className="h-1 w-1 shrink-0 rounded-full bg-[var(--green)]"></span>DHT22 Sensor listed · ₹35</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text4)] transition-colors"><span className="h-1 w-1 shrink-0 rounded-full bg-[var(--blue)]"></span>OLED Display rented · ₹20/day</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text4)] transition-colors"><span className="h-1 w-1 shrink-0 rounded-full bg-[var(--orange)]"></span>L298N Driver needs fix · ₹40</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text4)] transition-colors"><span className="h-1 w-1 shrink-0 rounded-full bg-[var(--green)]"></span>NodeMCU listed · ₹90</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text4)] transition-colors"><span className="h-1 w-1 shrink-0 rounded-full bg-[var(--blue)]"></span>Servo Motor rented · ₹15/day</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text4)] transition-colors"><span className="h-1 w-1 shrink-0 rounded-full bg-[var(--orange)]"></span>STM32 board repair · ₹55</span>
                </div>
              ))}
            </div>
          </div>
          </Card>
        </motion.div>
      </section>

      {/* LOGOS STRIP */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-muted)]">Trusted By Student communities</span>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--border)] shadow-[var(--shadow-sm)] lg:grid-cols-4"
        >
          {[
            { val: '240+', label: 'Active Students', change: '+12% this week' },
            { val: '₹12k', label: 'Student Savings', change: 'Estimated' },
            { val: '350+', label: 'Components Traded', change: 'All time' },
            { val: '24h', label: 'Avg Repair Time', change: 'Fast turnaround' },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col bg-[var(--bg2)] p-7">
              <div className="font-mono text-[30px] font-semibold leading-none tracking-[-0.04em] text-[var(--navy)]">{stat.val}</div>
              <div className="mt-1 text-[13px] text-[var(--text-tertiary)]">{stat.label}</div>
              <div className="mt-0.5 text-[12px] font-medium text-[var(--green)]">{stat.change}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="mb-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--accent)]">Services</div>
          <h2 className="mb-3 text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--navy)] sm:text-[36px]">Everything your project needs.</h2>
          <p className="max-w-[520px] text-[16px] leading-[1.7] text-[var(--text-secondary)]">From sourcing that missing microcontroller to getting expert help diagnosing a burnt circuit.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-[1px] overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--border)] shadow-[var(--shadow-sm)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Cpu, title: 'Buy & Sell', desc: 'Find cheap parts from seniors, or sell your old lab components to free up cash.' },
            { icon: Clock, title: 'Short-term Rent', desc: 'Need an oscilloscope or a rare sensor for just one weekend? Rent it directly from peers.' },
            { icon: Wrench, title: 'Campus Repair', desc: 'Hand off broken boards to verified student technicians for quick, affordable fixes.' },
            { icon: Zap, title: 'Upcycle', desc: 'Turn e-waste into opportunity. Trade in dead electronics for spare parts or platform credit.' }
          ].map((s, i) => (
            <div key={i} className="group flex cursor-pointer flex-col gap-3 bg-[var(--bg2)] p-7 transition-colors hover:bg-[var(--bg3)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--navy)] shadow-[var(--shadow-xs)]">
                <s.icon size={18} strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--navy)]">{s.title}</h3>
              <p className="flex-1 text-[13px] leading-[1.65] text-[var(--text-secondary)]">{s.desc}</p>
              <div className="mt-2 flex items-center gap-1 text-[13px] font-medium text-[var(--accent)] transition-all group-hover:gap-2">
                Learn more &rarr;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--accent)]">Process</div>
          <h2 className="text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--navy)] sm:text-[36px]">How 12 Electrons works</h2>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div className="absolute top-5 left-[12.5%] right-[12.5%] hidden h-px bg-gradient-to-r from-[var(--accent-border)] via-[var(--border)] to-[var(--accent-border)] sm:block"></div>
          
          {[
            { step: '01', title: 'List or Request', desc: 'Snap a picture of your component or post a request for something you need.' },
            { step: '02', title: 'Connect & Agree', desc: 'Chat securely with buyers, sellers, or technicians to agree on price and terms.' },
            { step: '03', title: 'Meet on Campus', desc: 'Exchange items safely at designated campus hubs (library, labs, cafeteria).' },
            { step: '04', title: 'Review & Build', desc: 'Test the part, leave a review, and get back to building your hardware project.' }
          ].map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white font-mono text-[13px] font-medium text-[var(--accent)] shadow-[var(--shadow-sm)]">
                {s.step}
              </div>
              <h3 className="mb-1 text-[15px] font-semibold tracking-[-0.02em] text-[var(--navy)]">{s.title}</h3>
              <p className="text-[13px] leading-[1.65] text-[var(--text-secondary)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE ROWS */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-24 space-y-24">
        {/* Feature 1: Marketplace */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--accent)]">Marketplace</div>
            <h3 className="mb-3.5 text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--navy)] sm:text-[32px]">Verified components, not random listings</h3>
            <p className="mb-6 text-[15px] leading-[1.75] text-[var(--text-secondary)]">Every part goes through a functional check before it hits the marketplace. No more buying broken components from unknown sellers.</p>
            <div className="flex flex-col gap-2">
              {['Functional check on every component', 'Seller ID verified via campus login', 'Photo + spec documentation required', '7-day buyer protection'].map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-[14px] text-[var(--text-secondary)]">
                  <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[var(--green-border)] bg-[var(--green-bg)] text-[10px] text-[var(--green)]">✓</div>
                  {check}
                </div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="overflow-hidden rounded-[20px] border border-[var(--border)] bg-white shadow-[var(--shadow-lg)]">
            <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></div>
              <div className="ml-1 text-[12px] font-medium text-[var(--text-tertiary)]">Marketplace — All components</div>
            </div>
            <div className="py-2">
              {[
                { icon: '🔌', bg: 'bg-[#eff6ff]', name: 'Arduino Uno R3', sub: 'Verified · ECE Dept', price: '₹120', badge: 'Sell', badgeClass: 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]' },
                { icon: '📡', bg: 'bg-[#fffbeb]', name: 'Raspberry Pi 4B (2GB)', sub: 'Verified · CS Dept', price: '₹80/day', badge: 'Rent', badgeClass: 'bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border-strong)]' },
                { icon: '💡', bg: 'bg-[#fdf4ff]', name: 'NeoPixel LED Strip (1m)', sub: 'Verified · Mech Dept', price: '₹220', badge: 'Sell', badgeClass: 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]' }
              ].map((item, i) => (
                <div key={i} className="flex cursor-pointer items-center gap-3 border-b border-[var(--border)] px-4 py-2.5 transition-colors hover:bg-[var(--surface)] last:border-0">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--border)] text-[14px] ${item.bg}`}>{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-[var(--text-primary)]">{item.name}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">{item.sub}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-mono text-[13px] font-medium text-[var(--text-primary)]">{item.price}</div>
                    <span className={`rounded-full border px-2 py-[2px] text-[10px] font-medium ${item.badgeClass}`}>{item.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature 2: Repair */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="overflow-hidden rounded-[20px] border border-[var(--border)] bg-white shadow-[var(--shadow-lg)]">
              <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></div>
                <div className="ml-1 text-[12px] font-medium text-[var(--text-tertiary)]">Submit repair request</div>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[var(--text-secondary)]">Component name</label>
                  <input type="text" readOnly value="ESP32 Development Board" className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[var(--text-secondary)]">Issue type</label>
                  <input type="text" readOnly value="WiFi module not responding" className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none" />
                </div>
                <div className="mt-2 flex items-center gap-2.5 rounded-md border border-[var(--green-border)] bg-[var(--green-bg)] p-2.5">
                  <div className="text-[16px]">✅</div>
                  <div>
                    <div className="text-[13px] font-medium text-[var(--green)]">Request received · Estimated 2h 30m</div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">Technician: Arjun S. · ECE Lab B</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--accent)]">Repair</div>
            <h3 className="mb-3.5 text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--navy)] sm:text-[32px]">Get your components fixed, fast</h3>
            <p className="mb-6 text-[15px] leading-[1.75] text-[var(--text-secondary)]">Submit a repair request in 60 seconds. Campus technicians diagnose and fix your components with a 3-hour average turnaround.</p>
            <div className="flex flex-col gap-2">
              {['Free initial diagnostics', '3-hour average turnaround', 'Transparent pricing upfront', '14-day repair warranty'].map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-[14px] text-[var(--text-secondary)]">
                  <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[var(--green-border)] bg-[var(--green-bg)] text-[10px] text-[var(--green)]">✓</div>
                  {check}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <div className="mb-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--accent)]">Students love it</div>
          <h2 className="text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--navy)] sm:text-[36px]">Built for the campus community</h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-[var(--text-secondary)]">From final-year projects to hackathon builds — 12 Electrons has students covered.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { quote: '"Found an Arduino Uno for my capstone project in literally 10 minutes. Saved ₹300 compared to the shop near campus."', initials: 'AK', bg: 'bg-[#2563eb]', name: 'Arjun Kumar', role: '4th year, ECE · NITW' },
            { quote: '"Rented a Raspberry Pi for our semester project for just ₹80/day. No need to buy expensive gear for a 2-week project anymore."', initials: 'SR', bg: 'bg-[#7c3aed]', name: 'Sneha Rao', role: '3rd year, CS · IIT-H' },
            { quote: '"The repair service fixed my ESP32 in under 3 hours. Free diagnosis + transparent pricing — exactly what we needed on campus."', initials: 'VP', bg: 'bg-[#059669]', name: 'Vikram Prasad', role: '2nd year, EEE · JNTU' }
          ].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col gap-4 rounded-[14px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
              <div className="flex gap-0.5 text-[13px] text-[#f59e0b]">★★★★★</div>
              <p className="flex-1 text-[14px] italic leading-[1.7] text-[var(--text-secondary)]">{t.quote}</p>
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white ${t.bg}`}>{t.initials}</div>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-[12px] text-[var(--text-tertiary)]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative overflow-hidden rounded-[20px] bg-[var(--navy)] p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-blue-600/30 blur-[80px]"></div>
          <div className="pointer-events-none absolute -bottom-16 left-[20%] h-[200px] w-[200px] rounded-full bg-blue-500/20 blur-[60px]"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left gap-12">
            <div className="max-w-md">
              <div className="mb-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-sky-300/80">Get started today</div>
              <h2 className="mb-2.5 text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] text-white">Start building smarter,<br/>spending less.</h2>
              <p className="text-[15px] leading-[1.65] text-white/50">Join 240+ students already trading, renting and repairing on the campus electronics platform.</p>
            </div>
            <div className="flex shrink-0 flex-row gap-2.5">
              <Link to="/marketplace" className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-white px-6 py-3 text-[14px] font-semibold text-[var(--navy)] transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                Browse marketplace &rarr;
              </Link>
              <Link to="/sell" className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/15 bg-white/10 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/15">
                Sell a part
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
