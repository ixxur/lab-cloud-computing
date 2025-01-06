import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Navigation from '../components/reusable/navigation'
import Footer from '../components/reusable/footer'
import { Button } from '../components/ui/button'

export default function Book() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [book, setBook] = useState(null)

  async function fetchBookById() {
    try {
      const response = await fetch(`http://localhost:3002/api/books/${id}`)

      if (response.ok) {
        const data = await response.json()
        setBook(data)
      } else {
        if (response.status === 500) {
          navigate('/books')
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleBorrow() {
    try {
      const response = await fetch(
        `http://localhost:3003/api/borrows/${id}/borrow`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.ok) {
        fetchBookById()
        toast.success('Book borrowed successfully')
      } else {
        const { message } = await response.json()
        toast.error(message)
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later')
    }
  }

  useEffect(() => {
    fetchBookById()
  }, [])

  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="flex-grow mt-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div className="bg-gray-100 rounded-lg min-h-[16rem] shadow-md"></div>
              <div className="flow-root">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Title</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {book.title}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Author</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {book.author}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Genre</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {book.genre}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Year</dt>
                    <dd className="text-gray-700 sm:col-span-2">{book.year}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Available</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {book.available ? 'Yes' : 'No'}
                    </dd>
                  </div>

                  {book.available && (
                    <div>
                      <Button
                        className="w-full mb-8 sm:mb-0"
                        onClick={handleBorrow}
                      >
                        Borrow
                      </Button>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
