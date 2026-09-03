import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plane, Menu, X, Phone, LogOut, UserCircle } from 'lucide-react'
import { useCustomerAuth } from '../context/CustomerAuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const { customerUser, logout } = useCustomerAuth()

  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const transparent = isHome && !scrolled && !menuOpen

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      transparent
        ? 'bg-transparent border-transparent'
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-shadow">
              <Plane className="w-4 h-4 text-white -rotate-45" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className={`text-lg font-black tracking-tight transition-colors ${transparent ? 'text-white' : 'text-gray-900'}`}>
                Flight
              </span>
              <span className="text-lg font-black tracking-tight text-blue-500">Connect</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: 'Home',         href: '/' },
              { label: 'How It Works', href: '/#how-it-works' },
              { label: 'Contact',      href: '/#contact' },
            ].map(item => (
              <a key={item.label} href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  transparent ? 'text-white/80' : 'text-gray-600'
                }`}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+911800001234"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                transparent ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}>
              <Phone className="w-3.5 h-3.5" />
              1800-001-234
            </a>

            {customerUser ? (
              <>
                <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                  transparent
                    ? 'border-white/20 text-white/80 bg-white/5'
                    : 'border-gray-200 text-gray-700 bg-gray-50'
                }`}>
                  <UserCircle className="w-4 h-4" />
                  <span>{customerUser.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    transparent
                      ? 'border-white/20 text-white/80 hover:text-white hover:bg-white/10'
                      : 'border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signup"
                className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
                  transparent
                    ? 'border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10'
                    : 'border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                Customer Signup
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              transparent ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
            }`}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-xl animate-fade-in">
          {['Home', 'How It Works', 'Contact'].map(item => (
            <a key={item} href={item === 'Home' ? '/' : `/#${item.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
              {item}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2 px-3">
            <Phone className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">1800-001-234</span>
          </div>

          {customerUser ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700">
                <UserCircle className="w-4 h-4 text-blue-600" />
                {customerUser.name}
              </div>
              <button
                type="button"
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                  navigate('/')
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/signup" onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
              Customer Signup
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
