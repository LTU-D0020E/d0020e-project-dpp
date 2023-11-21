import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center px-3 py-2'>
          <UserIcon className='h-9 text-gray-800 hover:text-slate-600 transition duration-200 ease-in-out' />
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
          <div className='px-4 py-3'>
            <p className='text-sm'>Signed in as</p>
            <p className='truncate text-sm font-medium text-gray-900'>
              tom@example.com
            </p>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className='flex flex-row space-x-4 items-center'>
                    <Cog6ToothIcon className='h-5 text-gray-800' />
                    <p>Account settings</p>
                  </div>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className='flex flex-row space-x-4 items-center'>
                    <ExclamationCircleIcon className='h-5 text-gray-800' />
                    <p>Example link</p>
                  </div>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className='flex flex-row space-x-4 items-center'>
                    <ExclamationCircleIcon className='h-5 text-gray-800' />
                    <p>Example link</p>
                  </div>
                </a>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <form method='POST' action='#'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='submit'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    <div className='flex flex-row space-x-4 items-center'>
                      <ArrowRightOnRectangleIcon className='h-5 text-gray-800' />
                      <p>Sign out</p>
                    </div>
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
