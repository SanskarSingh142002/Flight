import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Plane, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function AdminLogin() {
  const { adminUser, login } = useAdminAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (adminUser) return <Navigate to="/admin" replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) { setError('Please enter credentials'); return }
    setLoading(true)
    setTimeout(() => {
      const result = login(username, password)
      if (result.success) {
        navigate('/admin')
      } else {
        setError(result.error)
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Plane className="w-7 h-7 text-white -rotate-45" />
          </div>
          <div>
            <span className="text-3xl font-black text-white">Flight</span>
            <span className="text-3xl font-black text-blue-400">Connect</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-3">Admin Operations Center</h2>
        <p className="text-gray-400 text-center max-w-sm leading-relaxed">
          Manage booking requests, track customer journeys, and monitor payment status — all in one place.
        </p>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white -rotate-45" />
            </div>
            <span className="text-xl font-black text-white">FlightConnect</span>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-black text-gray-900 mb-1">Admin Sign In</h1>
              <p className="text-sm text-gray-500">Access the FlightConnect operations dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    className="input-field pl-10"
                    placeholder="admin"
                    value={username}
                    onChange={e => { setUsername(e.target.value); setError('') }}
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="input-field pl-10 pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError('') }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-blue-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Signing in...</>
                ) : (
                  <><Lock className="w-4 h-4" /> Sign In to Dashboard</>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
