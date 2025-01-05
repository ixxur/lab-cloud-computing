import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import useUserStore from '../../store/userStore'

import Logo from './logo'

export default function Navigation() {
  const token = localStorage.getItem('token')
  const { user, setUser, clearUser } = useUserStore()

  if (token && !user) {
    try {
      const decodedUser = jwtDecode(token)
      setUser(decodedUser)
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
      clearUser()
    }
  }

  return (
    <nav className="flex justify-between items-center">
      <Logo />

      <ul className="text-gray-800 ">
        <li className="inline-block mx-4">
          <Link to="/books">Books</Link>
        </li>
        <li className="inline-block mx-4">
          <Link to="/borrows">My Borrows</Link>
        </li>
      </ul>

      {user ? (
        <div className="flex items-center">
          <Link to="/profile">My Profile</Link>
        </div>
      ) : (
        <ul>
          <li className="inline-block mx-4">
            <a href="/login">Login</a>
          </li>
          <li className="inline-block mx-4">
            <a href="/signup">Sign up</a>
          </li>
        </ul>
      )}
    </nav>
  )
}
