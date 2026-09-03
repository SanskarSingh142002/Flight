import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, ChevronDown, ChevronUp, Plane, Eye, ArrowUpDown, RefreshCw, AlertCircle } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { getBookings } from '../../services/admin.service'

const STATUS_CONFIG = {
  new:        { label: 'New',        color: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500'   },
  contacted:  { label: 'Contacted',  color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  completed:  { label: 'Completed',  color: 'bg-green-100 text-green-700',   dot: 'bg-green-500'  },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',      dot: 'bg-red-500'    },
}

const PAYMENT_CONFIG = {
  paid:    { label: 'Paid',    color: 'bg-green-100 text-green-700'  },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  failed:  { label: 'Failed',  color: 'bg-red-100 text-red-700'      },
}

export default function AdminBookings() {
  const [urlParams]   = useSearchParams()
  const [bookings, setBookings] = useState([])
  const [total, setTotal]       = useState(0)
  const [pages, setPages]       = useState(1)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  const [search,        setSearch]        = useState('')
  const [statusFilter,  setStatusFilter]  = useState(urlParams.get('status') || 'all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [sortField,     setSortField]     = useState('createdAt')
  const [sortDir,       setSortDir]       = useState('desc')
  const [page,          setPage]          = useState(1)
  const perPage = 10

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    getBookings({
      page, limit: perPage,
      status: statusFilter  !== 'all' ? statusFilter  : undefined,
      paymentStatus: paymentFilter !== 'all' ? paymentFilter : undefined,
      search: search || undefined,
      sortField, sortDir,
    })
      .then((res) => { setBookings(res.data); setTotal(res.total); setPages(res.pages) })
      .catch((e)  => setError(e.message))
      .finally(() => setLoading(false))
  }, [page, statusFilter, paymentFilter, search, sortField, sortDir])

  useEffect(() => { load() }, [load])

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const SortIcon = ({ field }) => (
    <button onClick={() => toggleSort(field)} className="ml-1 text-gray-400 hover:text-gray-600">
      {sortField === field
        ? sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 inline" /> : <ChevronDown className="w-3.5 h-3.5 inline" />
        : <ArrowUpDown className="w-3.5 h-3.5 inline" />}
    </button>
  )

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)
  const formatDate  = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <AdminLayout title="All Bookings">
      {/* Filters */}
      <div className="card p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search ref, name, email, route..."
            className="input-field pl-9 py-2.5 text-sm" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700">
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select value={paymentFilter} onChange={(e) => { setPaymentFilter(e.target.value); setPage(1) }}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700">
          <option value="all">All Payments</option>
          {Object.entries(PAYMENT_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <button onClick={load} className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" title="Refresh">
          <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <div className="text-sm text-gray-500">{total} result{total !== 1 ? 's' : ''}</div>
      </div>

      {error && (
        <div className="card p-4 mb-4 flex items-center gap-2 text-red-600 border-red-200">
          <AlertCircle className="w-4 h-4" /> {error}
          <button onClick={load} className="ml-2 text-blue-600 hover:underline text-sm">Retry</button>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking Ref</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer <SortIcon field="customer.name" />
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route & Flight</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount <SortIcon field="payment.amount" />
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date <SortIcon field="createdAt" />
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 8 }).map((__, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 rounded shimmer animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400">No bookings found.</td></tr>
              ) : bookings.map((booking) => {
                const s = STATUS_CONFIG[booking.status]
                const p = PAYMENT_CONFIG[booking.payment?.status]
                return (
                  <tr key={booking._id || booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-bold text-blue-600">{booking.bookingRef}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">{booking.customer.name}</p>
                      <p className="text-xs text-gray-400">{booking.customer.email}</p>
                      <p className="text-xs text-gray-400">{booking.customer.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-700">{booking.flight.from}</span>
                        <Plane className="w-3 h-3 text-gray-400 rotate-90" />
                        <span className="font-bold text-gray-700">{booking.flight.to}</span>
                      </div>
                      <p className="text-xs text-gray-500">{booking.flight.airline} · {booking.flight.flightNumber}</p>
                      <p className="text-xs text-gray-400">{booking.flight.date}</p>
                    </td>
                    <td className="px-5 py-4 font-bold text-gray-800">{formatPrice(booking.payment?.amount)}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${p?.color}`}>{p?.label}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{booking.payment?.cardBrand} ••{booking.payment?.lastSixteen|| booking.payment?.lastSixteen?.slice(-16) || '----'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`badge ${s?.color} flex items-center gap-1 w-fit`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s?.dot}`} />{s?.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500">{formatDate(booking.createdAt)}</td>
                    <td className="px-5 py-4">
                      <Link to={`/admin/bookings/${booking._id || booking.id}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs">
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
            </p>
            <div className="flex gap-1">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">
                ← Prev
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button key={i + 1} onClick={() => setPage(i + 1)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${page === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>
                  {i + 1}
                </button>
              ))}
              <button disabled={page === pages} onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
