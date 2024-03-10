import Link from 'next/link'
export default function SearchResultCard({ item }) {
  const cid = item.cid
  console.log(item)
  return (
    <Link className='w-full' href={`/product/${cid}`} passHref>
      <div className='flex w-full cursor-pointer items-center space-x-3 rounded-md p-3 hover:bg-gray-50'>
        <div className='relative'></div>
        <div className='flex flex-grow flex-row items-center justify-between'>
          <div>
            <p className='font-semibold'>{item.ProductName}</p>
            <p className='text-xs font-medium text-gray-500'>
              <span>{item.Entrydate} </span>
            </p>
          </div>
          <div className='flex flex-col text-right'>
            <p className='text-sm font-bold'>CID</p>
            <p className='text-xs font-medium text-gray-500'>{item.cid}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
