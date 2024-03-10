import { PencilIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import ReactModal from 'react-modal'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { ProfileNavigation } from '@/components/app/profile/sidebar'

export default function Account() {
  const { data: session, status } = useSession() // Call useSession as a function
  const loading = status === 'loading'

  if (loading) {
    return <div>loading...</div>
  }

  if (!session) {
    return <div>No session found.</div>
  }

  return (
    <LayoutGlobal>
      <Container>
        <div className='mt-[100px] flex flex-row'>
          <ProfileNavigation />
          <div className='ml-[100px]'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-base text-xl font-semibold leading-7 text-teal-600'>
                Account
              </h3>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                Personal details
              </p>
            </div>
            <div className='mt-6 border-t border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Full name
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {session.user.name}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Role
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {session.user.role}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Email address
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {session.user.email}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Company / Institution
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    Luleå Tekniska Universitet
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    About
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </LayoutGlobal>
  )
}
