import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, Mail, Plane, UserRound } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCustomerAuth } from '../context/CustomerAuthContext'

export default function CustomerLoginPage() {
  const navigate = useNavigate()
  const { customerUser, login } = useCustomerAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (customerUser) return <Navigate to="/" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    const result = await login(email, password)
    if (result.success) navigate('/')
    else {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full max-w-md mx-auto px-4 sm:px-6 py-24 sm:py-28">
        <div className="card p-5 sm:p-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-700 mb-7">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/15">
              <Plane className="w-5 h-5 text-white -rotate-45" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Customer access</p>
              <h1 className="text-2xl font-black text-gray-900">Welcome back</h1>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">Sign in to continue your flight search and booking.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  className="input-field pl-10"
                  placeholder="Your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-bold text-white shadow-md transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserRound className="w-4 h-4" />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            New to FareOracle?{' '}
            <Link to="/signup" className="font-bold text-emerald-700 hover:underline">Create an account</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
