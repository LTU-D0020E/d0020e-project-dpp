import { PencilIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Settings({ user, userid }) {
  // State variables to manage edit mode for each form field
  const [editMode, setEditMode] = useState(false)
  const [editedName, setEditedName] = useState(user.name)
  const [editedEmail, setEditedEmail] = useState(user.email)
  const [editedPassword, setEditedPassword] = useState('')
  const [editedCompany, setEditedCompany] = useState('')

  // Function to handle form submission
  const handleSubmit = editModeSetter => {
    // Make an API call to update user information
    fetch(`/api/v1/users/me/${userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editedName,
        email: editedEmail,
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log('User information updated successfully')
          // Handle any UI updates or notifications indicating success
        } else {
          console.error('Failed to update user information')
          // Handle error scenario
        }
      })
      .catch(error => {
        console.error('Error updating user information:', error)
      })
      .finally(() => {
        // Always reset edit mode regardless of success or failure
        editModeSetter(false)
      })
  }

  return (
    <div className=''>
      <div>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base text-xl font-semibold leading-7 text-teal-600'>
            Security
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            Edit information
          </p>
        </div>
        <div className='mt-6 border-t border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='mt-[2px] text-sm font-medium leading-6 text-gray-900 sm:col-span-1 sm:mt-0'>
                Full name
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className={`w-[200px] rounded-lg p-1 ${
                      editMode ? '' : 'bg-gray-200'
                    }`}
                    type='text'
                    id='name'
                    value={editedName} /* Name */
                    onChange={e =>
                      setEditedName(e.target.value)
                    } /* Update edited name */
                    disabled={!editMode}
                  />
                </div>
              </form>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='mt-[2px] text-sm font-medium leading-6 text-gray-900'>
                Email address
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className={`w-[200px] rounded-lg p-1 ${
                      editMode ? '' : 'bg-gray-200'
                    }`}
                    type='text'
                    id='name'
                    value={editedEmail} /* Email */
                    onChange={e =>
                      setEditedEmail(e.target.value)
                    } /* Update edited email */
                    disabled={!editMode}
                  />
                </div>
              </form>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Password
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className={`w-[200px] rounded-lg p-1 ${
                      editMode ? '' : 'bg-gray-200'
                    }`}
                    type='text'
                    id='name'
                    value={editedPassword} /* Password */
                    onChange={e =>
                      setEditedPassword(e.target.value)
                    } /* Update edited password */
                    disabled={!editMode}
                  />
                </div>
              </form>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Conpany / Institution
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className={`w-[200px] rounded-lg p-1 ${
                      editMode ? '' : 'bg-gray-200'
                    }`}
                    type='text'
                    id='name'
                    value={editedCompany} /* Placeholder */
                    onChange={e =>
                      setEditedCompany(e.target.value)
                    } /* Update edited placeholder */
                    disabled={!editMode}
                  />
                </div>
              </form>
            </div>
          </dl>
        </div>
      </div>
      <div className='mx-[20%] text-sm leading-6 text-gray-700'>
        <button
          type='button' // Change type to button
          onClick={() => {
            if (editMode) {
              handleSubmit(setEditMode)
            } else {
              setEditMode(!editMode)
            }
          }} // Toggle edit mode or submit form
          className='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
        >
          <PencilIcon className='mr-2 mt-[4px] h-4' />
          <p className='font-bold'>{editMode ? 'Submit' : 'Edit'}</p>
        </button>
      </div>
    </div>
  )
}
