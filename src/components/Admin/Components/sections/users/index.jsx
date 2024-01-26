import React, { Fragment, useState, useEffect } from 'react'
import { formatDate } from '@/utils/server/helpers'
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import TextField from '@/components/UI/Forms/TextField'

export default function Users() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [userCount, setUserCount] = useState(0)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/api/v1/admin/users?page=${page}&pageSize=${pageSize}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setUsers(data.users)
        setUserCount(data.totalUsers) // Adjust this line to match the field name
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [page, pageSize])

  // Handle page change
  const handlePageChange = newPage => {
    setPage(newPage)
  }

  // Calculate the total number of pages
  const totalPages = userCount > 0 ? Math.ceil(userCount / pageSize) : 1

  const [expandedRow, setExpandedRow] = useState(null)

  // Function to toggle row expansion
  const toggleRowExpansion = userId => {
    const user = users.find(u => u._id === userId)
    setSelectedUser(user) // Store the entire user object
    setExpandedRow(expandedRow === userId ? null : userId)
  }

  const handleToggleAdmin = async () => {
    if (!selectedUser) return

    const updatedUser = { ...selectedUser, admin: !selectedUser.admin }

    try {
      const res = await fetch(
        `/api/v1/admin/users/${selectedUser._id}/editAdmin`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        }
      )

      if (res.ok) {
        // Update the state
        setUsers(
          users.map(user =>
            user._id === selectedUser._id ? updatedUser : user
          )
        )
        setSelectedUser(null) // reset the selectedUser
      } else {
        const errorData = await res.json()
        throw new Error(
          errorData.message || 'Failed to update user admin status'
        )
      }
    } catch (error) {
      console.error('Failed to toggle admin status:', error)
    }
  }

  const toggleFormOpen = () => {
    setFormOpen(prevState => !prevState)
  }

  useEffect(() => {
    // This will run when `formOpen` changes
  }, [formOpen])

  return (
    <div className='flex flex-col justify-center px-20 py-10'>
      {/* Table Header */}
      <div className='mb-5'>
        <h1 className='text-3xl font-bold'>Users</h1>
        <p className='text-md text-gray-600'>{userCount} users found</p>
      </div>

      {/* User Table */}
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
            <tr>
              <th scope='col' className='whitespace-nowrap px-6 py-3'>
                ID
              </th>
              <th scope='col' className='whitespace-nowrap px-6 py-3'>
                Name
              </th>
              <th scope='col' className='whitespace-nowrap px-6 py-3'>
                Email
              </th>
              <th scope='col' className='whitespace-nowrap px-6 py-3'>
                Role
              </th>
              <th scope='col' className='whitespace-nowrap px-6 py-3'>
                Admin
              </th>
              <th scope='col' className='whitespace-nowrap px-6 py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <React.Fragment key={user._id}>
                <tr
                  className='cursor-pointer border-b bg-white hover:bg-gray-50'
                  onClick={() => toggleRowExpansion(user._id)}
                >
                  <td className='whitespace-nowrap px-6 py-4'>{user._id}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{user.name}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{user.email}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{user.role}</td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    {user.admin ? 'Yes' : 'No'}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex justify-end'>
                      {expandedRow === user._id ? (
                        <ChevronUpIcon className='w-5' />
                      ) : (
                        <ChevronDownIcon className='w-5' />
                      )}
                    </div>
                  </td>
                </tr>
                {expandedRow === user._id && (
                  <tr className='bg-gray-100'>
                    <td colSpan='6' className='px-6 py-4'>
                      <div className='flex flex-col gap-2'>
                        <span>Additional details for {user.name}</span>
                        <div>
                          <button
                            className='text-blue-600 hover:text-blue-900'
                            onClick={toggleFormOpen}
                          >
                            Change Role
                          </button>
                          <button
                            className='ml-4 text-blue-600 hover:text-blue-900'
                            onClick={() => handleToggleAdmin(user._id)}
                          >
                            {user.admin ? 'Remove Admin' : 'Make Admin'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {formOpen && (
              <RoleForm
                formOpen={formOpen}
                setFormOpen={setFormOpen}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            )}
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

function RoleForm({ formOpen, setFormOpen, selectedUser, setSelectedUser }) {
  const [roles, setRoles] = useState([]) // State to store the fetched roles
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/v1/admin/roles/export-all') // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()

        setRoles(data.roles) // Adjust field as per your API response structure
      } catch (error) {
        console.error('Failed to fetch roles:', error)
      }
    }

    fetchRoles()
  }, [])

  const handleRoleChange = e => {
    setSelectedRole(e.target.value)
  }

  const handleChangeRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/v1/admin/users/${userId}/editRole`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser._id, role: newRole }),
      })

      if (!response.ok) {
        throw new Error('Failed to change role')
      }

      // Optionally, handle the response data
      // const data = await response.json();
    } catch (error) {
      console.error('Failed to change role:', error)
      throw error // Re-throwing the error to handle it in handleSubmit
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!selectedUser || !selectedRole) {
      console.error('User or role not selected')
      return
    }
    console.log(selectedUser._id, selectedRole)
    try {
      await handleChangeRole(selectedUser._id, selectedRole) // Assuming selectedUser has an _id property
      setFormOpen(false)
      setSelectedUser(null)
    } catch (error) {
      // Handle error (e.g., show a message to the user)
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
                onSubmit={handleSubmit}
                className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'
              >
                <div className='flex flex-col space-y-4'>
                  <XMarkIcon
                    onClick={() => setFormOpen(false)}
                    className='absolute right-4 top-4 w-6 cursor-pointer text-gray-300 transition-all duration-300 ease-in-out hover:text-blue-600'
                  />
                  <div className='flex flex-col items-center justify-center'>
                    <h className='text-lg font-bold'>Role Details</h>
                    <p className='text-sm text-gray-400'>
                      Select the role you want to give the user!
                    </p>
                  </div>

                  <label
                    htmlFor='role'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Role
                  </label>
                  <select
                    id='role'
                    name='role'
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  >
                    <option value=''>Select a role</option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>

                  <button
                    type='submit'
                    className='mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  >
                    Change Role
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
