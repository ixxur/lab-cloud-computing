import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

import Footer from '../components/reusable/footer'
import Logo from '../components/reusable/logo'

import { toast } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const { token } = await response.json()

        localStorage.setItem('token', token)
        navigate('/')
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
    <div className="flex flex-col justify-between min-h-svh items-center gap-4 pt-10 pb-6">
      <Logo />

      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your credentials below to log in to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joe.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Log In'}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign Up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
