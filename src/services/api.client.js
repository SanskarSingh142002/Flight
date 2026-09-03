/**
 * Central Axios-like fetch wrapper.
 * All backend calls go through here — baseURL, auth header, error normalisation.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => {
  try {
    return localStorage.getItem('fc_token') || null;
  } catch {
    return null;
  }
};

const request = async (method, path, body = null, requiresAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };

  if (requiresAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(data.message || `Request failed (${response.status})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
};

const apiClient = {
  get:    (path, auth = false)         => request('GET',    path, null, auth),
  post:   (path, body, auth = false)   => request('POST',   path, body, auth),
  patch:  (path, body, auth = false)   => request('PATCH',  path, body, auth),
  put:    (path, body, auth = false)   => request('PUT',    path, body, auth),
  delete: (path, auth = false)         => request('DELETE', path, null, auth),
};

export default apiClient;
