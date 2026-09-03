import { createContext, useContext, useState } from 'react'

const CustomerAuthContext = createContext(null)

export function CustomerAuthProvider({ children }) {
  const [customerUser, setCustomerUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_customer')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const signup = ({ name, email, phone, password }) => {
    const user = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem('fc_customer', JSON.stringify(user))
    setCustomerUser(user)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('fc_customer')
    setCustomerUser(null)
  }

  return (
    <CustomerAuthContext.Provider value={{ customerUser, signup, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  return useContext(CustomerAuthContext)
}
