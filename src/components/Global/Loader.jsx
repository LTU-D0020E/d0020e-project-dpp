import { BarLoader } from 'react-spinners'

export function FullPageLoader() {
  return (
    <div className='absolute z-10 mx-auto  flex h-full w-full items-center justify-center bg-white'>
      <BarLoader color={'bg-blue-300'} size={40} />
    </div>
  )
}

export function ElementLoader(props) {
  return (
    <div className={props.className}>
      <BarLoader color={'bg-blue-300'} size={40} />
    </div>
  )
}
