import Navigation from '../components/reusable/navigation'
import Footer from '../components/reusable/footer'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function Book() {
  return (
    <div className="container mx-auto p-10 min-h-screen flex flex-col justify-between">
      <Navigation />

      <div className="text-center">
        <h1 className="text-3xl font-bold mt-10">Page Not Found</h1>
        <p className="mt-2">The page you are looking for does not exist</p>

        <Link to="/">
          <Button className="mt-4">Go to Homepage</Button>
        </Link>
      </div>

      <Footer />
    </div>
  )
}
