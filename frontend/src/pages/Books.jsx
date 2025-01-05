import Navigation from '../components/reusable/navigation'
import Footer from '../components/reusable/footer'

export default function Books() {
  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mt-10">Books</h1>
      </div>

      <Footer />
    </div>
  )
}
