import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { UserIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { QrCodeIcon } from '@heroicons/react/24/outline'
import ReactModal from 'react-modal'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Account from '@/components/Profile/account'
import Settings from '@/components/Profile/settings'
import Scans from '@/components/Profile/scans'

export default function Profile() {
  const router = useRouter()
  const userid = router.query.userid // Assuming your dynamic route is /users/[userId]

  const { data: session } = useSession()
  const {
    data: user,
    error,
    isValidating,
  } = useSWR(userid ? `/api/v1/users/me/${userid}` : null)

  // Check if data is still being fetched
  if (isValidating) {
    return <div>Loading...</div>
  }

  // Handle error state
  if (error) {
    return <div>Error loading user data</div>
  }

  // Ensure that user object is available before accessing its properties
  if (!user || !user.name) {
    return <div>No user data available</div>
  }

  console.log(user.name)

  const [activePage, setActivePage] = useState(1) // This line should not be conditionally rendered
  const handleButtonClick = pageNumber => {
    setActivePage(pageNumber)
  }

  const [activeModal, setActiveModal] = useState(null)

  const openModal = modalNumber => {
    setActiveModal(modalNumber)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const [form, setForm] = useState({
    name: '',
  })

  const handleSubmit = async e => {
    e.preventDefault()
  }

  return (
    <LayoutGlobal>
      <Container>
        <div className='my-10 flex h-[80vh] w-full flex-row rounded-2xl bg-zinc-100 px-5 py-10'>
          <div className='flex w-[300px] flex-col'>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 1 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <UserIcon className='mr-2 mt-[2px] h-5' />
              Account
            </button>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 2 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(2)}
            >
              <Cog6ToothIcon className='mr-2 mt-[2px] h-5' />
              Security
            </button>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 3 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(3)}
            >
              <QrCodeIcon className='mr-2 mt-[2px] h-5' />
              Scanned products
            </button>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 4 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(4)}
            >
              <ClipboardDocumentListIcon className='mr-2 mt-[2px] h-5' />
              Events
            </button>
          </div>
          <div className='border-r-1 h-full border border-zinc-200'></div>
          <div className='mx-20 h-[30vw] w-full'>
            {activePage === 1 && <Account user={user} />}
            {activePage === 2 && <Settings user={user} />}
            {activePage === 3 && <Scans user={user} />}
            {activePage === 4 && <Event user={user} />}
          </div>
        </div>
      </Container>
    </LayoutGlobal>
  )
}
