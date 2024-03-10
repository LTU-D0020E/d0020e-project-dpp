import Image from 'next/image'
import Link from 'next/link'

export function Additionals({ user, session }) {
  return (
    <>
      <div className='flex flex-col gap-6 pb-40 pt-8 md:gap-8 lg:col-span-5 lg:flex lg:pt-0'>
        <Link
          href='/'
          className='relative flex items-center justify-between overflow-hidden rounded-b-md rounded-t-xl bg-[#3d3d3d] p-8 py-8 text-white shadow-xl md:py-12'
        >
          <div className='relative z-20 max-w-md'>
            <p className='pb-3 text-2xl font-semibold'>Trace the Journey</p>
            <p className='text-lg font-medium leading-[160%] opacity-90'>
              {`Browse Millions of Products or Scan QR Codes for Detailed Lifecycles`}
            </p>
          </div>
          <div className='absolute -right-20 -top-20'>
            <div className='absolute h-full w-full bg-gradient-to-l from-[#000000]'></div>
            <Image
              src='/lifecycle.png'
              width='400' // Adjust the width as needed
              height='400' // Adjust the height as needed
              alt='lifecycle'
              className='object-cover opacity-30 grayscale filter'
            />
          </div>
        </Link>
        <Link
          href='/'
          className='relative flex items-center justify-between overflow-hidden rounded-b-md rounded-t-md bg-[#2e2e2e] p-8 py-8 text-white shadow-xl md:py-12'
        >
          <div className='relative z-20 max-w-md'>
            <p className='pb-3 text-2xl font-semibold'>
              Apply for wider Access
            </p>
            <p className='text-lg font-medium leading-[160%] opacity-90'>
              {`Apply for a Role to Access More Features and Tools on the Platform.`}
            </p>
            <div className='mt-6 block inline-flex w-full justify-center rounded-md bg-white bg-opacity-10 p-2.5 px-5 font-semibold text-white outline-2 outline-offset-2 transition-colors hover:bg-opacity-20 active:bg-opacity-30 active:text-white/80 disabled:cursor-not-allowed disabled:bg-gray-200 md:w-auto'>
              <span className=''>Apply for Role</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
