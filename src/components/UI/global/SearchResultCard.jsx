export default function SearchResultCard({ item }) {
  console.log(item)
  const { name, dpp_class, manufactured_by, created_at } = item

  return (
    <div className='flex w-full cursor-pointer items-center space-x-3 rounded-md p-3 hover:bg-gray-50'>
      <div className='relative'></div>
      <div className='flex flex-col'>
        <p className='font-semibold'>{name}</p>
        <p className='text-xs font-medium text-gray-500'>
          {/*           {created_at && created_at.creation_time && (
            <span> {created_at.creation_time}</span>
          )} */}
          {manufactured_by && manufactured_by.owner_name && (
            <span> {manufactured_by.owner_name}</span>
          )}
        </p>
      </div>
    </div>
  )
}
