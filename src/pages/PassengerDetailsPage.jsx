import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, Mail, Calendar, CreditCard, ArrowLeft, Plane, Info } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StepIndicator from '../components/StepIndicator'
import { useBooking } from '../context/BookingContext'
import { AIRPORTS } from '../data/mockData'

function PassengerForm({ index, data, onChange, isLead }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {index + 1}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">
            {isLead ? 'Lead Passenger' : `Passenger ${index + 1}`}
          </h3>
          {isLead && <p className="text-xs text-gray-500">Primary contact for this booking</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">First Name *</label>
          <input
            type="text"
            className="input-field"
            placeholder="As on passport/ID"
            value={data.firstName}
            onChange={e => onChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Last Name *</label>
          <input
            type="text"
            className="input-field"
            placeholder="As on passport/ID"
            value={data.lastName}
            onChange={e => onChange('lastName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date of Birth *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="input-field pl-10"
              value={data.dob}
              onChange={e => onChange('dob', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nationality *</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Indian"
            value={data.nationality}
            onChange={e => onChange('nationality', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Passport / ID Number</label>
          <input
            type="text"
            className="input-field"
            placeholder="Optional for domestic"
            value={data.passport}
            onChange={e => onChange('passport', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Gender</label>
          <select
            className="input-field"
            value={data.gender}
            onChange={e => onChange('gender', e.target.value)}
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default function PassengerDetailsPage() {
  const navigate = useNavigate()
  const { searchParams, selectedFlight, setPassengerDetails } = useBooking()

  const count = searchParams?.passengers || 1
  const [passengers, setPassengers] = useState(
    Array.from({ length: count }, () => ({
      firstName: '', lastName: '', dob: '', nationality: 'Indian',
      passport: '', gender: '',
    }))
  )
  const [contact, setContact] = useState({ email: '', phone: '' })
  const [errors, setErrors] = useState({})

  const updatePassenger = (index, field, value) => {
    setPassengers(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p))
  }

  const validate = () => {
    const errs = {}
    passengers.forEach((p, i) => {
      if (!p.firstName) errs[`p${i}_firstName`] = true
      if (!p.lastName) errs[`p${i}_lastName`] = true
      if (!p.dob) errs[`p${i}_dob`] = true
    })
    if (!contact.email) errs.email = true
    if (!contact.phone) errs.phone = true
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.emailFormat = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleContinue = () => {
    if (!validate()) return
    setPassengerDetails({ passengers, contact })
    navigate('/checkout')
  }

  if (!selectedFlight) {
    navigate('/'); return null
  }

  const fromCity = AIRPORTS.find(a => a.code === selectedFlight.from)?.city || selectedFlight.from
  const toCity = AIRPORTS.find(a => a.code === selectedFlight.to)?.city || selectedFlight.to

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => navigate('/flights')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Flights
            </button>
          </div>
          <StepIndicator currentStep={3} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main form */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Passenger Details</h2>
              <p className="text-sm text-gray-500">Enter details as they appear on passport or government ID.</p>
            </div>

            {passengers.map((p, i) => (
              <PassengerForm
                key={i}
                index={i}
                data={p}
                onChange={(f, v) => updatePassenger(i, f, v)}
                isLead={i === 0}
              />
            ))}

            {/* Contact Details */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      className={`input-field pl-10 ${errors.email || errors.emailFormat ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      placeholder="your@email.com"
                      value={contact.email}
                      onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                  {errors.emailFormat && <p className="text-xs text-red-500 mt-1">Please enter a valid email</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      className={`input-field pl-10 ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      placeholder="+91 98765 43210"
                      value={contact.phone}
                      onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2 bg-blue-50 rounded-xl p-3">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">Booking confirmation and updates will be sent to this email and phone number.</p>
              </div>
            </div>

            {Object.keys(errors).filter(k => !k.startsWith('p')).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
                Please fill all required fields correctly.
              </div>
            )}

            <button onClick={handleContinue} className="w-full btn-primary text-base py-4 rounded-2xl">
              Continue to Payment →
            </button>
          </div>

          {/* Flight summary sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="card p-5 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Flight Summary</h3>

              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">{selectedFlight.airline}</span>
                  <span className="text-xs text-gray-500">{selectedFlight.flightNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-center">
                    <p className="text-xl font-black text-gray-900">{selectedFlight.departureTime}</p>
                    <p className="text-xs text-gray-500 font-medium">{fromCity}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <p className="text-xs text-gray-400">{selectedFlight.duration}</p>
                    <div className="w-full flex items-center">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <Plane className="w-3 h-3 text-blue-500 mx-1 rotate-90" />
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    <p className="text-xs text-green-600">{selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} stop`}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-black text-gray-900">{selectedFlight.arrivalTime}</p>
                    <p className="text-xs text-gray-500 font-medium">{toCity}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-medium">{count} Adult{count > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fare per person</span>
                  <span className="font-medium">{formatPrice(selectedFlight.pricePerPerson)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span className="font-medium text-green-600">Included</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-black text-lg text-blue-700">{formatPrice(selectedFlight.price)}</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-3 flex items-start gap-2">
                <span className="text-green-500">🔒</span>
                <p className="text-xs text-green-700">Price is locked until payment is completed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
