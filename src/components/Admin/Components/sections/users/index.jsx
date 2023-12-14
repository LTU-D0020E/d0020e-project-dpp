import { useState, useEffect } from 'react'
import { formatDate } from '@/utils/server/helpers'
import {
  ArrowDownIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid'

export default function Users() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [userCount, setUserCount] = useState(0)

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
  console.log(userCount)
  console.log(users)
  return (
    <>
      <div className='flex flex-col justify-center px-20 py-10'>
        <div>
          <h1 className='text-3xl font-semibold'>Users</h1>
          <p className='text-md font-semibold text-gray-600'>
            {userCount} users found
          </p>
        </div>
        <div className='pt-10'>
          <div className='flex flex-row space-x-8 text-lg font-semibold'>
            <p className='border-b-2 border-blue-600'>All users</p>
            <p className='text-gray-300'>Admins</p>
            <p className='text-gray-300'>Workshop</p>
            <p className='text-gray-300'>Manufacturer</p>
            <p className='text-gray-300'>Remanufacturer</p>
          </div>
        </div>
        <div className='pt-8'>
          <div className='mt-8 flow-root'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className=' w-1/5 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                      >
                        id
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Role
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Admin
                      </th>
                      <th
                        scope='col'
                        className='relative py-3.5 pl-3 pr-4 sm:pr-0'
                      >
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {users.map(user => (
                      <tr key={user.email}>
                        <td className='w-1/5 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                          {user._id}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {user.name}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {user.email}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {user.role}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {user.admin ? 'Yes' : 'No'}
                        </td>
                        <td className='relative whitespace-nowrap py-4 pl-3 pr-2 text-right  text-sm font-medium sm:pr-0'>
                          <a
                            href='#'
                            className=' text-indigo-600 hover:text-indigo-900'
                          >
                            <span className='sr-only'>, {user.name}</span>
                            <Cog6ToothIcon className=' w-5 ' />
                          </a>
                        </td>
                        <td className='relative whitespace-nowrap py-4 pl-3 pr-2 text-right  text-sm font-medium sm:pr-0'>
                          <ChevronDownIcon className='w-5' />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              Previous{' '}
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(page + 1, totalPages))}
              disabled={page === totalPages || userCount === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
