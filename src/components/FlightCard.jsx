import { Plane, Clock, Luggage, ArrowRight, Utensils, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function FlightCard({ flight, onSelect, selected }) {
  const [expanded, setExpanded] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
  }

  return (
    <div className={`card overflow-hidden transition-all duration-200 ${selected ? 'ring-2 ring-blue-500 shadow-blue-100' : 'hover:border-blue-200'}`}>
      {/* Main row */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Airline info */}
          <div className="flex items-center gap-3 sm:w-44 shrink-0">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
              {flight.airlineLogo}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{flight.airline}</p>
              <p className="text-xs text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>

          {/* Times */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="text-center">
              <p className="text-lg sm:text-xl font-bold text-gray-900">{flight.departureTime}</p>
              <p className="text-xs font-medium text-gray-500">{flight.from}</p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="text-xs text-gray-400">{flight.duration}</p>
              <div className="relative w-full flex items-center">
                <div className="flex-1 h-px bg-gray-300"></div>
                {flight.stops === 0 ? (
                  <Plane className="w-3.5 h-3.5 text-blue-500 mx-1 rotate-90" />
                ) : (
                  <div className="flex items-center gap-0.5 mx-1">
                    {Array.from({ length: flight.stops }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    ))}
                  </div>
                )}
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <p className={`text-xs font-medium ${flight.stops === 0 ? 'text-green-600' : 'text-orange-500'}`}>
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                {flight.stopCity ? ` · ${flight.stopCity}` : ''}
              </p>
            </div>

            <div className="text-center">
              <p className="text-lg sm:text-xl font-bold text-gray-900">{flight.arrivalTime}</p>
              <p className="text-xs font-medium text-gray-500">{flight.to}</p>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-1">
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatPrice(flight.pricePerPerson)}</p>
              <p className="text-xs text-gray-400">per person</p>
            </div>
            <button
              onClick={() => onSelect(flight)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap
                ${selected
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                }`}
            >
              {selected ? '✓ Selected' : 'Select'}
            </button>
          </div>
        </div>

        {/* Tags row */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {flight.seatsLeft <= 5 && (
            <span className="badge bg-red-50 text-red-600">
              🔥 Only {flight.seatsLeft} seats left
            </span>
          )}
          {flight.refundable && (
            <span className="badge bg-green-50 text-green-700 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Refundable
            </span>
          )}
          {flight.meal && (
            <span className="badge bg-blue-50 text-blue-700 flex items-center gap-1">
              <Utensils className="w-3 h-3" /> Meal included
            </span>
          )}
          <span className="badge bg-gray-100 text-gray-600 flex items-center gap-1">
            <Luggage className="w-3 h-3" /> {flight.baggage} check-in
          </span>
          <span className="badge bg-gray-100 text-gray-600">{flight.cabinClass}</span>
        </div>
      </div>

      {/* Expand/collapse flight details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1 py-2 border-t border-gray-100 text-xs text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors"
      >
        {expanded ? 'Hide details' : 'Flight details'}
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-sm">
            <div>
              <p className="text-xs text-gray-400 mb-1">Aircraft</p>
              <p className="font-medium text-gray-700">{flight.aircraft}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Class</p>
              <p className="font-medium text-gray-700">{flight.cabinClass}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Baggage</p>
              <p className="font-medium text-gray-700">{flight.baggage} check-in</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Refund</p>
              <p className={`font-medium ${flight.refundable ? 'text-green-600' : 'text-gray-500'}`}>
                {flight.refundable ? 'Refundable' : 'Non-refundable'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
