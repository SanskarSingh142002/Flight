import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import FlightResultsPage from './pages/FlightResultsPage'
import PassengerDetailsPage from './pages/PassengerDetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmationPage from './pages/ConfirmationPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminBookingDetail from './pages/admin/AdminBookingDetail'
import CustomerSignupPage from './pages/CustomerSignupPage'
import CustomerLoginPage from './pages/CustomerLoginPage'
import CustomerBookingsPage from './pages/CustomerBookingsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { BookingProvider } from './context/BookingContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { CustomerAuthProvider } from './context/CustomerAuthContext'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import CustomerProtectedRoute from './components/CustomerProtectedRoute'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <CustomerAuthProvider>
      <AdminAuthProvider>
        <BookingProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Customer Signup */}
              <Route path="/signup" element={<CustomerSignupPage />} />
              <Route path="/signin" element={<CustomerLoginPage />} />

              {/* Customer Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/flights" element={<CustomerProtectedRoute><FlightResultsPage /></CustomerProtectedRoute>} />
              <Route path="/passengers" element={<CustomerProtectedRoute><PassengerDetailsPage /></CustomerProtectedRoute>} />
              <Route path="/checkout" element={<CustomerProtectedRoute><CheckoutPage /></CustomerProtectedRoute>} />
              <Route path="/confirmation" element={<CustomerProtectedRoute><ConfirmationPage /></CustomerProtectedRoute>} />
              <Route path="/my-bookings" element={<CustomerProtectedRoute><CustomerBookingsPage /></CustomerProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/bookings" element={
                <AdminProtectedRoute>
                  <AdminBookings />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/bookings/:id" element={
                <AdminProtectedRoute>
                  <AdminBookingDetail />
                </AdminProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </AdminAuthProvider>
    </CustomerAuthProvider>
  )
}
