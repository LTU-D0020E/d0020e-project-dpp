import { PencilIcon } from '@heroicons/react/24/outline'
import ReactModal from 'react-modal'

export default function Settings({ user }) {
  return (
    <div className=''>
      <div>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base text-xl font-semibold leading-7 text-teal-600'>
            Security
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            Edit information
          </p>
        </div>
        <div className='mt-6 border-t border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='mt-[2px] text-sm font-medium leading-6 text-gray-900 sm:col-span-1 sm:mt-0'>
                Full name
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className='w-[200px] rounded-lg p-1'
                    type='text'
                    id='name'
                    value={user.name} /* Name */
                  />
                </div>
                <div className='mx-[110px] text-sm leading-6 text-gray-700'>
                  <button
                    type='submit'
                    className='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                  >
                    <PencilIcon className='mr-2 mt-[4px] h-4' />
                    <p className='font-bold'>Edit</p>
                  </button>
                </div>
              </form>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='mt-[2px] text-sm font-medium leading-6 text-gray-900'>
                Email address
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className='w-[200px] rounded-lg p-1'
                    type='text'
                    id='name'
                    value={user.email} /* Email */
                  />
                </div>
                <div className='mx-[110px] text-sm leading-6 text-gray-700'>
                  <button
                    type='submit'
                    className='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                  >
                    <PencilIcon className='mr-2 mt-[4px] h-4' />
                    <p className='font-bold'>Edit</p>
                  </button>
                </div>
              </form>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Password
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className='w-[200px] rounded-lg p-1'
                    type='text'
                    id='name'
                    value={user.name} /* Password */
                  />
                </div>
                <div className='mx-[110px] text-sm leading-6 text-gray-700'>
                  <button
                    type='submit'
                    className='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                  >
                    <PencilIcon className='mr-2 mt-[4px] h-4' />
                    <p className='font-bold'>Edit</p>
                  </button>
                </div>
              </form>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Conpany / Institution
              </dt>
              <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                <div className='text-sm leading-6 text-gray-700'>
                  <input
                    className='w-[200px] rounded-lg p-1'
                    type='text'
                    id='name'
                    value='Luleå Tekniska Universitet'
                  />
                </div>
                <div className='mx-[110px] text-sm leading-6 text-gray-700'>
                  <button
                    type='submit'
                    className='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                  >
                    <PencilIcon className='mr-2 mt-[4px] h-4' />
                    <p className='font-bold'>Edit</p>
                  </button>
                </div>
              </form>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
