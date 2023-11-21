import { useRouter } from 'next/router'
import { useState } from 'react'
import clsx from 'clsx'
import { Container } from '../utils/Container'
import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

export function Header(props) {
  const router = useRouter()
  const [isElementVisible, setElementVisibility] = useState(false)

  // Toggle user visibility state
  const handleUserIconClick = () => {
    setElementVisibility(!isElementVisible)
  }

  return (
    <header className={clsx('z-[150]', props.navClassName)}>
      <nav className='bg-slate-300 p-3'>
        <Container className='flex flex-row h-[52px] justify-between items-center'>
          <HomeIcon className='h-full p-2 rounded-full text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out cursor-pointer' />
          <div className='flex flex-row space-x-4 items-center'>
            <p className='h-full p-2 font-semibold rounded-full text-gray-800 hover:bg-slate-400 transition duration-300 ease-in-out cursor-pointer'>
              Categories
            </p>
            <p className='h-full p-2 font-semibold rounded-full text-gray-800 hover:bg-slate-400 transition duration-300 ease-in-out cursor-pointer'>
              Resources
            </p>
            <UserCircleIcon
              className='h-14 p-2 rounded-full text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out cursor-pointer flex-shrink-0'
              onClick={handleUserIconClick}
            />
          </div>

          {isElementVisible && (
            <div className='absolute right-0 h-[300px] w-[200px] mt-2 p-2 bg-slate-300 rounded shadow text-center'>
              <div className='flex items-center justify-center h-[100px] w-full'>
                <UserCircleIcon className='h-full p-2 rounded-full text-gray-800' />
              </div>
              <div className='flex flex-row items-center'>
                <Cog6ToothIcon className='h-10 p-2 rounded-full text-gray-800 transition duration-300 ease-in-out cursor-pointer' />
                <p className='cursor-pointer'>Account settings</p>
              </div>
              <div className='flex flex-row items-center'>
                <ArrowRightOnRectangleIcon className='h-10 p-2 rounded-full text-gray-800 transition duration-300 ease-in-out cursor-pointer' />
                <p className='cursor-pointer'>Sign out</p>
              </div>
            </div>
          )}
        </Container>
      </nav>
    </header>
  )
}
