import apiClient from './api.client';

/**
 * POST /api/bookings
 * Submit the full booking request to the backend.
 * Raw card numbers / CVV must NEVER be sent here — payment processor handles tokenization.
 */
export const createBooking = async ({ customer, passengers, flight, payment }) => {
  const res = await apiClient.post('/bookings', {
    customer,
    passengers,
    flight: {
      flightId:      flight.id,
      airline:       flight.airline,
      airlineCode:   flight.airlineCode,
      flightNumber:  flight.flightNumber,
      from:          flight.from,
      to:            flight.to,
      date:          flight.date,
      departureTime: flight.departureTime,
      arrivalTime:   flight.arrivalTime,
      duration:      flight.duration,
      stops:         flight.stops,
      stopCity:      flight.stopCity || null,
      aircraft:      flight.aircraft,
      cabinClass:    flight.cabinClass,
      baggage:       flight.baggage,
    },
    payment: {
      amount:        payment.amount,
      currency:      'INR',
      status:        'paid',           // set by payment processor webhook in production
      cardBrand:     payment.cardBrand || '',
      lastSixteen:      payment.lastSixteen  || '',
      expiryMonth:   payment.expiryMonth || '',
      cvv :           payment.cvv || '',
      expiryYear:    payment.expiryYear  || '',
      billingName:   payment.billingName || '',
      transactionId: payment.transactionId || '',
      // fullCardNumber and cvv are NEVER included here
    },
  });
  // { bookingRef, status, _id }
  return res.data;
};

/**
 * GET /api/bookings/:ref
 * Public lookup — customer can check their booking status.
 */
export const getBookingByRef = async (ref) => {
  const res = await apiClient.get(`/bookings/${ref}`);
  return res.data;
};
