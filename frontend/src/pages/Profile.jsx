import { useNavigate } from 'react-router-dom'

import useUserStore from '../store/userStore'
import Navigation from '../components/reusable/navigation'

import AddBook from '../components/pages/profile/add-book'
import Footer from '../components/reusable/footer'
import { useEffect } from 'react'
import { Button } from '../components/ui/button'

export default function Profile() {
  const navigate = useNavigate()

  const { user, isFetched, clearUser } = useUserStore()

  async function handleLogout() {
    localStorage.removeItem('token')
    clearUser()
    navigate('/login')
  }

  useEffect(() => {
    if (isFetched && !user) {
      navigate('/login')
    }
  }, [isFetched])

  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="flex-grow mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button
            className="bg-red-400 hover:bg-red-500"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <p>Email: {user?.email}</p>
          <p>Name: {user?.name}</p>
          {user?.role === 'admin' && (
            <div>
              <p>Role: Admin</p>
              <AddBook />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
