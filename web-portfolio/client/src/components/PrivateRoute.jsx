import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { checkAuth } from '../api/auth'
import '../styles/privateRoute.css'

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const delayAuthStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
      const authenticated = await checkAuth()
      setIsAuthenticated(authenticated)
      setLoading(false)
    }
    delayAuthStatus()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading...</p>
        <div className="spinner"></div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute