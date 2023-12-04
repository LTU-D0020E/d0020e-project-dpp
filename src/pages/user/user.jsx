import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { UserIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {}, [])

  const handleButtonClick = pageNumber => {
    setActivePage(pageNumber)
  }

  return (
    <LayoutGlobal>
      <Container>
        <div className='flex flex-row h-[80vh] w-full bg-zinc-100 rounded-2xl my-10 px-5 py-10'>
          <div className='flex flex-col w-[300px]'>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 1 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <UserIcon className='h-5 mt-[2px] mr-2' />
              Account
            </button>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 2 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(2)}
            >
              <ExclamationTriangleIcon className='h-5 mt-[2px] mr-2' />
              Placeholder
            </button>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 3 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(3)}
            >
              <ExclamationTriangleIcon className='h-5 mt-[2px] mr-2' />
              Placeholder
            </button>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 4 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(4)}
            >
              <ExclamationTriangleIcon className='h-5 mt-[2px] mr-2' />
              Placeholder
            </button>
          </div>
          <div className='h-full border border-r-1 border-zinc-200'></div>
          <div className='h-[30vw] w-full mx-20'>
            {activePage === 1 && (
              <div>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-xl mb-5'>
                    Account information
                  </h2>
                  <button className='font-bold text-zinc-700 text-md mb-5 bg-zinc-200 rounded-3xl w-[110px] p-1 transition duration-200 hover:bg-teal-600 hover:text-zinc-50'>
                    Edit profile
                  </button>
                </div>

                <table>
                  <tr>
                    <td className='font-bold w-[15vw] leading-loose'>
                      User Id
                    </td>
                    <td>Aron Gunnar</td>
                  </tr>
                  <tr>
                    <td className='font-bold w-[15vw] leading-loose'>Name</td>
                    <td>Oscar Borén</td>
                  </tr>
                  <tr>
                    <td className='font-bold w-[15vw] leading-loose'>Email</td>
                    <td>example-0@student.ltu.se</td>
                  </tr>
                  <tr>
                    <td className='font-bold w-[15vw] leading-loose'>Phone</td>
                    <td>+46234567890</td>
                  </tr>
                  <tr>
                    <td className='font-bold w-[15vw] leading-loose'>Role</td>
                    <td>Admin</td>
                  </tr>
                </table>
              </div>
            )}
            {activePage === 2 && (
              <div className=''>Lorem ipsum dolor sit amet 2</div>
            )}
            {activePage === 3 && (
              <div className=''>Lorem ipsum dolor sit amet 3</div>
            )}
            {activePage === 4 && (
              <div className=''>Lorem ipsum dolor sit amet 4</div>
            )}
          </div>
        </div>
      </Container>
    </LayoutGlobal>
  )
}
