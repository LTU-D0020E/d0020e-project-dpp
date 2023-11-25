// src/SignUpForm.js
import React, { useState } from 'react'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Add your sign-up logic here
    console.log('Form submitted:', formData)
  }

  return (
    <div className='signup-form-container'>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type='text'
            name='firstName'
            placeholder='Enter Your First Name'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            name='lastName'
            placeholder='Enter Your Last Name'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Birthday:
          <input
            type='date'
            name='Birthday'
            placeholder='Enter Your Birth Day'
            value={formData.Birthday}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            placeholder='Enter Your Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            placeholder='Enter Your Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
