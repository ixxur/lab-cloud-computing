import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NotFound from './pages/NotFound'
import SignupPage from './pages/SignUp'
import LoginPage from './pages/Login'
import Profile from './pages/Profile'
import Borrows from './pages/Borrows'
import Books from './pages/Books'
import Home from './pages/Home'
import Book from './pages/Book'

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
          <Route path="/books" element={<Books />} />
          <Route path="/borrows" element={<Borrows />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
