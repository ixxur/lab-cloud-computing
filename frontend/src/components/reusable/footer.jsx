import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <p className="text-sm text-gray-500">
        Built by Books Inc. The source code is available on{' '}
        <Link
          to="https://github.com/ixxur/lab-cloud-computing"
          target="_blank"
          className="text-primary underline"
        >
          GitHub
        </Link>
        .
      </p>
    </div>
  )
}
