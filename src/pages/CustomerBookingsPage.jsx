import { useEffect, useState } from 'react'
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Plane, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getMyBookings } from '../services/booking.service'

const statusStyles = {
  new: 'bg-amber-50 text-amber-700 border-amber-200',
  contacted: 'bg-sky-50 text-sky-700 border-sky-200',
  processing: 'bg-violet-50 text-violet-700 border-violet-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

const formatPrice = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value || 0)

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadBookings = () => {
    setLoading(true)
    setError('')
    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message || 'Unable to load your bookings.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadBookings() }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-700 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <h1 className="text-3xl font-black text-gray-900">My Trips</h1>
            <p className="text-sm text-gray-500 mt-1">View your booked flights and booking status.</p>
          </div>
          <button onClick={loadBookings} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {error && (
          <div className="card p-4 mb-5 flex items-center gap-3 text-red-600 border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((item) => <div key={item} className="card h-48 shimmer animate-pulse" />)}
          </div>
        ) : bookings.length === 0 ? (
          <div className="card p-8 sm:p-12 text-center">
            <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800">No bookings yet</h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">Your confirmed booking details will appear here.</p>
            <Link to="/" className="btn-primary inline-flex">Search flights</Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <article key={booking._id} className="card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Booking reference</p>
                    <p className="font-mono text-lg font-black text-emerald-700 mt-1">{booking.bookingRef}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full border text-xs font-bold capitalize ${statusStyles[booking.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {booking.status === 'completed' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Plane className="w-5 h-5 rotate-90" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg font-black text-gray-900 truncate">{booking.flight.from} <span className="text-gray-300 mx-1">→</span> {booking.flight.to}</p>
                      <p className="text-sm text-gray-500">{booking.flight.airline} · {booking.flight.flightNumber}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:text-right sm:min-w-44">
                    <div>
                      <p className="text-xs text-gray-400 flex items-center gap-1 sm:justify-end"><Calendar className="w-3 h-3" /> Travel date</p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">{booking.flight.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(booking.payment?.amount)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl bg-gray-50 p-3 text-sm">
                  <p><span className="text-gray-400">Departure</span><br /><strong>{booking.flight.departureTime}</strong></p>
                  <p><span className="text-gray-400">Arrival</span><br /><strong>{booking.flight.arrivalTime}</strong></p>
                  <p><span className="text-gray-400">Passengers</span><br /><strong>{booking.passengers?.length || 0}</strong></p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
