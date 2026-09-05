import apiClient from './api.client';

/**
 * POST /api/flights/search
 * Returns live flight offers from the backend SerpAPI integration.
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
  return res.data; // array of flight objects
};

/**
 * GET /api/flights/airports?q=del
 * Airport autocomplete search.
 */
export const searchAirports = async (query = '') => {
  const res = await apiClient.get(`/flights/airports${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  return res.data;
};
