import Image from 'next/image'
import { Inter } from 'next/font/google'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import SearchBar from '@/components/utils/SearchBar'
import { Container } from '@/components/utils/Container'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <LayoutGlobal>
      <Container>
        <div className='flex h-[80vh] w-full flex-col items-center justify-center'>
          <SearchBar></SearchBar>
          <p className='text-zinc-600'>Search for products or materials.</p>
        </div>
      </Container>
    </LayoutGlobal>
  )
}
