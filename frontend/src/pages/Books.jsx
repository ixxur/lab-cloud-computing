import Navigation from '../components/reusable/navigation'
import Footer from '../components/reusable/footer'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/src/components/ui/pagination'

export default function Books() {
  const [books, setBooks] = useState({ data: [], total: 0, page: 1, limit: 10 })
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  async function fetchAllBooks(page = 1) {
    try {
      const response = await fetch(
        `http://localhost:3002/api/books?page=${page}&limit=${books.limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const page = parseInt(query.get('page')) || 1
    fetchAllBooks(page)
  }, [location.search])

  const handlePageChange = (newPage) => {
    setIsLoading(true)
    navigate(`?page=${newPage}`)
  }

  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mt-10">Books</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {books.data.map((book) => (
              <Link to={`/books/${book._id}`} key={book._id}>
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-lg font-bold">{book.title}</h2>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mb-5">
        <Pagination>
          <PaginationContent>
            {books.page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(books.page - 1)}
                />
              </PaginationItem>
            )}
            {[...Array(Math.ceil(books.total / books.limit)).keys()].map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                    isActive={books.page === page + 1}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            {books.page < Math.ceil(books.total / books.limit) && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(books.page + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      <Footer />
    </div>
  )
}
