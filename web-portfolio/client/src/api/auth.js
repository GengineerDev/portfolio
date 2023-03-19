import axios from '../axios-config'

const authenticateUser = async (username, password) => {
  try {
    const response = await axios.post('/api/users', { username, password })
    const data = response.data
    return data.user
  } catch (err) {
    throw err.response.data.message
  }
}

const checkAuth = async () => {
  try {
    const response = await axios.get('/api/sessions')
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    return false
  }
}

export { authenticateUser, checkAuth }
