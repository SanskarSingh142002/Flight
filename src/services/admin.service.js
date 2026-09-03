import apiClient from './api.client';

// All admin calls require auth=true (JWT sent in Authorization header)

/** GET /api/admin/dashboard */
export const getDashboard = () =>
  apiClient.get('/admin/dashboard', true).then((r) => r.data);

/**
 * GET /api/admin/bookings
 * @param {object} params — { page, limit, status, paymentStatus, search, sortField, sortDir }
 */
export const getBookings = (params = {}) => {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
  ).toString();
  return apiClient.get(`/admin/bookings${qs ? `?${qs}` : ''}`, true);
};

/** GET /api/admin/bookings/:id */
export const getBookingById = (id) =>
  apiClient.get(`/admin/bookings/${id}`, true).then((r) => r.data);

/** PATCH /api/admin/bookings/:id/status */
export const updateBookingStatus = (id, status, note = '') =>
  apiClient.patch(`/admin/bookings/${id}/status`, { status, note }, true).then((r) => r.data);

/** PATCH /api/admin/bookings/:id/notes */
export const updateBookingNotes = (id, notes) =>
  apiClient.patch(`/admin/bookings/${id}/notes`, { notes }, true).then((r) => r.data);

/** PATCH /api/admin/bookings/:id/payment */
export const updatePaymentStatus = (id, status, note = '') =>
  apiClient.patch(`/admin/bookings/${id}/payment`, { status, note }, true).then((r) => r.data);
