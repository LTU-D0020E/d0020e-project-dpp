import { useRouter } from 'next/router'
import { useState } from 'react'
import clsx from 'clsx'
import { Container } from '../utils/Container'
import { HomeIcon } from '@heroicons/react/24/outline'
import Example from '../UI/Forms/UserDropdown'
import SearchBar from './SearchBar'
import Link from 'next/link'

export function NavbarGlobal({ searchBar = true, navClassName }) {
  const router = useRouter()
  const [isElementVisible, setElementVisibility] = useState(false)

  return (
    <header className={clsx('z-[150]', navClassName)}>
      <nav className='border-b p-3 shadow-md'>
        <Container className='flex h-[52px] items-center justify-between'>
          {/* Left Section for Home Icon */}
          <div className='relative flex h-full items-center justify-center'>
            <Link href='/' className='flex h-full items-center'>
              <HomeIcon className='h-14 cursor-pointer rounded-full p-2 text-gray-800 transition duration-200 ease-in-out hover:text-teal-600' />
            </Link>
          </div>

          {/* Conditionally render SearchBar */}
          {searchBar && (
            <div className='absolute left-0 right-0 mx-auto w-max'>
              <SearchBar />
            </div>
          )}

          {/* Right Section for Navigation Links */}
          <div className='flex items-center'>
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
