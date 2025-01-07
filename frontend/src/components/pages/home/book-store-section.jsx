import { Link } from 'react-router-dom'
import useUserStore from '@/src/store/userStore'

export default function BookStoreSection() {
  const { user } = useUserStore()

  return (
    <section className="my-20 text-gray-900">
      <div className="mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className=" text-3xl font-bold sm:text-4xl">
            Explore the World of Books
          </h2>

          <p className=" w-full mt-4 text-gray-600">
            Discover a wide variety of books from all genres at our e-commerce
            store. From the latest bestsellers to literary classics, we have
            everything to cater to your reading needs. Enjoy easy browsing,
            customer reviews, and exclusive offers only available to our
            members.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="block rounded-xl border border-gray-300 p-8 shadow-xl ">
            <h3 className="mt-4 text-xl font-bold">Wide Selection</h3>
            <p className="mt-1 text-sm text-gray-700">
              Browse through thousands of titles across multiple genres. Whether
              you're into sci-fi, romance, or non-fiction, you'll find the
              perfect read.
            </p>
          </div>

          <div className="block rounded-xl border border-gray-300 p-8 shadow-xl ">
            <h3 className="mt-4 text-xl font-bold">Exclusive Discounts</h3>
            <p className="mt-1 text-sm text-gray-700">
              Sign up for our newsletter and get exclusive discounts on new
              releases and bestsellers. Plus, free shipping on your first order!
            </p>
          </div>

          <div className="block rounded-xl border border-gray-300 p-8 shadow-xl ">
            <h3 className="mt-4 text-xl font-bold">Member Reviews</h3>
            <p className="mt-1 text-sm text-gray-700">
              Read reviews from our community members to find what books are
              resonating with readers like you and discover your next great
              read.
            </p>
          </div>
        </div>

        {!user ? (
          <div className="mt-10 text-center md:text-right">
            <Link
              to="/signup"
              className="inline-block rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Create Account
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  )
}
