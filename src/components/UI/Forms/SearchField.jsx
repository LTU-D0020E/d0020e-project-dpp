import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { forwardRef } from 'react'

const SearchField = forwardRef((props, ref) => {
  return (
    <div className={props.className}>
      {props.label && (
        <label
          htmlFor={props.id}
          className='mb-2 block text-xs font-semibold text-gray-600'
        >
          {props.label}
        </label>
      )}
      <MagnifyingGlassIcon className='absolute left-3 top-[11px] h-5 text-gray-500 lg:top-3.5' />

      <input
        ref={ref}
        {...props}
        className={`block  appearance-none rounded-lg border pl-10 lg:w-full ${
          props.error && props.error !== 0
            ? 'border-red-500'
            : 'border-gray-200'
        } bg-gray-50 px-[calc(theme(spacing.4)-1px)] py-2 text-gray-900 ring-0 ring-transparent transition duration-200 placeholder:text-gray-400 hover:bg-white hover:ring-4 hover:ring-blue-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 active:border-blue-500 active:bg-white active:ring-0 lg:py-[calc(theme(spacing.3)-1px)]`}
      />
      {props.error && props.error !== 0 && (
        <p className=' px-4 pt-1.5 text-sm text-red-700'>{props.error}</p>
      )}
    </div>
  )
})

SearchField.displayName = 'SearchField'

export default SearchField
