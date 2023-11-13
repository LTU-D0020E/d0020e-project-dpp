import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Container } from '../utils/Container'
import { HomeIcon } from '@heroicons/react/24/solid'

export function Header(props) {
  const router = useRouter()
  return (
    <header className={clsx('z-[150]', props.navClassName)}>
      <nav className='pt-4'>
        <Container className='flex flex-row justify-between items-center'>
          <HomeIcon className='w-6 text-white' />

          <div className='flex flex-row space-x-4 items-center'>
            <p className='p-2 bg-slate-700 rounded-full'>Categories</p>
            <p className='p-2 bg-slate-700 rounded-full'>Resources</p>
          </div>
        </Container>
      </nav>
    </header>
  )
}
