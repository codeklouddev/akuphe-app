'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Simple hardcoded authentication
    if (username === 'akuphe_admin' && password === 'DevOps#2024$Secure!') {
      localStorage.setItem('admin_authenticated', 'true')
      router.push('/admin')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-primary flex items-center justify-center px-4">
      <div className="bg-secondary rounded-[20px] border border-border p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-neutral mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-neutral mb-2 text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-neutral focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-neutral mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-neutral focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-primary py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  )
}

export default LoginPage