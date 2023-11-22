import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  UsersIcon,
  Bars3Icon,
  CpuChipIcon,
  HomeIcon,
  InboxStackIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Users', href: '#', icon: UserIcon, current: false },
  { name: 'Groups', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Materials', href: '#', icon: CpuChipIcon, current: false },
  { name: 'Products', href: '#', icon: InboxStackIcon, current: false },
  { name: 'Logs', href: '#', icon: DocumentTextIcon, current: false },
]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2'>
                    <nav className='flex flex-1 flex-col'>
                      <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        <li>
                          <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map(item => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-indigo-700 text-white'
                                      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? 'text-white'
                                        : 'text-indigo-200 group-hover:text-white',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden='true'
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className='text-xs font-semibold leading-6 text-indigo-200'>
                            Your teams
                          </div>
                          <ul role='list' className='-mx-2 mt-2 space-y-1'>
                            {teams.map(team => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-indigo-700 text-white'
                                      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )}
                                >
                                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white'>
                                    {team.initial}
                                  </span>
                                  <span className='truncate'>{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6'>
            <div className='flex h-16 shrink-0 flex-row items-center justify-center space-x-4 '>
              <Image
                src='/static/LTU_logo.svg'
                alt='company logo'
                width={50}
                height={30}
              />
              <p className='font-bold text-white'> Admin Dashboard</p>
            </div>
            <nav className='flex flex-1 flex-col'>
              <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul role='list' className='-mx-2 space-y-1'>
                    {navigation.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-indigo-700 text-white'
                              : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-white'
                                : 'text-indigo-200 group-hover:text-white',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className='text-xs font-semibold leading-6 text-indigo-200'>
                    Your teams
                  </div>
                  <ul role='list' className='-mx-2 mt-2 space-y-1'>
                    {teams.map(team => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-indigo-700 text-white'
                              : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white'>
                            {team.initial}
                          </span>
                          <span className='truncate'>{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className='-mx-6 mt-auto'>
                  <a
                    href='#'
                    className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700'
                  >
                    <img
                      className='h-8 w-8 rounded-full bg-indigo-700'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                    <span className='sr-only'>Your profile</span>
                    <span aria-hidden='true'>Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
          <button
            type='button'
            className='-m-2.5 p-2.5 text-indigo-200 lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 text-sm font-semibold leading-6 text-white'>
            Dashboard
          </div>
          <a href='#'>
            <span className='sr-only'>Your profile</span>
            <img
              className='h-8 w-8 rounded-full bg-indigo-700'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt=''
            />
          </a>
        </div>

        <main className='h-screen bg-gray-100 py-10 lg:pl-72'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-row justify-center space-x-20'>
              <div className='flex h-60 w-60 flex-col items-center justify-center rounded-lg bg-white shadow-md'>
                <div className='flex flex-col items-center space-y-2'>
                  <UserIcon className='w-20 text-blue-600' />
                  <p className='text-3xl font-semibold'>1359</p>
                </div>
                <p className='text-gray-300 '>User count</p>
              </div>
              <div className='flex h-60 w-60 flex-col items-center justify-center rounded-lg bg-white shadow-md'>
                <div className='flex flex-col items-center space-y-2'>
                  <UserGroupIcon className='w-20 text-blue-600' />
                  <p className='text-3xl font-semibold'>1359</p>
                </div>
                <p className='text-gray-300 '>Group count</p>
              </div>
              <div className='flex h-60 w-60 flex-col items-center justify-center rounded-lg bg-white shadow-md'>
                <div className='flex flex-col items-center space-y-2'>
                  <CpuChipIcon className='w-20 text-blue-600' />
                  <p className='text-3xl font-semibold'>1359</p>
                </div>
                <p className='text-gray-300 '>Material count</p>
              </div>
              <div className='flex h-60 w-60 flex-col items-center justify-center rounded-lg bg-white shadow-md'>
                <div className='flex flex-col items-center space-y-2'>
                  <CpuChipIcon className='w-20 text-blue-600' />
                  <p className='text-3xl font-semibold'>1359</p>
                </div>
                <p className='text-gray-300 '>Product count</p>
              </div>
            </div>
            <div className='mt-10 flex flex-row justify-center space-x-20 '>
              <div className='flex h-20 w-80 flex-col items-center justify-center rounded-lg bg-white shadow-md'>
                <div className='flex flex-col items-center space-y-2'>
                  <p className='font-bold'>Database Connectivity</p>
                  <div className='flex flex-row space-x-2'>
                    <ChartBarIcon className='w-5 text-emerald-500' />
                    <p>Connected</p>
                  </div>
                </div>
              </div>
              <div className='flex h-20 w-80 flex-col items-center justify-center rounded-lg bg-white shadow-md'>
                <div className='flex flex-col items-center space-y-2'></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
