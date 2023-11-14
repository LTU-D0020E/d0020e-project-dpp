import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Container } from '../utils/Container'
import { HomeIcon } from '@heroicons/react/24/solid'
import SearchBar from '../utils/SearchBar'

export function Header(props) {
  const router = useRouter()
  return (
    <header className={clsx('z-[150]', props.navClassName)}>
      <nav className='pt-4'>
        <Container className='flex flex-row h-[52px] justify-between items-center'>
          <HomeIcon className='h-full p-2 bg-slate-200 rounded-full text-gray-800 hover:bg-slate-300 transition duration-300 ease-in-out cursor-pointer' />
          <SearchBar />
          <div className='flex flex-row space-x-4 items-center'>
            <p className='h-full p-2 font-semibold bg-slate-200 rounded-full text-gray-800 hover:bg-slate-300 transition duration-300 ease-in-out cursor-pointer'>
              Categories
            </p>
            <p className='h-full p-2 m-5 font-semibold bg-slate-200 rounded-full text-gray-800 hover:bg-slate-300 transition duration-300 ease-in-out cursor-pointer'>
              Resources
            </p>
          </div>
          <div>test</div>
        </Container>
      </nav>
    </header>
  )
}
