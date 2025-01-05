import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import LoginPage from './pages/Login'
import SignupPage from './pages/SignUp'
import Profile from './pages/Profile'

import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
