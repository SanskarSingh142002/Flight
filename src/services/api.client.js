/**
 * Central Axios-like fetch wrapper.
 * All backend calls go through here — baseURL, auth header, error normalisation.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'https://marwing.sg-host.com/api';

const getToken = (path = '') => {
  try {
    if (path.startsWith('/admin')) {
      return localStorage.getItem('fc_token') || null;
    }
    return localStorage.getItem('fc_token') || localStorage.getItem('fc_customer_token') || null;
  } catch {
    return null;
  }
};

const request = async (method, path, body = null, requiresAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (requiresAuth) {
    const token = getToken(path);
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    cache: 'no-store',
  };
  if (body) options.body = JSON.stringify(body);

  // Bust browser, proxy, and NGINX caches for all GET requests
  let url = `${BASE_URL}${path}`;
  if (method === 'GET') {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}_t=${Date.now()}`;
  }

  const response = await fetch(url, options);
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
