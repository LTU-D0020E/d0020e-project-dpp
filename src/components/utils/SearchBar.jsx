import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
export default function SearchBar() {
  return (
    <div className='w-[220px]'>
      <div className='relative w-full'>
        <div className='flex w-full items-center'>
          <div className='w-full'>
            <MagnifyingGlassIcon className='absolute left-3 top-[11px] h-5 text-gray-500' />
            <input
              placeholder='Search'
              className='block appearance-none rounded-lg border pl-10 border-gray-200 bg-gray-50 py-2 px-[calc(theme(spacing.4)-1px)] text-gray-900 ring-0 ring-transparent transition duration-200 placeholder:text-gray-400 hover:bg-white hover:ring-4 hover:ring-[#CCC9E7]/40 focus:border-[#CCC9E7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#6C6F7D]/10 active:border-[#6C6F7D] active:bg-white active:ring-0'
            ></input>
          </div>
        </div>
      </div>
    </div>
  )
}
