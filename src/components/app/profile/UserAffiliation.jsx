import Image from 'next/image'

export function UserAffiliation({ user, editable }) {
  return (
    <div className='w-full cursor-pointer rounded-md  bg-slate-50 p-4 shadow-md transition-all duration-300 ease-in-out hover:bg-slate-100'>
      <div className='flex flex-grow flex-row items-center justify-evenly gap-4'>
        <div className='flex items-center text-sm font-medium'>
          <Image
            className=''
            src='/volvo.svg'
            alt='volvo logo'
            width={40}
            height={30}
          />
        </div>

        <div className='flex flex-col items-center font-semibold'>
          <p className='text-sm font-medium text-gray-400'>
            Volvo Construction & Equipment
          </p>
          <p className='text-medium'>Remanufacturing Engineer</p>
        </div>
      </div>
    </div>
  )
}
