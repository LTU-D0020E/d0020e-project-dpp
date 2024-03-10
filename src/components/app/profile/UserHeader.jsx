import { FingerPrintIcon } from '@heroicons/react/24/solid'

export function UserHeader({ user, editable, session }) {
  return (
    <div className='relative flex w-full flex-col items-center gap-6 pb-6 sm:flex-row'>
      <div className='-mt-2 flex w-full flex-col gap-2 sm:mt-0'>
        <p className='text-center text-xl font-bold sm:text-left'>
          {user.name}
        </p>
        <div className='left-0 flex w-full items-center gap-0.5'>
          <FingerPrintIcon className='h-4' />
          <p className='text-sm font-medium'>{user.role}</p>
        </div>
      </div>
    </div>
  )
}
