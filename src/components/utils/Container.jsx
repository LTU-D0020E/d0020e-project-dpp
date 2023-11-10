import { twMerge } from 'tailwind-merge'

export function Container({ className, fwClassName, ...props }) {
  return (
    <section className={twMerge('w-full', fwClassName)}>
      <div
        className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
        {...props}
      />
    </section>
  )
}
