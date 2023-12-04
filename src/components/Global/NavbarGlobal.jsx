import { useRouter } from 'next/router'
import { useState } from 'react'
import clsx from 'clsx'
import { Container } from '../utils/Container'
import { HomeIcon } from '@heroicons/react/24/outline'
import Example from '../UI/Forms/UserDropdown'

export function Header(props) {
  const router = useRouter()
  const [isElementVisible, setElementVisibility] = useState(false)

  return (
    <header className={clsx('z-[150]', props.navClassName)}>
      <nav className='border-b p-3 shadow-md'>
        <Container className='flex h-[52px] flex-row items-center justify-between'>
          <a href='#' className='h-full'>
            <HomeIcon className='h-full cursor-pointer rounded-full p-2 text-gray-800 transition duration-200 ease-in-out hover:text-teal-600' />
          </a>
          <div className='nav-links-container flex flex-row items-center space-x-4 text-lg'>
            <a
              href='#'
              className='nav-links h-full cursor-pointer rounded-full p-2 font-semibold transition duration-200 ease-in-out hover:text-teal-600'
            >
              Categories
            </a>
            <a
              href='#'
              className='nav-links h-full cursor-pointer rounded-full p-2 font-semibold transition duration-200 ease-in-out hover:text-teal-600'
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

function Hero() {
  return <div>icon</div>
}
