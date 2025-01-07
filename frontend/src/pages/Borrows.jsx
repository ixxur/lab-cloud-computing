import Navigation from '../components/reusable/navigation'
import Footer from '../components/reusable/footer'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Button } from '../components/ui/button'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/src/components/ui/pagination'

export default function Borrows() {
  const [borrows, setBorrows] = useState({
    data: [],
    total: 0,
    page: 1,
    limit: 4,
  })
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  async function returnBookHandler(borrowId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BORROW_API_BASE_URL}/${borrowId}/return`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('An error occurred. Please try again later.')
      }

      // manually update the borrows state
      const updatedBorrows = borrows.data.map((borrow) => {
        if (borrow._id === borrowId) {
          return { ...borrow, returnDate: new Date() }
        }
        return borrow
      })

      setBorrows({ ...borrows, data: updatedBorrows })

      toast.success('Book returned successfully.')
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    }
  }

  async function fetchAllBorrows(page = 1) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BORROW_API_BASE_URL}?page=${page}&limit=${borrows.limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('An error occurred. Please try again later.')
      }

      const data = await response.json()
      setBorrows(data)

      const copyOfborrows = data.data

      for (const borrow of copyOfborrows) {
        const bookResponse = await fetch(
          `${import.meta.env.VITE_BOOKS_API_BASE_URL}/${borrow.bookId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (!bookResponse.ok) {
          throw new Error('An error occurred. Please try again later.')
        }

        const book = await bookResponse.json()
        borrow.book = book
      }

      setBorrows({ ...data, data: copyOfborrows })
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`)
  }

  useEffect(() => {
    setIsLoading(true)
    const query = new URLSearchParams(location.search)
    const page = parseInt(query.get('page')) || 1
    fetchAllBorrows(page)
  }, [location.search])

  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mt-10">My Borrows</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-10">
            {borrows?.data?.map((borrow) => (
              <div
                key={borrow._id}
                className="border-b border-gray-200 py-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-bold">{borrow?.book?.title}</h2>
                  <p className="text-gray-500">
                    Borrowed on:{' '}
                    {moment(borrow?.borrowedDate).format('MMMM Do YYYY')}
                  </p>
                  <p className="text-gray-500">
                    Due on:{' '}
                    {borrow?.returnDate
                      ? moment(borrow?.returnDate).format('MMMM Do YYYY')
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  {!borrow.returnDate && (
                    <Button onClick={() => returnBookHandler(borrow._id)}>
                      Return
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-5">
        <Pagination>
          <PaginationContent>
            {borrows.page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(borrows.page - 1)}
                />
              </PaginationItem>
            )}
            {[...Array(Math.ceil(borrows.total / borrows.limit)).keys()].map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                    isActive={borrows.page === page + 1}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            {borrows.page < Math.ceil(borrows.total / borrows.limit) && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(borrows.page + 1)}
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
