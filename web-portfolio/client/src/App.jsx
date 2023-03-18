import Header from './components/Header'
import Greeting from './components/Greeting'
import Footer from './components/Footer'
import Tabpages from './components/Tabpages'

import Login from './pages/Login'
import Admin from './pages/Admin'

import './App.css'

import { requireAuth } from './middleware/authMiddleware'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<><Greeting /><Tabpages /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} requireAuth={requireAuth} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

