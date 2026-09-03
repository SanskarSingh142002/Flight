import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import { BookingProvider } from './context/BookingContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { CustomerAuthProvider } from './context/CustomerAuthContext'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import CustomerProtectedRoute from './components/CustomerProtectedRoute'

export default function App() {
  return (
    <CustomerAuthProvider>
      <AdminAuthProvider>
        <BookingProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Customer Signup */}
              <Route path="/signup" element={<CustomerSignupPage />} />

              {/* Customer Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/flights" element={<CustomerProtectedRoute><FlightResultsPage /></CustomerProtectedRoute>} />
              <Route path="/passengers" element={<CustomerProtectedRoute><PassengerDetailsPage /></CustomerProtectedRoute>} />
              <Route path="/checkout" element={<CustomerProtectedRoute><CheckoutPage /></CustomerProtectedRoute>} />
              <Route path="/confirmation" element={<CustomerProtectedRoute><ConfirmationPage /></CustomerProtectedRoute>} />

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
