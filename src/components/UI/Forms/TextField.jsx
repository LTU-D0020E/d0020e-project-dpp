import { forwardRef } from 'react'

const TextField = forwardRef((props, ref) => {
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
      <input
        ref={ref}
        {...props}
        className={`block w-full appearance-none rounded-lg border ${
          props.error && props.error !== 0
            ? 'border-red-500'
            : 'border-gray-200'
        } bg-gray-50 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing.3)-1px)] text-gray-900 ring-0 ring-transparent transition duration-200 placeholder:text-gray-400 hover:bg-white hover:ring-4 hover:ring-blue-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 active:border-blue-500 active:bg-white active:ring-0`}
      />
      {props.error && props.error !== 0 && (
        <p className=' px-4 pt-1.5 text-sm text-red-700'>{props.error}</p>
      )}
    </div>
  )
})

TextField.displayName = 'TextField'

export default TextField
