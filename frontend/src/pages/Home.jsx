import Banner from '../components/pages/home/banner'
import BookStoreSection from '../components/pages/home/book-store-section'
import Books from '../components/pages/home/books'
import Footer from '../components/reusable/footer'
import Navigation from '../components/reusable/navigation'

export default function Home() {
  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="flex-grow">
        <Banner />
        <Books />
        <BookStoreSection />
      </div>

      <Footer />
    </div>
  )
}
