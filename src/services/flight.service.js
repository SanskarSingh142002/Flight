import apiClient from './api.client';
import { convertToUSD } from '../utils/currency';

/**
 * POST /api/flights/search
 * Returns flight offers converted to USD.
 * API response shape: { success, count, data: [...flights], meta }
 */
export const searchFlights = async ({ from, to, departDate, passengers, cabinClass, tripType }) => {
  const res = await apiClient.post('/flights/search', {
    from,
    to,
    departDate,
    passengers,
    cabinClass,
    tripType,
  });

  const rawFlights = Array.isArray(res.data) ? res.data : [];
  const passengerCount = Number(passengers) || 1;

  // Ensure every flight price is properly converted from INR to USD
  return rawFlights.map((flight) => {
    const rawPrice = Number(flight.pricePerPerson ?? flight.price ?? 0);
    const usdPricePerPerson = convertToUSD(rawPrice, flight.currency);
    const usdTotalPrice = usdPricePerPerson * passengerCount;

    return {
      ...flight,
      pricePerPerson: usdPricePerPerson,
      price: usdTotalPrice,
      currency: 'USD',
    };
  });
};

/**
 * GET /api/flights/airports?q=del
 * Airport autocomplete search.
 */
export const searchAirports = async (query = '') => {
  const res = await apiClient.get(`/flights/airports${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  return Array.isArray(res.data) ? res.data : [];
};
