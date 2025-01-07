import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Books() {
  const [isLoading, setIsLoading] = useState(true)
  const [books, setBooks] = useState({ data: [], total: 0, page: 1, limit: 3 })

  async function fetchAllBooks() {
    try {
      const response = await fetch(
        `http://localhost:3002/api/books?page=${books.page}&limit=${books.limit}`
      )

      if (!response.ok) {
        throw new Error('An error occurred. Please try again later.')
      }

      const data = await response.json()
      setBooks(data)
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])

  return (
    <section className="my-20 text-gray-900">
      <div className="mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className=" text-3xl font-bold sm:text-4xl">
            Some Books for You
          </h2>

          <p className=" w-full mt-4 text-gray-600">
            Find a wide variety of books from all genres at our e-commerce
            store. From the latest bestsellers to literary classics, we have
            everything to cater to your reading needs. Enjoy easy browsing,
            customer reviews, and exclusive offers only available to our
            members.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : books.data.length ? (
            books.data.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Link to={`/books/${book._id}`}>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="mt-2 text-gray-600">{book.author}</p>
                    <p className="mt-2 text-gray-600">{book.price}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">No books found.</div>
          )}
        </div>
      </div>
    </section>
  )
}
