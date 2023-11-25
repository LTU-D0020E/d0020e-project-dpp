import React, { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    // Send login credentials to the server or perform necessary actions
    console.log('Submitting login form...')
    console.log(`Username: ${username}`)
    console.log(`Password: ${password}`)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log(data)

      if (data.success) {
        // Submission successful
        setIsSubmitted(true)
      } else {
        // Handle submission error
        console.error('Submission failed!')
      }
    } catch (error) {
      console.error('Failed to connect to the server:', error)
    }
  }

  return (
    <div className='login-container flex items-center justify-center min-h-screen'>
      <form
        className='login-form bg-white rounded-lg shadow-md w-full max-w-lg p-8'
        onSubmit={handleSubmit}
      >
        <div className='login-input-group '>
          <label className='login-label ' htmlFor='username'>
            Username:
          </label>
          <input
            className='login-input w-full '
            id='username'
            type='text'
            placeholder='Enter your username'
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>

        <div className='login-input-group mb-4'>
          <label
            className='login-label block text-sm font-medium text-gray-700 mb-1'
            htmlFor='password'
          >
            Password:
          </label>
          <input
            className='login-input w-full border rounded-md'
            id='password'
            type='password'
            placeholder='Enter your password'
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <div className='login-button-group flex items-center  mb-4'>
          <button className='login-button' type='submit'>
            Sign In
          </button>
        </div>
        {isSubmitted && (
          <p className='login-success-message'>Login successful!</p>
        )}
        <a className='login-create-account ' href='./Signup'>
          Create an account
        </a>
      </form>
    </div>
  )
}
