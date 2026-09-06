import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, LogOut, UserCircle } from 'lucide-react'
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

  const navLinks = [
    { label: 'Home',         href: '/' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'About',        href: '/about' },
    { label: 'Contact',      href: '/contact' },
  ]

  const handleNavClick = (e, href) => {
    setMenuOpen(false)
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '')
      if (location.pathname === '/') {
        e.preventDefault()
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip transition-all duration-300 ${
      transparent
        ? 'bg-transparent border-transparent'
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className={`text-xl sm:text-2xl font-black tracking-tight transition-colors ${transparent ? 'text-white' : 'text-gray-900'}`}>
            FareOracle
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(item => {
              const isHash = item.href.startsWith('/#')
              return isHash ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    transparent ? 'text-white/80' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    transparent ? 'text-white/80' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+18885844337"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                transparent ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}>
              <Phone className="w-3.5 h-3.5" />
              +1 888 584 4337
            </a>

            {customerUser ? (
              <>
                <Link to="/my-bookings"
                  className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                    transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}>
                  My Trips
                </Link>
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
              <div className="flex items-center gap-2">
                <Link to="/signin"
                  className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                    transparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}>
                  Sign In
                </Link>
                <Link to="/signup"
                  className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
                    transparent
                      ? 'border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10'
                      : 'border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                  Sign Up
                </Link>
              </div>
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
        <div className="md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-xl animate-fade-in">
          {navLinks.map(item => {
            const isHash = item.href.startsWith('/#')
            return isHash ? (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-2.5 px-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )
          })}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2 px-3">
            <Phone className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Toll Free # +1 888 584 4337</span>
          </div>

          {customerUser ? (
            <>
              <Link to="/my-bookings" onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 text-sm font-semibold text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors">
                My Trips
              </Link>
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
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/signin" onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 text-center text-sm font-semibold text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 text-center text-sm font-semibold text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
