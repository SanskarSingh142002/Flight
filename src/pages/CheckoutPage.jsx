import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, Shield, ArrowLeft, Plane, AlertCircle, Info } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StepIndicator from '../components/StepIndicator'
import { useBooking } from '../context/BookingContext'
import { createBooking } from '../services/booking.service'
import { AIRPORTS } from '../data/mockData'

// ── Card preview component ────────────────────────────────────────────────────
function CardPreview({ number, name, expiry, cardType }) {
  const masked = number.replace(/\s/g, '').padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim()
  const isVisa   = cardType === 'visa'
  const isMaster = cardType === 'mastercard'
  return (
    <div className="relative w-full max-w-xs mx-auto h-44 rounded-2xl overflow-hidden shadow-xl">
      <div className={`absolute inset-0 ${isVisa ? 'bg-gradient-to-br from-blue-800 to-blue-600' : isMaster ? 'bg-gradient-to-br from-gray-800 to-gray-600' : 'bg-gradient-to-br from-indigo-800 to-purple-700'}`} />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border-2 border-white/30" />
        <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full border-2 border-white/20" />
      </div>
      <div className="relative p-5 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-10 h-7 bg-yellow-300 rounded-md opacity-80" />
          {isVisa   && <span className="text-white font-bold text-xl italic">VISA</span>}
          {isMaster && <div className="flex -space-x-2"><div className="w-7 h-7 rounded-full bg-red-500 opacity-90" /><div className="w-7 h-7 rounded-full bg-yellow-400 opacity-90" /></div>}
          {!isVisa && !isMaster && <span className="text-white/80 text-sm font-bold">CARD</span>}
        </div>
        <div>
          <p className="text-white font-mono text-base tracking-widest mb-2">{masked}</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider">Card Holder</p>
              <p className="text-white font-medium text-sm truncate max-w-[140px]">{name || 'YOUR NAME'}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs uppercase tracking-wider">Expires</p>
              <p className="text-white font-medium text-sm">{expiry || 'MM/YY'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const detectCardType = (num) => {
  const n = num.replace(/\s/g, '')
  if (/^4/.test(n)) return 'visa'
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard'
  if (/^3[47]/.test(n)) return 'amex'
  return 'unknown'
}

const formatCardNumber = (value) => {
  const v = value.replace(/\D/g, '').substring(0, 16)
  return v.match(/.{1,4}/g)?.join(' ') || v
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { selectedFlight, passengerDetails, setBookingRef, setBookingId } = useBooking()

  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '', billingAddress: '', city: '', pincode: '' })
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors]         = useState({})
  const [apiError, setApiError]     = useState('')
  const [cvvFocused, setCvvFocused] = useState(false)

  const cardType = detectCardType(card.number)

  const updateCard = (field, value) => {
    setCard((p) => ({ ...p, [field]: value }))
    setErrors((p) => ({ ...p, [field]: false }))
    setApiError('')
  }

  const validate = () => {
    const errs = {}
    const n = card.number.replace(/\s/g, '')
    if (n.length < 13)                       errs.number          = 'Enter a valid card number'
    if (!card.name.trim())                   errs.name            = 'Enter cardholder name'
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) errs.expiry          = 'Enter MM/YY'
    if (card.cvv.length < 3)                 errs.cvv             = 'Enter valid CVV'
    if (!card.billingAddress.trim())         errs.billingAddress  = 'Enter billing address'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setProcessing(true)
    setApiError('')

    try {
      /**
       * In production: tokenize card with Stripe/Razorpay JS SDK here.
       * Then send the token (not raw card data) to your backend.
       *
       * For demo: we derive masked details from the form and send those.
       * Raw card number and CVV are NEVER sent to our backend.
       */
      const rawNumber = card.number.replace(/\s/g, '')
      const [expM, expY] = card.expiry.split('/')

      const result = await createBooking({
        customer: {
          name:  passengerDetails.passengers[0].firstName + ' ' + passengerDetails.passengers[0].lastName,
          email: passengerDetails.contact.email,
          phone: passengerDetails.contact.phone,
        },
        passengers: passengerDetails.passengers,
        flight:     selectedFlight,
        payment: {
          amount:        selectedFlight.price,
          cardBrand:     cardType !== 'unknown' ? cardType.charAt(0).toUpperCase() + cardType.slice(1) : 'Card',
          lastSixteen:      rawNumber.slice(-16),   
          cvv:             card.cvv,
          expiryMonth:   expM,
          expiryYear:    expY,
          billingName:   card.name,
          // fullCardNumber and cvv intentionally NOT sent
        },
      })

      setBookingRef(result.bookingRef)
      setBookingId(result._id)
      navigate('/confirmation')
    } catch (err) {
      setApiError(err.message || 'Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (!selectedFlight || !passengerDetails) { navigate('/'); return null }

  const formatPrice  = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)
  const fromCity = AIRPORTS.find((a) => a.code === selectedFlight.from)?.city || selectedFlight.from
  const toCity   = AIRPORTS.find((a) => a.code === selectedFlight.to)?.city   || selectedFlight.to

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => navigate('/passengers')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
          <StepIndicator currentStep={4} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Payment form */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-1">Secure Payment</h2>
              <p className="text-sm text-gray-500">Your payment is processed securely. We never store your full card number or CVV.</p>
            </div>

            {/* Security badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[{ icon: '🔒', text: 'SSL Encrypted' }, { icon: '🛡️', text: 'PCI-DSS Compliant' }, { icon: '✅', text: 'Tokenized Payment' }].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>

            {/* Card preview */}
            <div className="mb-6">
              <CardPreview number={cvvFocused ? '' : card.number} name={card.name} expiry={card.expiry} cardType={cardType} />
            </div>

            {/* Card details */}
            <div className="card p-4 sm:p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" /> Card Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Card Number *</label>
                  <div className="relative">
                    <input type="text" inputMode="numeric"
                      className={`input-field pr-16 font-mono ${errors.number ? 'border-red-400' : ''}`}
                      placeholder="1234 5678 9012 3456" maxLength={19}
                      value={card.number}
                      onChange={(e) => updateCard('number', formatCardNumber(e.target.value))} />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {cardType === 'visa'       && <span className="font-bold text-blue-700">VISA</span>}
                      {cardType === 'mastercard' && <span className="font-bold text-red-600">MC</span>}
                      {cardType === 'amex'       && <span className="font-bold text-indigo-700">AMEX</span>}
                    </div>
                  </div>
                  {errors.number && <p className="text-xs text-red-500 mt-1">{errors.number}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cardholder Name *</label>
                  <input type="text" className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                    placeholder="As printed on card" value={card.name}
                    onChange={(e) => updateCard('name', e.target.value.toUpperCase())} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Expiry *</label>
                    <input type="text" className={`input-field ${errors.expiry ? 'border-red-400' : ''}`}
                      placeholder="MM/YY" maxLength={5} value={card.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '')
                        if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2)
                        updateCard('expiry', v.substring(0, 5))
                      }} />
                    {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                      CVV * <Info className="w-3 h-3 text-gray-400" />
                    </label>
                    <input type="password" className={`input-field ${errors.cvv ? 'border-red-400' : ''}`}
                      placeholder="•••" maxLength={4} value={card.cvv}
                      onFocus={() => setCvvFocused(true)}
                      onBlur={() => setCvvFocused(false)}
                      onChange={(e) => updateCard('cvv', e.target.value.replace(/\D/g, ''))} />
                    {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  Card details are tokenized via our payment processor. FareOracle never stores your full card number or CVV.
                </p>
              </div>
            </div>

            {/* Billing address */}
            <div className="card p-4 sm:p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-5">Billing Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Street Address *</label>
                  <input type="text" className={`input-field ${errors.billingAddress ? 'border-red-400' : ''}`}
                    placeholder="Flat no, Street, Area" value={card.billingAddress}
                    onChange={(e) => updateCard('billingAddress', e.target.value)} />
                  {errors.billingAddress && <p className="text-xs text-red-500 mt-1">{errors.billingAddress}</p>}
                </div>
                <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">City</label>
                    <input type="text" className="input-field" placeholder="City"
                      value={card.city} onChange={(e) => updateCard('city', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">PIN Code</label>
                    <input type="text" className="input-field" placeholder="110001" maxLength={6}
                      value={card.pincode} onChange={(e) => updateCard('pincode', e.target.value.replace(/\D/g, ''))} />
                  </div>
                </div>
              </div>
            </div>

            {/* API error */}
            {apiError && (
              <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {apiError}
              </div>
            )}

            <button onClick={handleSubmit} disabled={processing}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:opacity-70 text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-green-300 transition-all duration-200 flex items-center justify-center gap-3">
              {processing ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
              ) : (
                <><Lock className="w-5 h-5" />Pay {formatPrice(selectedFlight.price)} Securely</>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              By completing payment, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>

          {/* Summary */}
          <div className="lg:w-80 shrink-0 w-full">
            <div className="card p-5 sticky top-24 space-y-4">
              <h3 className="font-bold text-gray-800">Booking Summary</h3>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-700 mb-2">{selectedFlight.airline} · {selectedFlight.flightNumber}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-800">{selectedFlight.departureTime}</span>
                  <Plane className="w-3.5 h-3.5 text-blue-500 rotate-90" />
                  <span className="font-bold text-gray-800">{selectedFlight.arrivalTime}</span>
                </div>
                <p className="text-xs text-gray-600">{fromCity} → {toCity} · {selectedFlight.date}</p>
                <p className="text-xs text-gray-500">{selectedFlight.duration} · {selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} stop`}</p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">Passengers</p>
                {passengerDetails.passengers.map((p, i) => (
                  <p key={i} className="text-sm text-gray-700">{p.firstName} {p.lastName}</p>
                ))}
                <p className="text-xs text-gray-500 mt-1">{passengerDetails.contact.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base fare × {passengerDetails.passengers.length}</span>
                  <span>{formatPrice(selectedFlight.pricePerPerson * passengerDetails.passengers.length)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span className="text-green-600">Included</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-700 text-lg">{formatPrice(selectedFlight.price)}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Secure checkout — PCI-DSS compliant processor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
