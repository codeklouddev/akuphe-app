'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const AUTH_KEY = 'admin_authenticated'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem(AUTH_KEY)
    setIsAuthenticated(authStatus === 'true')
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string) => {
    // Simple hardcoded authentication
    // You can change these credentials
    if (username === 'akuphe_admin' && password === 'DevOps#2024$Secure!') {
      localStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
    router.push('/')
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  }
}