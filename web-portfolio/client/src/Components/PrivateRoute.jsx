import { useState, useEffect } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import axios from '../axios-config'

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/sessions')
        if (response.status === 200) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute