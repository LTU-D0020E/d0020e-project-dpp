import { classNames } from '@/utils/server/helpers'
import { Menu, Transition } from '@headlessui/react'
import {
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Fragment, useState } from 'react'

export function UserHeroLayout({ children, editable }) {
  return (
    <div
      className={`mx-auto w-full ${
        editable
          ? 'grid grid-cols-1 lg:grid-cols-8 lg:gap-16'
          : 'flex items-center justify-center lg:grid-cols-1'
      } lg:py-6`}
    >
      {children}
    </div>
  )
}

export function UserProfileCardLayout({ children, editable, user }) {
  return (
    <div className='relative flex items-center justify-between gap-4 rounded-b-md rounded-t-xl border border-gray-100 bg-white px-4 py-5 pb-1 shadow-xl md:p-6  md:pb-3'>
      <div className='w-full'>
        <>
          <OptionsMenu editable={editable} />
          {children}
        </>
      </div>
    </div>
  )
}

function OptionsMenu({ editable }) {
  return (
    <div className='absolute right-2 top-2 cursor-pointer text-gray-500'>
      <div>
        <Menu as='div' className='absolute right-3 top-2 z-[100]'>
          <div>
            <Menu.Button className=''>
              <span className='sr-only'>Alternative</span>
              <EllipsisHorizontalIcon className='w-7' aria-hidden='true' />
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
            <Menu.Items className='origin-center-right absolute -right-2 z-10 -mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                {editable && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href='/app/settings/profile'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'flex cursor-pointer items-center px-4 py-2 text-sm'
                        )}
                      >
                        <AdjustmentsHorizontalIcon
                          className='mr-3 h-4 text-gray-400'
                          aria-hidden='true'
                        />
                        <span>Profile Settings</span>
                      </Link>
                    )}
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
