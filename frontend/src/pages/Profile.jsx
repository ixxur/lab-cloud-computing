import useUserStore from '../store/userStore'
import Navigation from '../components/reusable/navigation'

import AddBook from '../components/pages/profile/add-book'
import Footer from '../components/reusable/footer'

export default function Profile() {
  const { user } = useUserStore()

  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mt-10">My Profile</h1>

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
