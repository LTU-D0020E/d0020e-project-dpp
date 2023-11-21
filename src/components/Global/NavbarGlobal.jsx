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
import Example from '../UI/Forms/UserDropdown'

export function Header(props) {
  const router = useRouter()
  const [isElementVisible, setElementVisibility] = useState(false)

  return (
    <header className={clsx('z-[150]', props.navClassName)}>
      <nav className='bg-slate-300 p-3'>
        <Container className='flex flex-row h-[52px] justify-between items-center'>
          <a href='#' className='h-full'>
            <HomeIcon className='h-full p-2 rounded-full text-gray-800 hover:text-gray-600 transition duration-200 ease-in-out cursor-pointer' />
          </a>
          <div className='flex flex-row space-x-4 items-center'>
            <a
              href='#'
              className='nav-links h-full p-2 font-semibold rounded-full transition duration-200 ease-in-out cursor-pointer'
            >
              Categories
            </a>
            <a
              href='#'
              className='nav-links h-full p-2 font-semibold rounded-full transition duration-200 ease-in-out cursor-pointer'
            >
              Resources
            </a>
            <Example />
          </div>
        </Container>
      </nav>
    </header>
  )
}
