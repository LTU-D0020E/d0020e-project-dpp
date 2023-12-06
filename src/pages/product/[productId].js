import { useRouter } from 'next/router'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { useEffect, useState } from 'react'

function ProductDetails() {
  /*  const router = useRouter()
  const ProductId = router.query.productId
  const [productData, setProductData] = useState({
    _id,
    id,
    name,
    dpp_class,
    creation_time,
    privacy,
  })

  const fetchproduct = async () => {
    try {
      // Make a GET request to the API route
      const response = await fetch('/api/v1/product/export-product')

      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Parse the response body as JSON
        const result = await response.json()

        // Update the component state with the fetched data
        setData(result)
      } else {
        // Handle non-successful responses (e.g., log an error)
        console.error(
          'Error fetching data:',
          response.status,
          response.statusText
        )
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error fetching data:', error.message)
    }
  }

  fetchproduct()*/

  return (
    <LayoutGlobal>
      <Container className={'pt-20'}>
        <div className='rounded-md border-2 shadow-md'>
          <div className='px-4 py-4'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-base font-semibold leading-7 text-gray-900'>
                Battery
              </h3>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                Text.
              </p>
            </div>
            <div className='mt-6 border-t border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    ProductID:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    198454
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Main Component:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    Lithium
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    MaterialID:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    223411
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Owner
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    Scania
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Creation time
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    aug 2023
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className='mt-16 flex flex-row content-center'>
          <div className='flex h-56 w-72 rounded-md border-2'>
            <div className='flex border-b-2 px-2'>
              <dl className=''>
                <dt>Weight</dt>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </LayoutGlobal>
  )
}

export default ProductDetails
