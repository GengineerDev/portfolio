import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { checkAuth } from '../api/auth'

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuth = async () => {
      const isAuthenticated = await checkAuth()
      setIsAuthenticated(isAuthenticated)
      setLoading(false)
    }

    fetchAuth()
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