import apiClient from './api.client';

/** POST /api/auth/login — returns { token, user } */
export const login = async (username, password) => {
  const res = await apiClient.post('/auth/login', { username, password });
  // Persist token so apiClient can pick it up on subsequent requests
  localStorage.setItem('fc_token', res.token);
  localStorage.setItem('fc_admin', JSON.stringify(res.user));
  return res;
};

/** POST /api/auth/logout */
export const logout = async () => {
  try {
    await apiClient.post('/auth/logout', {}, true);
  } catch (_) {
    // ignore — we always clear local storage
  } finally {
    localStorage.removeItem('fc_token');
    localStorage.removeItem('fc_admin');
  }
};

/** GET /api/auth/me — verify token still valid */
export const getMe = () => apiClient.get('/auth/me', true).then((r) => r.user);
