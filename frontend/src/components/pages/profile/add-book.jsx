import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useState } from 'react'

import { toast } from 'react-toastify'

export default function AddBook() {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [open, setOpen] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BOOKS_API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, author, year, genre }),
      })

      if (response.ok) {
        setOpen(false)
        setAuthor('')
        setTitle('')
        setYear('')
        setGenre('')

        toast.success('Book added successfully')
      } else {
        const { message } = await response.json()
        toast.error(message)
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-1">
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Book</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new book.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                className="col-span-3"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                id="year"
                type="number"
                className="col-span-3"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="genre" className="text-right">
                Genre
              </Label>
              <Input
                id="genre"
                className="col-span-3"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="text-right" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Add Book'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
