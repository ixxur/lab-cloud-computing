import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import useUserStore from '../../store/userStore'

import Logo from './logo'
import { useEffect } from 'react'

export default function Navigation() {
  const token = localStorage.getItem('token')
  const { user, setUser, clearUser, setIsFetched } = useUserStore()

  useEffect(() => {
    if (!user) {
      if (token) {
        try {
          const decoded = jwtDecode(token)

          if (decoded.exp < Date.now() / 1000) {
            toast.error('Token expired')
            clearUser()
            return
          }

          setUser(decoded)
        } catch (error) {
          toast.error('Invalid token')
          clearUser()
        } finally {
          setIsFetched(true)
        }
      } else {
        setIsFetched(true)
      }
    }
  }, [user])

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
