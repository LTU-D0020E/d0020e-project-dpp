import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import SearchField from '../UI/Forms/SearchField'
import SearchResultCard from '../UI/global/SearchResultCard'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SearchBar({ className, ...props }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setSearchResult([])
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/v1/search?query=${searchTerm}`)
      const data = await response.json()
      setSearchResult(data.successful)
    } catch (error) {
      console.error('Error fetching search results:', error)
      setSearchResult([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch()
    }, 300) // Add a debounce to reduce API calls

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const handleInputChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleBlur = () => {
    setShowSearchResults(false)
  }

  const handleSearchBoxSelect = () => {
    setShowSearchResults(true)
  }

  const handleSearchSelect = url => {
    router.push(url)
    handleBlur()
  }

  return (
    <div className={clsx('relative', className)}>
      <div className='relative w-full'>
        <div className='flex w-full items-center'>
          <SearchField
            className='w-full'
            placeholder={'Search for a product...'}
            id='searchBar'
            name='searchBar'
            type='text'
            defaultValue={''}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onSelect={handleSearchBoxSelect}
          />
        </div>
      </div>
      {showSearchResults && (
        <>
          {searchResult.length > 0 && (
            <ul
              className={`absolute left-0 top-16 w-full cursor-pointer rounded-md border border-transparent bg-white text-blue-900 shadow-lg`}
            >
              {searchResult.map((item, index) => {
                if (!item) {
                  return null
                }

                const uniqueKey = item._id || item.name + item.dpp_class + index

                return (
                  <li
                    key={uniqueKey}
                    onClick={() => handleSearchSelect('/product/' + item._id)}
                    onMouseDown={e => e.preventDefault()}
                    className='flex flex-row items-center space-x-4 p-2 hover:bg-gray-100'
                  >
                    <SearchResultCard item={item} />
                  </li>
                )
              })}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
