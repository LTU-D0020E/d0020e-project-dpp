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
        <Container className='flex h-[52px] flex-row items-center justify-between'>
          <HomeIcon className='h-full cursor-pointer rounded-full bg-slate-200 p-2 text-gray-800 transition duration-300 ease-in-out hover:bg-slate-300' />
          <SearchBar />
          <div className='flex flex-row items-center space-x-4'>
            <p className='h-full cursor-pointer rounded-full bg-slate-200 p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-slate-300'>
              Categories
            </p>
            <p className='m-5 h-full cursor-pointer rounded-full bg-slate-200 p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-slate-300'>
              Resources
            </p>
          </div>
          <div>test</div>
        </Container>
      </nav>
    </header>
  )
}

function Hero() {
  return <div>icon</div>
}
