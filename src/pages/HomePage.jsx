import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plane, ArrowRightLeft, Calendar, Users, Search,
  Shield, ChevronRight, TrendingUp, Star,
  Clock, CheckCircle, Globe, Headphones, Award
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingContext'
import { AIRPORTS } from '../data/mockData'

const TRIP_TYPES    = ['One Way', 'Round Trip', 'Multi-City']
const CABIN_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First Class']

// ─────────────────────────────────────────────────────────────────────────────
// Airport dropdown — dark themed
// ─────────────────────────────────────────────────────────────────────────────
function AirportField({ label, value, onChange, placeholder }) {
  const [open,  setOpen]  = useState(false)
  const [query, setQuery] = useState('')

  const filtered = AIRPORTS.filter(a =>
    a.city.toLowerCase().includes(query.toLowerCase()) ||
    a.code.toLowerCase().includes(query.toLowerCase()) ||
    a.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8)

  const selected = AIRPORTS.find(a => a.code === value)

  const pick = (code) => {
    onChange(code)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="relative flex-1 min-w-0 min-h-[128px]">
      {/* Label */}
      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <Plane className="w-3 h-3" /> {label}
      </p>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(true); setQuery('') }}
        className="w-full text-left focus:outline-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 shadow-inner shadow-black/20 transition-all duration-200 hover:border-blue-400/40 hover:bg-white/[0.05]"
      >
        {selected ? (
          <>
            <div className="flex items-end justify-between gap-2 leading-none">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{selected.code}</span>
                <p className="text-sm text-white/50 font-medium mt-2 truncate">{selected.city}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/80 bg-blue-500/10 border border-blue-400/20 rounded-full px-2 py-1">
                {selected.country}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-end justify-between gap-2 leading-none">
              <span className="text-3xl sm:text-4xl font-black text-white/10 tracking-tight">- - -</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">City</span>
            </div>
            <p className="text-sm text-white/25 font-medium mt-2">{placeholder}</p>
          </>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => { setOpen(false); setQuery('') }}
          />
          <div className="absolute z-[70] top-full left-0 w-[min(84vw,22rem)] mt-4 bg-[#0f1629] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
            {/* Search input */}
            <div className="p-3 border-b border-white/10 bg-white/[0.03]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search city or airport..."
                />
              </div>
            </div>
            {/* Results */}
            <div className="max-h-72 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm text-white/30 text-center">No results</p>
              )}
              {filtered.map(airport => (
                <button
                  key={airport.code}
                  type="button"
                  onMouseDown={e => e.preventDefault()} /* prevent input blur */
                  onClick={() => pick(airport.code)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
                >
                  <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-blue-400">{airport.code}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white/90">{airport.city}</p>
                    <p className="text-xs text-white/30 truncate">{airport.name}</p>
                  </div>
                  <span className="text-[10px] font-bold text-white/25 bg-white/5 px-2 py-0.5 rounded-md shrink-0">
                    {airport.country}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Date field — dark, custom-styled over a native <input type="date">
// ─────────────────────────────────────────────────────────────────────────────
function DateField({ label, value, min, onChange, disabled, dimmed }) {
  const inputRef = useRef(null)

  const fmt = v =>
    new Date(v + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: '2-digit',
    })
  const day = v =>
    new Date(v + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long' })

  const openPicker = () => {
    if (!disabled && inputRef.current) {
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker()
      } else {
        inputRef.current.click()
      }
    }
  }

  return (
    <div className={`relative transition-opacity h-full ${dimmed ? 'opacity-30 pointer-events-none' : ''}`}>
      <button
        type="button"
        onClick={openPicker}
        disabled={disabled}
        className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl px-4 py-3.5 transition-all duration-200 cursor-pointer h-full flex flex-col justify-center"
      >
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5 pointer-events-none">
          <Calendar className="w-3 h-3" /> {label}
        </p>
        {value ? (
          <div className="pointer-events-none">
            <p className="text-white font-bold text-base leading-none">{fmt(value)}</p>
            <p className="text-[11px] text-white/30 font-medium mt-1">{day(value)}</p>
          </div>
        ) : (
          <p className="text-white/20 font-bold text-sm pointer-events-none">Select date</p>
        )}
      </button>

      <input
        ref={inputRef}
        type="date"
        min={min}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="sr-only absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ value, label, icon: Icon }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-blue-300" />
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-blue-300 font-medium mt-0.5">{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate()
  const { setSearchParams } = useBooking()

  const [tripType,    setTripType]    = useState('One Way')
  const [from,        setFrom]        = useState('')
  const [to,          setTo]          = useState('')
  const [departDate,  setDepartDate]  = useState('')
  const [returnDate,  setReturnDate]  = useState('')
  const [passengers,  setPassengers]  = useState(1)
  const [cabinClass,  setCabinClass]  = useState('Economy')
  const [error,       setError]       = useState('')

  const today = new Date().toISOString().split('T')[0]

  const swap = () => { setFrom(to); setTo(from) }

  const handleSearch = () => {
    if (!from)       return setError('Please select a departure city')
    if (!to)         return setError('Please select a destination city')
    if (from === to) return setError('Departure and destination cannot be the same')
    if (!departDate) return setError('Please select a departure date')
    setError('')
    setSearchParams({
      from, to, departDate,
      returnDate: tripType === 'Round Trip' ? returnDate : null,
      passengers, cabinClass, tripType,
    })
    navigate('/flights')
  }

  const popularRoutes = [
    { from:'DEL', fromCity:'New Delhi',  to:'BOM', toCity:'Mumbai',    price:'₹2,899',  tag:'Most Popular',  bg:'from-orange-500 to-pink-500'    },
    { from:'BOM', fromCity:'Mumbai',     to:'DXB', toCity:'Dubai',     price:'₹14,500', tag:'International', bg:'from-blue-500 to-cyan-500'      },
    { from:'BLR', fromCity:'Bengaluru',  to:'DEL', toCity:'New Delhi', price:'₹3,200',  tag:'Business Hub',  bg:'from-violet-500 to-purple-500'  },
    { from:'DEL', fromCity:'New Delhi',  to:'SIN', toCity:'Singapore', price:'₹21,000', tag:'Popular Intl',  bg:'from-emerald-500 to-teal-500'   },
    { from:'BOM', fromCity:'Mumbai',     to:'GOI', toCity:'Goa',       price:'₹3,099',  tag:'Leisure',       bg:'from-amber-500 to-orange-500'   },
    { from:'HYD', fromCity:'Hyderabad',  to:'BOM', toCity:'Mumbai',    price:'₹3,800',  tag:'Quick Hop',     bg:'from-rose-500 to-pink-500'      },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[auto] lg:min-h-[92vh] flex flex-col justify-center overflow-visible bg-[#0d1716]">

        {/* Grid texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-[min(600px,90vw)] h-[min(600px,90vw)] bg-emerald-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[min(500px,80vw)] h-[min(500px,80vw)] bg-teal-700/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-20 w-full">

          {/* Live badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm text-white/70 text-xs font-medium px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live prices · 300+ airlines · Instant confirmation
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-12">
            <h1 className="text-[2.65rem] sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5">
              Your journey starts
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-200">
                  with one search
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none">
                  <path d="M0 8 Q100 2 200 8 Q300 14 400 8" stroke="url(#u1)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="u1" x1="0" x2="400" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6ee7b7"/><stop offset="1" stopColor="#fcd34d"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/45 font-medium max-w-md mx-auto">
              Compare live fares, choose your flight, and let our team take it from there.
            </p>
          </div>

          {/* ── SEARCH CARD ──────────────────────────────────────────────── */}
          <div className="max-w-5xl mx-auto">

            {/* Trip type tabs + cabin class */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {TRIP_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTripType(t)}
                      className={`flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                    tripType === t
                      ? 'bg-white text-emerald-800 shadow-lg shadow-black/20'
                      : 'text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >{t}</button>
              ))}
              <div className="w-full sm:w-auto sm:ml-auto">
                <select
                  value={cabinClass}
                  onChange={e => setCabinClass(e.target.value)}
                  className="w-full sm:w-auto text-xs font-bold text-white/60 bg-white/5 border border-white/15 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-400 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {CABIN_CLASSES.map(c => (
                    <option key={c} className="text-gray-900 bg-white font-medium">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Card */}
            <div className="relative rounded-2xl sm:rounded-[32px] overflow-visible shadow-[0_30px_80px_rgba(5,25,22,0.7)] ring-1 ring-white/10 border border-white/10 bg-[linear-gradient(180deg,rgba(16,30,29,0.94),rgba(16,30,29,0.78))] backdrop-blur-xl">

              <div className="p-3 sm:p-5">
                <div className="flex flex-col xl:flex-row gap-3">
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
                      <AirportField
                        label="From"
                        value={from}
                        onChange={setFrom}
                        placeholder="Departure city"
                      />

                      <div className="flex flex-col items-center justify-center shrink-0 px-1">
                          <div className="w-px h-5 bg-white/10 hidden sm:block" />
                        <button
                          type="button"
                          onClick={swap}
                          className="my-2 w-10 h-10 self-center bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-300/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group shadow-lg shadow-emerald-900/30"
                        >
                          <ArrowRightLeft className="w-4 h-4 text-white transition-colors" />
                        </button>
                        <div className="w-px h-5 bg-white/10 hidden sm:block" />
                      </div>

                      <AirportField
                        label="To"
                        value={to}
                        onChange={setTo}
                        placeholder="Destination city"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                  <DateField
                    label="Departure"
                    value={departDate}
                    min={today}
                    onChange={e => setDepartDate(e.target.value)}
                  />

                  <DateField
                    label="Return"
                    value={returnDate}
                    min={departDate || today}
                    onChange={e => setReturnDate(e.target.value)}
                    disabled={tripType !== 'Round Trip'}
                    dimmed={tripType !== 'Round Trip'}
                  />

                  <div className="relative">
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl px-4 py-3.5 transition-all duration-200 h-full flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Users className="w-3 h-3" /> Travellers
                      </p>
                      <select
                        value={passengers}
                        onChange={e => setPassengers(Number(e.target.value))}
                        className="w-full bg-transparent text-white font-bold text-base focus:outline-none cursor-pointer"
                      >
                        {[1,2,3,4,5,6].map(n => (
                          <option key={n} value={n} className="text-gray-900 bg-white">
                            {n} {n === 1 ? 'Adult' : 'Adults'}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-white/30 font-medium mt-0.5">{cabinClass}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl px-4 py-3.5 transition-all duration-200 h-full flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Plane className="w-3 h-3" /> Cabin
                      </p>
                      <select
                        value={cabinClass}
                        onChange={e => setCabinClass(e.target.value)}
                        className="w-full bg-transparent text-white font-bold text-base focus:outline-none cursor-pointer"
                      >
                        {CABIN_CLASSES.map(c => (
                          <option key={c} className="text-gray-900 bg-white font-medium">{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="relative overflow-hidden group bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600 text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(16,100,80,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 min-h-[82px]"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <div className="relative flex flex-col items-center justify-center gap-1 py-3">
                      <Search className="w-5 h-5" />
                      <span className="text-sm font-black tracking-wide">Search</span>
                      <span className="text-[9px] text-emerald-100 font-medium tracking-widest uppercase">Live Fares</span>
                    </div>
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3 rounded-xl">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0 animate-pulse" />
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Quick picks */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-white/30 font-medium">Quick:</span>
              {[
                { label: 'Delhi → Mumbai',    from: 'DEL', to: 'BOM' },
                { label: 'Mumbai → Dubai',    from: 'BOM', to: 'DXB' },
                { label: 'Bengaluru → Goa',   from: 'BLR', to: 'GOI' },
              ].map(q => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => { setFrom(q.from); setTo(q.to) }}
                  className="text-xs text-white/40 hover:text-blue-400 border border-white/10 hover:border-blue-500/40 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-500/10"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <StatCard value="300+" label="Airlines"     icon={Plane}      />
            <StatCard value="1M+"  label="Passengers"   icon={Users}      />
            <StatCard value="150+" label="Destinations" icon={Globe}      />
            <StatCard value="24/7" label="Support"      icon={Headphones} />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield,       text: 'PCI-DSS Secure Payments' },
              { icon: Clock,        text: 'Real-time Flight Prices'  },
              { icon: CheckCircle,  text: 'Confirmed by Our Team'    },
              { icon: Award,        text: 'Best Price Guarantee'     },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 text-gray-500">
                <item.icon className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR ROUTES ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">Trending Now</p>
              <h2 className="text-3xl font-black text-gray-900">Popular Routes</h2>
            </div>
            <p className="text-sm text-gray-400 hidden sm:block">Prices update in real-time</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map(route => (
              <button
                key={`${route.from}-${route.to}`}
                type="button"
                onClick={() => {
                  setFrom(route.from); setTo(route.to)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 text-left p-5"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${route.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="flex items-start justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${route.bg} text-white`}>
                    {route.tag}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <p className="text-2xl font-black text-gray-900">{route.from}</p>
                    <p className="text-xs text-gray-400 font-medium">{route.fromCity}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-center w-full">
                      <div className="flex-1 h-px bg-gray-200" />
                      <Plane className="w-3.5 h-3.5 text-gray-300 mx-1.5 rotate-90" />
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <p className="text-[10px] text-gray-300 mt-1">Direct</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">{route.to}</p>
                    <p className="text-xs text-gray-400 font-medium">{route.toCity}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Starting from</p>
                  <p className="text-lg font-black text-gray-900">{route.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Book in 4 Easy Steps</h2>
            <p className="text-gray-400 max-w-md mx-auto">No hidden steps, no confusing pages. Just a clean, fast booking experience.</p>
          </div>

          <div className="relative">
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 hidden lg:block" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { n:'01', icon:Search, color:'bg-blue-500',    title:'Search',     desc:'Enter route, dates and passenger count.'     },
                { n:'02', icon:Plane,  color:'bg-violet-500',  title:'Select',     desc:'Filter results and pick the best deal.'      },
                { n:'03', icon:Users,  color:'bg-emerald-500', title:'Passengers', desc:'Fill in passenger and contact details.'      },
                { n:'04', icon:Shield, color:'bg-orange-500',  title:'Pay & Done', desc:'Secure payment. Our team confirms it.'       },
              ].map(item => (
                <div key={item.n} className="flex flex-col items-center text-center group">
                  <div className="relative mb-5">
                    <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-9 h-9 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-[9px] font-black text-gray-500">{item.n}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-[180px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-2">Why FlightConnect</p>
            <h2 className="text-3xl font-black text-white mb-3">Built Different</h2>
            <p className="text-white/40 max-w-md mx-auto">We're not just a search engine — we're your personal booking team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon:Shield,      gradient:'from-blue-500/20 to-cyan-500/10',     border:'border-blue-500/20',    iconBg:'bg-blue-500/20',    iconColor:'text-blue-400',    title:'Bank-Grade Security',     badge:'PCI-DSS Compliant',    badgeColor:'bg-blue-500/20 text-blue-400',    desc:"Card details are tokenized by the payment processor. We never see or store your full card number or CVV — that's not just our policy, it's the law." },
              { icon:TrendingUp,  gradient:'from-violet-500/20 to-purple-500/10', border:'border-violet-500/20',  iconBg:'bg-violet-500/20',  iconColor:'text-violet-400',  title:'Live Flight Data',        badge:'Powered by Duffel',    badgeColor:'bg-violet-500/20 text-violet-400',  desc:'Real-time fares from 300+ airlines via the Duffel API. Every search shows the freshest price — no cached results, no bait-and-switch.'             },
              { icon:Headphones,  gradient:'from-emerald-500/20 to-teal-500/10',  border:'border-emerald-500/20', iconBg:'bg-emerald-500/20', iconColor:'text-emerald-400', title:'Human Confirmation',      badge:'Personal Service',     badgeColor:'bg-emerald-500/20 text-emerald-400', desc:"Every booking is personally reviewed by our team. We call you, confirm the details, and process it — you're never left with just an auto-reply."     },
            ].map(item => (
              <div key={item.title} className={`relative bg-gradient-to-br ${item.gradient} border ${item.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300`}>
                <div className={`w-12 h-12 ${item.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${item.badgeColor} mb-3`}>
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-3xl font-black text-gray-900">Travellers Love Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name:'Rahul Sharma', role:'Business Traveller', city:'Delhi',  stars:5, text:'The search is fast and prices are always accurate. The team called me within an hour to confirm my Dubai booking. Absolutely seamless.' },
              { name:'Priya Nair',   role:'Family Holidayer',   city:'Kochi',  stars:5, text:'Booked 4 tickets to Goa for a family trip. The process was super simple, and I loved that a real person followed up to confirm everything.' },
              { name:'Vikram Joshi', role:'Frequent Flyer',     city:'Mumbai', stars:5, text:'Tried many booking platforms. FlightConnect is the only one where someone actually calls to confirm. That kind of service is rare these days.' },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_,i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:`radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize:'32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to take off?</h2>
          <p className="text-blue-200 mb-8 text-lg">Search live flights now — no account needed.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <Search className="w-5 h-5" />
            Search Flights Now
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
