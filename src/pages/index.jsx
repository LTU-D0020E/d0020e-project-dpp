import Image from 'next/image'
import { Inter } from 'next/font/google'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import SearchBar from '@/components/Global/SearchBar'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <LayoutGlobal searchBar={false}>
      <div className='flex h-screen flex-col items-center pt-32'>
        <h1 className='text-6xl font-bold'>Project D0020E</h1>
        <p className='pt-4 text-xl '>Digital Product Passport & Key Services</p>
        <div className='flex flex-col items-center  justify-center space-y-4 pt-12'>
          <p className='text-sm text-gray-400'>
            Want to know more about a product?
          </p>
          <SearchBar className='w-[800px]' />
        </div>
      </div>
    </LayoutGlobal>
  )
}
