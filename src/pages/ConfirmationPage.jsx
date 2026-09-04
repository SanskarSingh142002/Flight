import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Plane, Download, Share2, Phone, Mail, Clock, ArrowRight, Home } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StepIndicator from '../components/StepIndicator'
import { useBooking } from '../context/BookingContext'
import { AIRPORTS } from '../data/mockData'

export default function ConfirmationPage() {
  const navigate = useNavigate()
  const { selectedFlight, passengerDetails, bookingRef, clearBooking } = useBooking()

  useEffect(() => {
    if (!bookingRef) navigate('/')
  }, [bookingRef])

  if (!selectedFlight || !passengerDetails || !bookingRef) return null

  const fromCity = AIRPORTS.find(a => a.code === selectedFlight.from)?.city || selectedFlight.from
  const toCity = AIRPORTS.find(a => a.code === selectedFlight.to)?.city || selectedFlight.to
  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <StepIndicator currentStep={5} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Success Banner */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Booking Request Received!</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Your booking request has been submitted successfully. Our team will contact you shortly to confirm.
          </p>
        </div>

        {/* Booking Reference Card */}
        <div className="card p-4 sm:p-6 mb-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Booking Reference</p>
              <p className="text-3xl font-black text-blue-700 tracking-wider">{bookingRef}</p>
              <p className="text-xs text-gray-500 mt-1">Save this reference for your records</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" /> Save
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => navigator.clipboard?.writeText(bookingRef)}>
                <Share2 className="w-4 h-4" /> Copy
              </button>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="card p-4 sm:p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" /> What Happens Next
          </h3>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Confirmation Email', desc: `A booking confirmation has been sent to ${passengerDetails.contact.email}`, done: true },
              { step: '2', title: 'Team Review', desc: 'Our team reviews your request and verifies seat availability.', done: false },
              { step: '3', title: 'Personal Contact', desc: `We'll call you at ${passengerDetails.contact.phone} to confirm and complete the booking.`, done: false },
              { step: '4', title: 'Ticket Issued', desc: 'Your e-ticket will be emailed once the booking is fully confirmed.', done: false },
            ].map(item => (
              <div key={item.step} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${item.done ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {item.done ? '✓' : item.step}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flight Summary */}
        <div className="card p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Flight Details</h3>
          <div className="bg-blue-50 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500">{selectedFlight.airline}</p>
                <p className="text-sm font-bold text-gray-800">{selectedFlight.flightNumber}</p>
              </div>
              <div className={`badge ${selectedFlight.stops === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} stop`}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-gray-900">{selectedFlight.departureTime}</p>
                <p className="text-sm font-bold text-gray-700">{fromCity}</p>
                <p className="text-xs text-gray-500">{selectedFlight.from}</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <p className="text-xs text-gray-400 mb-1">{selectedFlight.duration}</p>
                <div className="w-full flex items-center">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <Plane className="w-4 h-4 text-blue-500 mx-2 rotate-90" />
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{selectedFlight.date}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-gray-900">{selectedFlight.arrivalTime}</p>
                <p className="text-sm font-bold text-gray-700">{toCity}</p>
                <p className="text-xs text-gray-500">{selectedFlight.to}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500">Passengers</p>
              <p className="font-medium">{passengerDetails.passengers.map(p => `${p.firstName} ${p.lastName}`).join(', ')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Paid</p>
              <p className="font-bold text-blue-700 text-lg">{formatPrice(selectedFlight.price)}</p>
            </div>
          </div>
        </div>

        {/* Contact support */}
        <div className="card p-4 sm:p-6 mb-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <h3 className="font-bold mb-3">Need help? Contact us</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+911800001234" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors">
              <Phone className="w-4 h-4 text-blue-300" />
              <span className="text-sm">1800-001-234</span>
            </a>
            <a href="mailto:support@flightconnect.in" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors">
              <Mail className="w-4 h-4 text-blue-300" />
              <span className="text-sm">support@flightconnect.in</span>
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            onClick={clearBooking}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Book Another Flight
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
