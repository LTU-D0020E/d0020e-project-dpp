import { Fragment, useState, useEffect } from 'react'
import { formatDate } from '@/utils/server/helpers'
import {
  ArrowDownIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { set } from 'mongoose'
import TextField from '@/components/UI/Forms/TextField'

export default function Roles() {
  const [formOpen, setFormOpen] = useState(false)
  const [roles, setRoles] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [roleCount, setRoleCount] = useState(0)

  const totalPages = roleCount > 0 ? Math.ceil(roleCount / pageSize) : 1

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          `/api/v1/admin/roles?page=${page}&pageSize=${pageSize}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setRoles(data.roles)
        setRoleCount(data.totalRoles) // Update based on the response field name
      } catch (error) {
        console.error('Failed to fetch roles:', error)
      }
    }

    fetchRoles()
  }, [page, pageSize])

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  const toggleFormOpen = () => {
    setFormOpen(prevState => !prevState)
  }

  return (
    <div className='flex flex-col justify-center px-20 py-10'>
      {/* Table Header */}
      <div className='mb-5'>
        <h1 className='text-3xl font-bold'>Roles</h1>
        <p className='text-md text-gray-600'>{roleCount} roles found</p>
      </div>
      {/* Add Role Button */}
      <div className='mb-5'>
        <button
          onClick={toggleFormOpen}
          className='flex items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:rounded-lg'
        >
          <Cog6ToothIcon className='mr-2 h-4 w-4' />
          Add Role
        </button>
      </div>
      {/* Role Dialog Window */}

      {formOpen && <RoleForm formOpen={formOpen} setFormOpen={setFormOpen} />}

      {/* Role Table */}
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Role Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Decryption Key
              </th>
              {/* Add more columns if needed */}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {roles.map(role => (
              <tr key={role._id} className='border-b bg-white hover:bg-gray-50'>
                <td className='px-6 py-4'>{role._id}</td>
                <td className='px-6 py-4'>{role.name}</td>
                <td className='px-6 py-4'>{role.decryption_key}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className='mt-4 flex items-center justify-between'>
        <button
          className={`text-gray-500 hover:text-gray-700 ${
            page === 1 && 'cursor-not-allowed'
          }`}
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className={`text-gray-500 hover:text-gray-700 ${
            page === totalPages && 'cursor-not-allowed'
          }`}
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

function RoleForm({ formOpen, setFormOpen }) {
  const [submitted, setSubmitted] = useState(false)

  const [formRole, setFormRole] = useState({
    name: '',
    decryption_key: '',
  })

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormRole(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const SubmitForm = async e => {
    e.preventDefault()
    setSubmitted(true)

    // Check if all required fields are filled
    if (!formRole.name || !formRole.decryption_key) {
      // Exit the function if required fields are missing
      return
    }
    try {
      const response = await fetch('/api/v1/admin/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRole),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // Assuming you want to do something with the response
      const data = await response.json()
      // Handle successful form submission (e.g., updating state, closing form)
      setFormOpen(false)
    } catch (error) {
      console.error('Submit failed:', error)
      // Handle submission error
    }
  }

  return (
    <Transition.Root show={formOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setFormOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <form
                onSubmit={SubmitForm}
                className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'
              >
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col items-center justify-center'>
                    <h className='text-lg font-bold'>Role Details</h>
                    <p className='text-sm text-gray-400'>
                      All fields are required to be filled!
                    </p>
                  </div>

                  <TextField
                    label='Role Name'
                    name='name'
                    value={formRole.name}
                    onChange={handleFormChange}
                    error={submitted && !formRole.name ? 'Required' : ''}
                    className='w-full'
                    type='text'
                  />

                  <TextField
                    label='Decryption Key'
                    name='decryption_key'
                    value={formRole.decryption_key}
                    onChange={handleFormChange}
                    error={
                      submitted && !formRole.decryption_key ? 'Required' : ''
                    }
                    className='w-full'
                    type='text'
                  />

                  <button
                    type='submit'
                    className='flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-400  sm:rounded-lg'
                  >
                    Create Role
                  </button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
