import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, CheckCircle, Plane, IndianRupee, ArrowRight, BarChart3, AlertCircle, User, Phone, Mail, CreditCard } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { getDashboard } from '../../services/admin.service'

const STATUS_CONFIG = {
  new:        { label: 'New',        color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500'   },
  contacted:  { label: 'Contacted',  color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  completed:  { label: 'Completed',  color: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',     dot: 'bg-red-500'    },
}

const PAYMENT_CONFIG = {
  paid:    { label: 'Paid',    color: 'text-green-600 bg-green-50'  },
  pending: { label: 'Pending', color: 'text-yellow-600 bg-yellow-50' },
  failed:  { label: 'Failed',  color: 'text-red-600 bg-red-50'      },
}

export default function AdminDashboard() {
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')

  useEffect(() => {
    getDashboard()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)
  const formatDate  = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  if (loading) return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {[1,2,3,4].map(i => <div key={i} className="card p-5 h-28 shimmer animate-pulse" />)}
      </div>
    </AdminLayout>
  )

  if (error) return (
    <AdminLayout title="Dashboard">
      <div className="card p-6 flex items-center gap-3 text-red-600 border-red-200">
        <AlertCircle className="w-5 h-5" />
        <p>Failed to load dashboard: {error}</p>
      </div>
    </AdminLayout>
  )

  const statCards = [
    { label: 'Total Bookings',    value: stats.total,               icon: Plane,         color: 'bg-blue-50',   iconColor: 'text-blue-600',   sub: 'All time' },
    { label: 'Revenue Collected', value: formatPrice(stats.revenue), icon: IndianRupee,   color: 'bg-green-50',  iconColor: 'text-green-600',  sub: `${stats.byPayment?.paid || 0} paid bookings` },
    { label: 'Pending Action',    value: (stats.byStatus?.new || 0) + (stats.byStatus?.contacted || 0), icon: Clock, color: 'bg-yellow-50', iconColor: 'text-yellow-600', sub: 'Needs follow-up' },
    { label: 'Completed',         value: stats.byStatus?.completed || 0, icon: CheckCircle, color: 'bg-purple-50', iconColor: 'text-purple-600', sub: `${stats.total ? Math.round(((stats.byStatus?.completed||0)/stats.total)*100) : 0}% success rate` },
  ]

  return (
    <AdminLayout title="Dashboard">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900 mb-1">{card.value}</p>
            <p className={`text-xs font-medium ${card.iconColor}`}>{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Recent Bookings</h3>
            <Link to="/admin/bookings" className="flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Ref', 'Customer', 'Route', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(stats.recent || []).map((booking) => {
                  const s = STATUS_CONFIG[booking.status]
                  return (
                    <tr key={booking._id || booking.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <Link to={`/admin/bookings/${booking._id || booking.id}`} className="font-mono text-xs text-blue-600 hover:underline font-semibold">
                          {booking.bookingRef}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-gray-800">{booking.customer.name}</p>
                        <p className="text-xs text-gray-400">{formatDate(booking.createdAt)}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-gray-700">{booking.flight.from}</span>
                        <span className="text-gray-400 mx-1">→</span>
                        <span className="font-semibold text-gray-700">{booking.flight.to}</span>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-gray-800">{formatPrice(booking.payment.amount)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`badge ${s?.color} flex items-center gap-1 w-fit`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s?.dot}`} />{s?.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" /> By Status
            </h3>
            <div className="space-y-3">
              {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                const count = stats.byStatus?.[key] || 0
                const pct   = stats.total ? Math.round((count / stats.total) * 100) : 0
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{config.label}</span>
                      <span className="font-bold text-gray-900">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${config.dot}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                )
              })}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-gray-800 mb-4">Payment Summary</h3>
            <div className="space-y-3">
              {Object.entries(PAYMENT_CONFIG).map(([key, config]) => {
                const count   = stats.byPayment?.[key] || 0
                const revenue = stats.revenueByPayment?.[key] || 0
                return (
                  <div key={key} className={`flex items-center justify-between p-3 rounded-xl ${config.color}`}>
                    <div>
                      <p className="font-semibold text-sm">{config.label}</p>
                      <p className="text-xs opacity-70">{count} bookings</p>
                    </div>
                    <p className="font-bold text-sm">{formatPrice(revenue)}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {(stats.byStatus?.new || 0) > 0 && (
            <div className="card p-5 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 text-sm">Action Required</p>
                  <p className="text-xs text-amber-700 mt-1">
                    {stats.byStatus.new} new booking{stats.byStatus.new !== 1 ? 's' : ''} awaiting first contact.
                  </p>
                  <Link to="/admin/bookings?status=new" className="text-xs text-amber-700 underline mt-2 inline-block font-medium">
                    View pending →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 card">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-800">Customer Verification</h3>
            <p className="text-xs text-gray-500 mt-1">Complete booking details from MongoDB</p>
          </div>
          <span className="text-sm font-semibold text-gray-500">{stats.bookings?.length || 0} records</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 p-3 sm:p-5">
          {(stats.bookings || []).map((booking) => {
            const s = STATUS_CONFIG[booking.status]
            return (
              <div key={booking._id || booking.id} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="font-mono text-xs font-bold text-blue-600">{booking.bookingRef}</p>
                    <h4 className="font-bold text-gray-900 mt-1 flex items-center gap-2"><User className="w-4 h-4 text-blue-600" />{booking.customer.name}</h4>
                  </div>
                  <span className={`badge ${s?.color}`}>{s?.label || booking.status}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
                  <a href={`tel:${booking.customer.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600"><Phone className="w-3.5 h-3.5" />{booking.customer.phone}</a>
                  <a href={`mailto:${booking.customer.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 truncate"><Mail className="w-3.5 h-3.5" />{booking.customer.email}</a>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2">
                  <div className="flex items-center justify-between"><span className="font-semibold text-gray-700">{booking.flight.from} <span className="text-gray-400">to</span> {booking.flight.to}</span><span className="text-gray-500">{booking.flight.date}</span></div>
                  <p className="text-gray-500">{booking.flight.airline} {booking.flight.flightNumber} · {booking.flight.cabinClass || 'Economy'}</p>
                  <p className="text-gray-500">Passengers: <span className="font-medium text-gray-700">{booking.passengers?.map((p) => `${p.firstName} ${p.lastName}`).join(', ')}</span></p>
                  <div className="border-t border-gray-200 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Card Details</p>
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-x-3 gap-y-1 text-xs">
                      <span className="flex items-center gap-1 text-gray-500"><CreditCard className="w-3.5 h-3.5" /> {booking.payment?.cardBrand || 'Card'} •••• {booking.payment?.lastSixteen|| booking.payment?.lastSixteen?.slice(-16) || '----'}</span>
                      <span className="text-gray-500">Expiry: {booking.payment?.expiryMonth || '--'}/{booking.payment?.expiryYear || '--'}</span>
                      <span className="text-gray-500">Billing: {booking.payment?.billingName || 'Not provided'}</span>
                      <span className="text-gray-500">CVV: {booking.payment?.cvv || 'Not provided'}</span>
                      <span className="text-gray-500 truncate">Txn: {booking.payment?.transactionId || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2"><span className="text-xs font-semibold text-gray-500">Payment: {booking.payment?.status || 'pending'}</span><span className="font-bold text-gray-900">{formatPrice(booking.payment?.amount)}</span></div>
                  </div>
                </div>
                <Link to={`/admin/bookings/${booking._id || booking.id}`} className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline font-semibold">Open full verification <ArrowRight className="w-4 h-4" /></Link>
              </div>
            )
          })}
          {(!stats.bookings || stats.bookings.length === 0) && <p className="text-sm text-gray-500">No customer bookings found in MongoDB.</p>}
        </div>
      </div>
    </AdminLayout>
  )
}
