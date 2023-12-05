import { ElementLoader } from '@/components/Global/Loader'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function ForceLogout() {
  const logOutHandler = () => {
    signOut({ redirect: false }).then(() => {
      // if (window?.Intercom) window.Intercom('shutdown')
      window.location.href = '/'
    })
  }

  useEffect(() => {
    const timer1 = setTimeout(() => {}, 1000)

    const timer2 = setTimeout(() => {
      logOutHandler()
    }, 1000)

    return () => clearTimeout(timer1, timer2)
  }, [])

  //

  return (
    <div className='absolute z-10 mx-auto flex  h-full w-full flex-col items-center justify-center bg-gray-50'>
      <ElementLoader />
      <p className='mt-4 text-gray-600'>Logging out...</p>
    </div>
  )
}
