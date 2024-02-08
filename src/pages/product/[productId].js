import { useRouter } from 'next/router'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { useEffect, useState } from 'react'
import React from 'react'
import { formatDate } from '@/utils/server/helpers'
import Link from 'next/link'
import TextField from '@/components/UI/Forms/TextField'
import { set } from 'mongoose'

export async function getServerSideProps(context) {
  const { productId } = context.params

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product/${productId}`

  try {
    const res = await fetch(fetchUrl)

    if (!res.ok) {
      throw new Error(`Failed to fetch product, status: ${res.status}`)
    }

    const productData = await res.json()

    return {
      props: { product: productData },
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      notFound: true,
    }
  }
}

function ProductDetails({ product }) {
  const [eventAction, setEventAction] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = e => {
    setEventAction(e.target.value)
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async e => {
    if (!eventAction) {
      setError('Please enter an event action')
      return
    }

    try {
      const response = await fetch(`/api/v1/product/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          action: eventAction,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to submit event, status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Event submitted:', data)
      setEventAction('')
    } catch (error) {
      setError(error.message)
      console.error('Error submitting event:', error)
    }
  }

  return (
    <LayoutGlobal>
      <Container
        className={'space-between flex flex-row justify-center gap-8 pt-20'}
      >
        <div className='hidden justify-center sm:flex'>
          <div className='mx-auto w-full md:flex md:flex-col md:items-center'>
            <div className='relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-4 pt-6 sm:sticky sm:top-8 sm:p-6 lg:w-[350px]'>
              <h1 className='text-center font-semibold'>
                You are qualified to add events
              </h1>
              <p className='pb-6 pt-2 text-center text-xs text-gray-500'>
                If you've performed something that's altered the product please
                state it and submit the form
              </p>
              <TextField
                label='Event Action'
                name='name'
                value={eventAction}
                onChange={handleInputChange}
                error={error}
                className='w-full'
                type='text'
              />
              <button
                onClick={handleSubmit}
                className='mt-4 w-full rounded-md bg-teal-600 py-2 text-white transition-all duration-300 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
              >
                Submit Event
              </button>
              {/* <p className='pt-2 text-center text-xs text-gray-500'>
                This event will be added to {product.name} 's event trail
              </p> */}
            </div>
          </div>
        </div>
        <div className='w-full rounded-md border-2 bg-white shadow-md'>
          <div className='p-8'>
            <div className='flex flex-col space-y-2 px-4 sm:px-0'>
              <h3 className='text-4xl font-semibold leading-7 text-gray-900'>
                {product.name}
              </h3>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                ProductID: {product.id}
              </p>
            </div>
            <div className='mt-6 border-t border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 text-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className=' font-medium leading-6 text-gray-900'>
                    Manufactuter:
                  </dt>
                  <dd className='mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {product.manufactured_by.owner_name}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Creation time
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {formatDate(product.created_at.creation_time)}
                  </dd>
                </div>
                {product.carbon_footprint.effect != null && (
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium leading-6 text-gray-900'>
                      Carbon footprint
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {product.carbon_footprint.effect}
                    </dd>
                  </div>
                )}
                {product.crm !== undefined && (
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium leading-6 text-gray-900'>
                      Crm
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      Scania
                    </dd>
                  </div>
                )}
                <div className='flex flex-col space-y-4 divide-y divide-gray-100'>
                  {product.event_trail.events.length > 0 && (
                    <details className=' bg-white p-6'>
                      <summary className='select-none text-sm font-semibold text-slate-900'>
                        Events
                      </summary>
                      <div className='mt-3 flex flex-col space-y-8 text-sm text-slate-600 '>
                        {product.event_trail.events.map((event, index) => (
                          <div key={index}>
                            <p>ID: {event.id}</p>
                            <p>
                              Creation Time: {formatDate(event.creation_time)}
                            </p>
                            <p>Action: {event.action}</p>
                            <br></br>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                  {product.key_components.components.length > 0 && (
                    <details className=' bg-white p-6'>
                      <summary className='select-none text-sm font-semibold leading-6 text-slate-900'>
                        Key components
                      </summary>
                      <div className='mt-3 flex flex-col space-y-8 text-sm leading-6 text-slate-600 '>
                        {product.key_components.components.map(
                          (component, index) => (
                            <div key={index}>
                              <p>ID: {component.id}</p>
                              <p>DPP Class: {component.dpp_class}</p>
                              <p>
                                Name:&nbsp;
                                <Link
                                  className='font-semibold text-teal-600'
                                  href={`/product/${component._id}`}
                                >
                                  {component.name}
                                </Link>
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </details>
                  )}
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </LayoutGlobal>
  )
}

export default ProductDetails
