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

export default function Dashboard() {
  return (
    <>
      <div className='px-4 py-10 sm:px-6 lg:px-8'>
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
    </>
  )
}
