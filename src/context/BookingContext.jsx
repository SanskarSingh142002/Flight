import { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [searchParams, setSearchParams] = useState(null)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [passengerDetails, setPassengerDetails] = useState(null)
  const [bookingRef, setBookingRef] = useState(null)
  const [bookingId, setBookingId] = useState(null)

  const clearBooking = () => {
    setSearchParams(null)
    setSelectedFlight(null)
    setPassengerDetails(null)
    setBookingRef(null)
    setBookingId(null)
  }

  return (
    <BookingContext.Provider value={{
      searchParams, setSearchParams,
      selectedFlight, setSelectedFlight,
      passengerDetails, setPassengerDetails,
      bookingRef, setBookingRef,
      bookingId, setBookingId,
      clearBooking,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
