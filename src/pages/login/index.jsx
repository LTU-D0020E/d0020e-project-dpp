import Credentials from 'next-auth/providers/credentials'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AuthForm() {
  const router = useRouter()
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

      if (response.ok) {
        // The user was created
        const data = await response.json()
        console.log('Signup successful, user created:', data)

        // Now we want to log the user in automatically
        // We call the signIn function from NextAuth
        const signInResponse = await signIn('credentials', {
          redirect: false,
          email: formSignUp.email,
          password: formSignUp.password,
        })

        if (signInResponse?.ok) {
          // Successfully started the sign-in process
          router.push('/')
        } else {
          // Handle the case where sign-in after signup didn't work
          console.error('Sign-in after signup failed')
        }
      } else {
        // Handle errors, e.g., display error message
        const errorData = await response.json() // This assumes the server responds with JSON-formatted error messages
        console.error('Signup was not successful:', errorData)
      }
    } catch (error) {
      console.error('Signup failed:', error)
      // Handle submission error
    }
  }

  const handleSignIn = async e => {
    e.preventDefault()
    try {
      const result = await signIn('credentials', {
        redirect: false, // Disable automatic redirection
        email: formSignIn.email,
        password: formSignIn.password,
      })

      if (result.ok) {
        router.push('/') // Use the router to navigate to the homepage
      } else {
        // Handle cases where sign-in was unsuccessful
        // For example, you might want to show an error message to the user
      }
    } catch (error) {
      console.error('Sign-in failed:', error)
      // Handle submission error, such as displaying an error message
    }
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
