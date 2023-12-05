import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/* export default function LoginPage() {
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
    <div className='login-container flex min-h-screen items-center justify-center'>
      <form
        className='login-form w-full max-w-lg rounded-lg bg-white p-8 shadow-md'
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
            className='login-label mb-1 block text-sm font-medium text-gray-700'
            htmlFor='password'
          >
            Password:
          </label>
          <input
            className='login-input w-full rounded-md border'
            id='password'
            type='password'
            placeholder='Enter your password'
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <div className='login-button-group mb-4 flex  items-center'>
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
} */

export default function AuthForm() {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false)
  const [formSignUp, setFormSignUp] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  })
  const [formSignIn, setFormSignIn] = useState({
    email: '',
    password: '',
  })

  const toggleForm = () => {
    setIsSignUpVisible(!isSignUpVisible)
  }

  const handleChangeIn = e => {
    const { name, value } = e.target
    setFormSignIn(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handleChangeUp = e => {
    const { name, value } = e.target
    setFormSignUp(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSignUp = async e => {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSignUp),
      })
      const data = await response.json()
      if (response.ok) {
        // Handle successful signup, e.g., redirect or show a success message
      } else {
        // Handle errors, e.g., display error message
      }
    } catch (error) {
      console.error('Signup failed:', error)
      // Handle submission error
    }
  }

  const handleSignIn = async e => {
    e.preventDefault()
  }

  return (
    <>
      <div className='flex h-screen flex-col items-center justify-center bg-gray-200'>
        <div className={`container ${isSignUpVisible ? '' : 'active'}`}>
          <div
            className={`form-container sign-up ${
              isSignUpVisible ? '' : 'active'
            }`}
          >
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={formSignUp.name}
                onChange={handleChangeUp}
              />
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={formSignUp.email}
                onChange={handleChangeUp}
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={formSignUp.password}
                onChange={handleChangeUp}
              />
              <input
                type='text'
                placeholder='Role'
                name='role'
                value={formSignUp.role}
                onChange={handleChangeUp}
              />
              <button type='submit'>Sign Up</button>
            </form>
          </div>
          <div
            className={`form-container sign-in ${
              !isSignUpVisible ? '' : 'active'
            }`}
          >
            <form onSubmit={handleSignIn}>
              <h1>Sign In</h1>
              <span>or use your email password</span>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={formSignIn.email}
                onChange={handleChangeIn}
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={formSignIn.password}
                onChange={handleChangeIn}
              />
              <a href='#'>Forget Your Password?</a>
              <button type='submit'>Sign In</button>
            </form>
          </div>
          <div className='toggle-container'>
            <div className='toggle'>
              <div className='toggle-panel toggle-left'>
                <h1 className='text-3xl font-bold'>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button onClick={toggleForm} className='' id='login'>
                  Sign In
                </button>
              </div>
              <div className='toggle-panel toggle-right'>
                <h1 className='text-3xl font-bold'>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button onClick={toggleForm} className='' id='register'>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
