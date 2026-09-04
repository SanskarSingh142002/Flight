import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plane, User, CreditCard, Phone, Mail, MessageSquare, Shield, CheckCircle, Save, AlertCircle, RefreshCw } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { getBookingById, updateBookingStatus, updateBookingNotes, updatePaymentStatus } from '../../services/admin.service'
import { useAdminAuth } from '../../context/AdminAuthContext'

const STATUS_CONFIG = {
  new:        { label: 'New',        color: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500'   },
  contacted:  { label: 'Contacted',  color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  completed:  { label: 'Completed',  color: 'bg-green-100 text-green-700',   dot: 'bg-green-500'  },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',      dot: 'bg-red-500'    },
}
const STATUS_FLOW = ['new', 'contacted', 'processing', 'completed']

export default function AdminBookingDetail() {
  const { id } = useParams()
  const { adminUser } = useAdminAuth()

  const [booking, setBooking] = useState(null)
  const [notes,   setNotes]   = useState('')
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  const [statusSaving, setStatusSaving] = useState(false)
  const [statusSaved,  setStatusSaved]  = useState(false)
  const [notesSaving,  setNotesSaving]  = useState(false)
  const [notesSaved,   setNotesSaved]   = useState(false)
  const [paymentSaving, setPaymentSaving] = useState(false)
  const [paymentSaved, setPaymentSaved] = useState(false)

  const load = () => {
    setLoading(true)
    setError('')
    getBookingById(id)
      .then((data) => { setBooking(data); setNotes(data.notes || '') })
      .catch((e)   => setError(e.message))
      .finally(()  => setLoading(false))
  }

  useEffect(() => { load() }, [id])

  const changeStatus = async (status) => {
    setStatusSaving(true)
    try {
      await updateBookingStatus(id, status)
      setBooking((prev) => ({
        ...prev,
        status,
        statusHistory: [
          ...(prev.statusHistory || []),
          { status, timestamp: new Date().toISOString(), changedBy: adminUser?.name || 'admin' },
        ],
      }))
      setStatusSaved(true)
      setTimeout(() => setStatusSaved(false), 2000)
    } catch (e) {
      alert('Failed to update status: ' + e.message)
    } finally {
      setStatusSaving(false)
    }
  }

  const saveNotes = async () => {
    setNotesSaving(true)
    try {
      await updateBookingNotes(id, notes)
      setNotesSaved(true)
      setTimeout(() => setNotesSaved(false), 2000)
    } catch (e) {
      alert('Failed to save notes: ' + e.message)
    } finally {
      setNotesSaving(false)
    }
  }

  const changePaymentStatus = async (status) => {
    setPaymentSaving(true)
    try {
      const updated = await updatePaymentStatus(id, status)
      setBooking(updated)
      setPaymentSaved(true)
      setTimeout(() => setPaymentSaved(false), 2000)
    } catch (e) {
      alert('Failed to update payment: ' + e.message)
    } finally {
      setPaymentSaving(false)
    }
  }

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)
  const formatDate  = (d) => new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  if (loading) return (
    <AdminLayout title="Booking Detail">
      <div className="space-y-4">
        {[1,2,3].map(i => <div key={i} className="card p-6 h-36 shimmer animate-pulse" />)}
      </div>
    </AdminLayout>
  )

  if (error || !booking) return (
    <AdminLayout title="Booking Detail">
      <div className="card p-6 flex items-center gap-3 text-red-600 border-red-200 mb-4">
        <AlertCircle className="w-5 h-5" /> {error || 'Booking not found'}
        <button onClick={load} className="ml-2 flex items-center gap-1 text-blue-600 text-sm hover:underline">
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </button>
      </div>
      <Link to="/admin/bookings" className="text-blue-600 hover:underline text-sm">← Back to Bookings</Link>
    </AdminLayout>
  )

  const s = STATUS_CONFIG[booking.status]
  const currentStepIdx = STATUS_FLOW.indexOf(booking.status)

  return (
    <AdminLayout title="Booking Detail">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/bookings" className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
            <ArrowLeft className="w-4 h-4" /> All Bookings
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-mono text-sm font-bold text-blue-700">{booking.bookingRef}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge ${s?.color} flex items-center gap-1.5 text-sm px-3 py-1.5`}>
            <span className={`w-2 h-2 rounded-full ${s?.dot}`} />{s?.label}
          </span>
          {statusSaved && (
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium animate-fade-in">
              <CheckCircle className="w-4 h-4" /> Updated
            </span>
          )}
        </div>
      </div>

      {/* Status workflow */}
      <div className="card p-4 sm:p-5 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Booking Status</h3>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {STATUS_FLOW.map((status, idx) => {
            const cfg      = STATUS_CONFIG[status]
            const isActive = booking.status === status
            const isPast   = currentStepIdx > idx
            const isCancelled = booking.status === 'cancelled'
            return (
              <button key={status} onClick={() => !isCancelled && changeStatus(status)}
                disabled={isCancelled || statusSaving}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border
                  ${isActive ? `${cfg.color} border-current shadow-md` : isPast ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300'}
                  ${(isCancelled || statusSaving) ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}>
                {statusSaving && isActive
                  ? <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  : isPast ? '✓' : idx + 1}
                . {cfg.label}
              </button>
            )
          })}
          <button onClick={() => changeStatus('cancelled')}
            disabled={booking.status === 'cancelled' || booking.status === 'completed' || statusSaving}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Cancel
          </button>
        </div>

        {/* History */}
        {(booking.statusHistory || []).length > 0 && (
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">History</p>
            <div className="space-y-1.5">
              {booking.statusHistory.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[h.status]?.dot || 'bg-gray-400'}`} />
                  <span className="font-medium text-gray-700">{STATUS_CONFIG[h.status]?.label || h.status}</span>
                  <span>—</span>
                  <span>{formatDate(h.timestamp)}</span>
                  <span className="text-gray-400">by {h.changedBy}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer details */}
          <div className="card p-4 sm:p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p className="text-xs font-semibold text-gray-500 mb-0.5">Full Name</p><p className="font-semibold text-gray-800">{booking.customer.name}</p></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Phone</p>
                <a href={`tel:${booking.customer.phone}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />{booking.customer.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Email</p>
                <a href={`mailto:${booking.customer.email}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />{booking.customer.email}
                </a>
              </div>
              <div><p className="text-xs font-semibold text-gray-500 mb-0.5">Booked On</p><p className="font-semibold text-gray-800">{formatDate(booking.createdAt)}</p></div>
            </div>

            {/* Passengers */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">Passengers</p>
              {(booking.passengers || []).map((p, i) => (
                <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3 last:mb-0 bg-gray-50 p-3 rounded-xl">
                  <div><p className="text-xs text-gray-400">Name</p><p className="font-medium">{p.firstName} {p.lastName}</p></div>
                  <div><p className="text-xs text-gray-400">DOB</p><p className="font-medium">{p.dob}</p></div>
                  <div><p className="text-xs text-gray-400">Nationality</p><p className="font-medium">{p.nationality}</p></div>
                  <div><p className="text-xs text-gray-400">Passport</p><p className="font-medium">{p.passport || '—'}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* Flight details */}
          <div className="card p-4 sm:p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-600" /> Flight Details
            </h3>
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-800">{booking.flight.airline}</p>
                  <p className="text-sm text-gray-500">{booking.flight.flightNumber} · {booking.flight.cabinClass}</p>
                </div>
                <span className={`badge ${booking.flight.stops === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {booking.flight.stops === 0 ? 'Non-stop' : `${booking.flight.stops} stop`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-black">{booking.flight.departureTime}</p>
                  <p className="text-sm font-bold text-gray-700">{booking.flight.from}</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <p className="text-xs text-gray-400">{booking.flight.duration}</p>
                  <div className="w-full flex items-center my-1">
                    <div className="flex-1 h-px bg-gray-300" />
                    <Plane className="w-3.5 h-3.5 text-blue-500 mx-1 rotate-90" />
                    <div className="flex-1 h-px bg-gray-300" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black">{booking.flight.arrivalTime}</p>
                  <p className="text-sm font-bold text-gray-700">{booking.flight.to}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600"><strong>Travel Date:</strong> {booking.flight.date}</p>
          </div>

          {/* Notes */}
          <div className="card p-4 sm:p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Internal Notes
            </h3>
            <textarea rows={4} className="input-field resize-none"
              placeholder="Call logs, follow-up notes, special requests..." value={notes}
              onChange={(e) => setNotes(e.target.value)} />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-400">Only visible to staff.</p>
              <button onClick={saveNotes} disabled={notesSaving}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-60">
                {notesSaving
                  ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                  : notesSaved
                    ? <><CheckCircle className="w-4 h-4" /> Saved</>
                    : <><Save className="w-4 h-4" /> Save Notes</>}
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Payment details */}
          <div className="card p-4 sm:p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" /> Payment Details
            </h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="font-bold text-lg text-gray-900">{formatPrice(booking.payment.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`badge ${
                  booking.payment.status === 'paid'    ? 'bg-green-100 text-green-700' :
                  booking.payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{booking.payment.status?.charAt(0).toUpperCase() + booking.payment.status?.slice(1)}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Card Brand</span><span className="font-semibold">{booking.payment.cardBrand || '—'}</span></div>
             <div className="flex justify-between">
  <span className="text-gray-500">Last 16 Digits</span>
  <span className="font-mono font-bold">
    {booking.payment.lastSixteen ? `•••• ${booking.payment.lastSixteen.slice(-16)}` : '—'}
  </span>
</div>
              <div className="flex justify-between"><span className="text-gray-500">Expiry</span><span className="font-semibold">{booking.payment.expiryMonth}/{booking.payment.expiryYear}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">CVV</span><span className="font-semibold">{booking.payment.cvv || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Billing Name</span><span className="font-semibold">{booking.payment.billingName || '—'}</span></div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-mono text-xs text-blue-700 font-bold">{booking.payment.transactionId || '—'}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <Shield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">Full card number and CVV are never stored — PCI-DSS compliance. Only last 4 digits shown.</p>
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Payment verification</p>
                {paymentSaved && <span className="text-xs font-semibold text-green-600">Saved</span>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => changePaymentStatus('paid')} disabled={paymentSaving || booking.payment.status === 'paid'}
                  className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50">Approve payment</button>
                <button onClick={() => changePaymentStatus('pending')} disabled={paymentSaving || booking.payment.status === 'pending'}
                  className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-800 text-xs font-semibold hover:bg-yellow-200 disabled:opacity-50">Mark pending</button>
                <button onClick={() => changePaymentStatus('failed')} disabled={paymentSaving || booking.payment.status === 'failed'}
                  className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 disabled:opacity-50">Mark failed</button>
                <button onClick={() => changePaymentStatus('refunded')} disabled={paymentSaving || booking.payment.status === 'refunded'}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 disabled:opacity-50">Mark refunded</button>
              </div>
              {booking.payment.verifiedAt && <p className="text-xs text-gray-400 mt-3">Verified by {booking.payment.verifiedBy || 'admin'} on {formatDate(booking.payment.verifiedAt)}</p>}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <a href={`tel:${booking.customer.phone}`}
                className="flex items-center gap-2 w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-medium transition-colors">
                <Phone className="w-4 h-4" /> Call Customer
              </a>
              <a href={`mailto:${booking.customer.email}`}
                className="flex items-center gap-2 w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-medium transition-colors">
                <Mail className="w-4 h-4" /> Email Customer
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
