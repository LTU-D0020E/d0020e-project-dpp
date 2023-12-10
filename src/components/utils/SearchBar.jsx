import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/v1/search?query=${searchTerm}`)
      const data = await response.json()
      setSearchResult(data)
    } catch (error) {
      console.error('Error fetching search results:', error)
      setSearchResult([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      handleSearch()
    } else {
      setSearchResult([])
    }
  }, [searchTerm])

  const filteredResults = searchResult.filter(
    element =>
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (element.manufactured_by &&
        element.manufactured_by.owner_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      element.dpp_class.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='w-[800px]'>
      <div className='relative w-full'>
        <div className='flex w-full items-center'>
          <div className='w-full'>
            <MagnifyingGlassIcon className='absolute left-3 top-[11px] h-5 text-gray-500' />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder='Search'
              className='block appearance-none rounded-lg border border-gray-200 bg-gray-50 px-[calc(theme(spacing.4)-1px)] py-2 pl-10 text-gray-900 ring-0 ring-transparent transition duration-200 placeholder:text-gray-400 hover:bg-white hover:ring-4 hover:ring-[#CCC9E7]/40 focus:border-[#CCC9E7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#6C6F7D]/10 active:border-[#6C6F7D] active:bg-white active:ring-0'
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            ></input>
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      <div className='mt-4'>
        {filteredResults.length > 0 ? (
          filteredResults.map((element, index) => (
            <div key={index} className='mb-4 border border-gray-300 p-4'>
              <p>
                <strong>Name:</strong> {element.name}
              </p>
              <p>
                <strong>DPP Class:</strong> {element.dpp_class}
              </p>
              <p>
                <strong>Owner Name:</strong>{' '}
                {element.manufactured_by
                  ? element.manufactured_by.owner_name
                  : '-'}
              </p>
            </div>
          ))
        ) : (
          <p className='border border-gray-300 p-4 text-center'>
            No results found
          </p>
        )}
      </div>
    </div>
  )
}
