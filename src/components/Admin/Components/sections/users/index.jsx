import React, { useState, useEffect } from 'react'
import { formatDate } from '@/utils/server/helpers'
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid'

export default function Users() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [userCount, setUserCount] = useState(0)
  const [selectedUser, setSelectedUser] = useState(null)

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

  const handleChangeRole = async (userId, newRole) => {
    try {
      // Call your API to change the role
      // For example: await fetch(`/api/v1/admin/users/${userId}/role`, { method: 'PUT', body: JSON.stringify({ role: newRole }) })
      // Update the users state with the new role
      setUsers(
        users.map(user =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      )
    } catch (error) {
      console.error('Failed to change role:', error)
    }
  }

  const handleToggleAdmin = async () => {
    if (!selectedUser) return
    console.log(selectedUser)

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
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Role
              </th>
              <th scope='col' className='px-6 py-3'>
                Admin
              </th>
              <th scope='col' className='px-6 py-3'>
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
                  <td className='px-6 py-4'>{user._id}</td>
                  <td className='px-6 py-4'>{user.name}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4'>{user.role}</td>
                  <td className='px-6 py-4'>{user.admin ? 'Yes' : 'No'}</td>
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
                            onClick={() =>
                              handleChangeRole(user._id, 'newRole')
                            }
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
