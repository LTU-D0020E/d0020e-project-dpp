import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react' // Import the useSession hook
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropdownMenu() {
  const { data: session } = useSession() // Get the user session data

  const handleSignOut = async () => {
    try {
      await signOut() // Trigger sign-out using next-auth/client's signOut

      // You can add any custom logic here after successful sign-out
    } catch (error) {
      console.error('Sign-out failed:', error)
      // Handle sign-out error here
    }
  }

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center px-3 py-2'>
          <UserIcon className='h-9 text-gray-800 transition duration-200 ease-in-out hover:text-teal-600' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {session ? ( // Check if there's a session
            <div className='px-4 py-3'>
              <p className='text-sm'>Signed in as</p>
              <p className='truncate text-sm font-medium text-gray-900'>
                {session.user.email} {/* Display user data from the session */}
              </p>
            </div>
          ) : null}
          {session ? ( // Display account settings if there's a session
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href='/profile'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className='flex flex-row items-center space-x-4'>
                      <Cog6ToothIcon className='h-5 text-gray-800' />
                      <p>Account settings</p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </div>
          ) : null}
          {session ? ( // Display example links if there's a session
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href='#'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className='flex flex-row items-center space-x-4'>
                      <ExclamationCircleIcon className='h-5 text-gray-800' />
                      <p>Example link</p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </div>
          ) : null}
          {session ? ( // Display sign out button if there's a session
            <div className='py-1'>
              <form method='POST' action='#'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type='button' // Change to 'button' type
                      onClick={handleSignOut} // Call handleSignOut when clicked
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      <div className='flex flex-row items-center space-x-4'>
                        <ArrowRightOnRectangleIcon className='h-5 text-gray-800' />
                        <p>Sign out</p>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          ) : (
            // Display Sign In button if there's no session
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href='/signup' // Link to your sign-in page
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className='flex flex-row items-center space-x-4'>
                      <UserIcon className='h-5 text-gray-800' />
                      <p>Sign In</p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
