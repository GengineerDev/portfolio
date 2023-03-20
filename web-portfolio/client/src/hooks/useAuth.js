import { useState, useEffect } from 'react'
import { checkAuth } from '../api/auth'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authenticated = await checkAuth()
      setIsAuthenticated(authenticated)
    }
    fetchAuthStatus()
  }, [])

  return isAuthenticated
}

export default useAuth