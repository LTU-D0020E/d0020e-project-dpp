import { CheckBadgeIcon } from '@heroicons/react/24/solid'

export function UserVerifications({ user, editable }) {
  return (
    <div className='w-full rounded-b-xl rounded-t-md border border-gray-200 p-6 pt-0'>
      <p className='pt-6 text-xl font-semibold'>
        {editable ? 'Your Verifications' : 'Verifications'}
      </p>

      <div className='grid gap-4 pt-4'>
        <div className='flex items-center gap-1.5 text-lg font-medium'>
          <CheckBadgeIcon className='h-8  text-emerald-500' />
          <p>Email</p>
        </div>

        <div className='flex items-center gap-1.5 text-lg font-medium'>
          <CheckBadgeIcon className='h-8  text-emerald-500' />
          <p>Phone Number</p>
        </div>
        <div className='flex items-center gap-1.5 text-lg font-medium'>
          <CheckBadgeIcon className='h-8  text-emerald-500' />
          <p>Identity</p>
        </div>
      </div>
    </div>
  )
}
