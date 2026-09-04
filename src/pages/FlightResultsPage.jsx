import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Filter, ArrowUpDown, Plane, X, ArrowLeft, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FlightCard from '../components/FlightCard'
import StepIndicator from '../components/StepIndicator'
import { useBooking } from '../context/BookingContext'
import { searchFlights } from '../services/flight.service'
import { AIRPORTS } from '../data/mockData'

function SkeletonCard() {
  return (
    <div className="card p-5 animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-3 sm:w-44">
          <div className="w-10 h-10 bg-gray-200 rounded-xl shimmer" />
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded shimmer" />
            <div className="h-2 w-16 bg-gray-200 rounded shimmer" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4">
          <div className="h-8 w-16 bg-gray-200 rounded shimmer" />
          <div className="flex-1 h-1 bg-gray-200 rounded shimmer" />
          <div className="h-8 w-16 bg-gray-200 rounded shimmer" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded shimmer" />
          <div className="h-10 w-20 bg-gray-200 rounded-xl shimmer" />
        </div>
      </div>
    </div>
  )
}

export default function FlightResultsPage() {
  const navigate = useNavigate()
  const { searchParams, setSelectedFlight } = useBooking()

  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [sortBy, setSortBy] = useState('price')
  const [filterOpen, setFilterOpen] = useState(false)

  // Filters
  const [maxPrice, setMaxPrice] = useState(200000)
  const [stopsFilter, setStopsFilter] = useState([])
  const [airlinesFilter, setAirlinesFilter] = useState([])
  const [depTimeFilter, setDepTimeFilter] = useState([])

  useEffect(() => {
    if (!searchParams) { navigate('/'); return }

    setLoading(true)
    setError('')

    searchFlights(searchParams)
      .then((data) => {
        setFlights(data)
        if (data.length > 0) {
          setMaxPrice(Math.max(...data.map((f) => f.pricePerPerson)) + 1000)
        }
      })
      .catch((err) => setError(err.message || 'Failed to load flights. Please try again.'))
      .finally(() => setLoading(false))
  }, [searchParams])

  const uniqueAirlines = useMemo(() => [...new Set(flights.map((f) => f.airline))], [flights])

  const filtered = useMemo(() => {
    let list = [...flights]
    list = list.filter((f) => f.pricePerPerson <= maxPrice)
    if (stopsFilter.length > 0) list = list.filter((f) => stopsFilter.includes(f.stops))
    if (airlinesFilter.length > 0) list = list.filter((f) => airlinesFilter.includes(f.airline))
    if (depTimeFilter.includes('morning'))   list = list.filter((f) => { const h = parseInt(f.departureTime); return h >= 6 && h < 12 })
    if (depTimeFilter.includes('afternoon')) list = list.filter((f) => { const h = parseInt(f.departureTime); return h >= 12 && h < 18 })
    if (depTimeFilter.includes('evening'))   list = list.filter((f) => { const h = parseInt(f.departureTime); return h >= 18 })

    if (sortBy === 'price')      list.sort((a, b) => a.pricePerPerson - b.pricePerPerson)
    else if (sortBy === 'price_desc') list.sort((a, b) => b.pricePerPerson - a.pricePerPerson)
    else if (sortBy === 'duration')  list.sort((a, b) => a.durationMins - b.durationMins)
    else if (sortBy === 'departure') list.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
    else if (sortBy === 'arrival')   list.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime))
    return list
  }, [flights, maxPrice, stopsFilter, airlinesFilter, depTimeFilter, sortBy])

  const handleSelect = (flight) => { setSelectedId(flight.id); setSelectedFlight(flight) }
  const handleContinue = () => { if (selectedId) navigate('/passengers') }

  const toggleStop    = (v) => setStopsFilter((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])
  const toggleAirline = (v) => setAirlinesFilter((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])
  const toggleDepTime = (v) => setDepTimeFilter((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])

  const fromCity = AIRPORTS.find((a) => a.code === searchParams?.from)?.city || searchParams?.from
  const toCity   = AIRPORTS.find((a) => a.code === searchParams?.to)?.city   || searchParams?.to
  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)

  if (!searchParams) return null

  const FilterPanel = () => (
    <>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </h3>
        <button onClick={() => { setStopsFilter([]); setAirlinesFilter([]); setDepTimeFilter([]) }}
          className="text-xs text-blue-600 hover:underline">Reset all</button>
      </div>
      {/* Price */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Max Price / Person</h4>
        <input type="range" min={1000} max={200000} step={500} value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-600" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹1,000</span>
          <span className="font-semibold text-blue-600">{formatPrice(maxPrice)}</span>
        </div>
      </div>
      {/* Stops */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Stops</h4>
        {[{ val: 0, label: 'Non-stop' }, { val: 1, label: '1 Stop' }, { val: 2, label: '2+ Stops' }].map((s) => (
          <label key={s.val} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" checked={stopsFilter.includes(s.val)} onChange={() => toggleStop(s.val)}
              className="w-4 h-4 accent-blue-600 rounded" />
            <span className="text-sm text-gray-700">{s.label}</span>
          </label>
        ))}
      </div>
      {/* Airlines */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Airlines</h4>
        {uniqueAirlines.map((a) => (
          <label key={a} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" checked={airlinesFilter.includes(a)} onChange={() => toggleAirline(a)}
              className="w-4 h-4 accent-blue-600 rounded" />
            <span className="text-sm text-gray-700">{a}</span>
          </label>
        ))}
      </div>
      {/* Departure time */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Departure Time</h4>
        {[
          { val: 'morning',   label: '🌅 Morning (6am–12pm)' },
          { val: 'afternoon', label: '☀️ Afternoon (12–6pm)' },
          { val: 'evening',   label: '🌇 Evening (6pm+)' },
        ].map((t) => (
          <label key={t.val} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" checked={depTimeFilter.includes(t.val)} onChange={() => toggleDepTime(t.val)}
              className="w-4 h-4 accent-blue-600 rounded" />
            <span className="text-sm text-gray-700">{t.label}</span>
          </label>
        ))}
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
            <button onClick={() => navigate('/')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Modify Search
            </button>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                <span className="font-bold text-gray-800">{fromCity}</span>
                <Plane className="w-4 h-4 text-blue-600 rotate-90" />
                <span className="font-bold text-gray-800">{toCity}</span>
              </div>
              <div className="text-sm text-gray-500 hidden sm:block">
                {searchParams.departDate} · {searchParams.passengers} {searchParams.passengers === 1 ? 'Adult' : 'Adults'} · {searchParams.cabinClass}
              </div>
            </div>
          </div>
          <StepIndicator currentStep={2} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="card p-5 sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                {!loading && !error && (
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">{filtered.length}</span> flights found
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" /> Filters
                </button>
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                    <option value="price">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="duration">Duration: Shortest</option>
                    <option value="departure">Departure: Earliest</option>
                    <option value="arrival">Arrival: Earliest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error state */}
            {error && (
              <div className="card p-6 flex items-center gap-3 text-red-600 border-red-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-semibold">Could not load flights</p>
                  <p className="text-sm text-red-500">{error}</p>
                  <button onClick={() => window.location.reload()} className="text-sm text-blue-600 hover:underline mt-1">Retry</button>
                </div>
              </div>
            )}

            {/* Flight list */}
            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
              ) : !error && filtered.length === 0 ? (
                <div className="card p-12 text-center">
                  <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No flights found</h3>
                  <p className="text-sm text-gray-400">Try adjusting your filters</p>
                </div>
              ) : (
                filtered.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} onSelect={handleSelect} selected={flight.id === selectedId} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky continue bar */}
      {selectedId && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {flights.find((f) => f.id === selectedId)?.airline} · {flights.find((f) => f.id === selectedId)?.flightNumber}
                </p>
                <p className="text-xs text-gray-500">
                  {flights.find((f) => f.id === selectedId)?.departureTime} → {flights.find((f) => f.id === selectedId)?.arrivalTime} · {flights.find((f) => f.id === selectedId)?.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xl font-black text-gray-900">
                  {formatPrice(flights.find((f) => f.id === selectedId)?.price)}
                </p>
                <p className="text-xs text-gray-500">total for {searchParams.passengers} pax</p>
              </div>
              <button onClick={handleContinue} className="btn-primary text-base px-8 py-3">
                Continue →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="relative ml-auto w-80 bg-white h-full overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-1">
              <span />
              <button onClick={() => setFilterOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <FilterPanel />
            <button onClick={() => setFilterOpen(false)} className="btn-primary w-full mt-6">Apply Filters</button>
          </div>
        </div>
      )}

      <div className={selectedId ? 'pb-28' : ''}>
        <Footer />
      </div>
    </div>
  )
}
