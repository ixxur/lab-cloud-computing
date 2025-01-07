import { Link } from 'react-router-dom'
import { Button } from '../../ui/button'

export default function Banner() {
  return (
    <section className="mt-[10rem] mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-4xl">
        Dive Into the World of Books <br />
        <strong className="text-3xl font-extrabold sm:text-4xl text-blue-700 sm:block">
          Unleash New Adventures!
        </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Discover our vast selection of books that will captivate and enrich your
        mind.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/books">
          <Button>See All Books</Button>
        </Link>
      </div>
    </section>
  )
}
