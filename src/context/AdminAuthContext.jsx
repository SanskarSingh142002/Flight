import { createContext, useContext, useState } from 'react'
import * as authService from '../services/auth.service'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_admin')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  const login = async (username, password) => {
    setLoading(true)
    try {
      const res = await authService.login(username, password)
      setAdminUser(res.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await authService.logout()
    setAdminUser(null)
  }

  return (
    <AdminAuthContext.Provider value={{ adminUser, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
