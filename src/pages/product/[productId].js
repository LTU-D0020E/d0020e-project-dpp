import { useRouter } from 'next/router'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'

function ProductDetails() {
  const router = useRouter()
  const ProductId = router.query.productId
  return (
    <LayoutGlobal>
      <Container className={'pt-20'}>
        <div className='border-2 rounded-md shadow-md'>
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
        <div className='flex flex-row mt-16 content-center'>
          <div className='rounded-md border-2 w-72 h-56 flex'>
            <div className='flex px-2 border-b-2'>
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
