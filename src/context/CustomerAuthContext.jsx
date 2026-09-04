import { createContext, useContext, useState } from 'react'
import { customerLogin, customerSignup } from '../services/auth.service'

const CustomerAuthContext = createContext(null)

export function CustomerAuthProvider({ children }) {
  const [customerUser, setCustomerUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_customer')
      const user = stored ? JSON.parse(stored) : null
      if (user?.password) {
        localStorage.removeItem('fc_customer')
        return null
      }
      return user
    } catch {
      return null
    }
  })

  const signup = async ({ name, email, phone, password }) => {
    try {
      const res = await customerSignup({ name, email, phone, password })
      setCustomerUser(res.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Signup failed.' }
    }
  }

  const login = async (email, password) => {
    try {
      const res = await customerLogin(email, password)
      setCustomerUser(res.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Invalid email or password.' }
    }
  }

  const logout = () => {
    localStorage.removeItem('fc_customer')
    localStorage.removeItem('fc_customer_token')
    setCustomerUser(null)
  }

  return (
    <CustomerAuthContext.Provider value={{ customerUser, signup, login, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  return useContext(CustomerAuthContext)
}
