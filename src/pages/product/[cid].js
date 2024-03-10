import { useRouter } from 'next/router'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { useEffect, useState } from 'react'
import React from 'react'
import { formatDate, formatDimensions } from '@/utils/server/helpers'
import Link from 'next/link'
import TextField from '@/components/UI/Forms/TextField'
import {
  addEventToIPFS,
  fetchDataFromIPFS,
  fetchEventsFromIPFS,
} from '@/utils/server/ipfs-api-helpers'
import { getSession, useSession } from 'next-auth/react'
import KeyDocument from '@/models/KeyDocument'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const { cid } = context.params

  try {
    const productData = await fetchDataFromIPFS(cid)

    let remanEvents = null
    let shippingEvents = null

    if (
      session &&
      (session.user.role === 'Contributor' || session.user.isAdmin)
    ) {
      const keyDocument = await KeyDocument.findOne({ cid: cid })
      if (!keyDocument) {
        throw new Error('Document not found')
      }

      try {
        // Attempt to fetch the last remanufacturing event
        remanEvents = await fetchEventsFromIPFS(
          keyDocument.remanufacturing_events.publickey,
          'LastEvent'
        )
      } catch (error) {
        // If no remanufacturing event found, handle it here (e.g., log the error)
        console.log('No remanufacturing event found:', error.message)
        remanEvents = null
      }

      try {
        // Attempt to fetch the last shipping event
        shippingEvents = await fetchEventsFromIPFS(
          keyDocument.shipping.publickey,
          'LastEvent'
        )
      } catch (error) {
        // If no shipping event found, handle it here (e.g., log the error)
        console.log('No shipping event found:', error.message)
        shippingEvents = null
      }

      console.log('Events:', { remanEvents, shippingEvents })
    }

    // Return all fetched data
    return {
      props: {
        product: {
          ...productData,
          remanEvents,
          shippingEvents,
        },
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { notFound: true }
  }
}

function ProductDetails({ product }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [eventCategory, setEventCategory] = useState('remanufacturing') // default to 'remanufacturing'
  const [eventDate, setEventDate] = useState(new Date())
  const [eventType, setEventType] = useState('')
  const [eventData, setEventData] = useState('')
  const [error, setError] = useState('')

  if (loading) {
    return <div>Loading...</div> // Or any other loading indicator
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'eventType':
        setEventType(value)
        break
      case 'eventData':
        setEventData(value)
        break
      default:
        break
    }
    console.log()
    if (error) setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault() // Don't forget to prevent default form submission

    if (!eventType || !eventData) {
      setError('Please fill in all fields')
      return
    }
    const publicKey =
      eventCategory === 'remanufacturing'
        ? product.remanufacturing_events
        : product.shipping

    console.log(publicKey, eventType, eventDate.toISOString(), eventData)
    try {
      const result = await addEventToIPFS(
        publicKey,
        eventType,
        eventDate.toISOString(), // Format the date to ISO string
        eventData
      )

      console.log('Event submitted:', result)

      setEventType('')
      setEventData('')
      setEventCategory('remanufacturing') // Reset the dropdown
    } catch (error) {
      console.error('Error submitting event:', error)
      setError(error.message)
    }
  }
  console.log('heres the goddamn product', product)

  return (
    <LayoutGlobal>
      <Container
        className={'space-between flex flex-row justify-center gap-8 pt-20'}
      >
        {session && session.user.role === 'Contributor' && (
          <div className='hidden justify-center sm:flex'>
            <div className='mx-auto w-full md:flex md:flex-col md:items-center'>
              <div className='relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-4 pt-6 sm:sticky sm:top-8 sm:p-6 lg:w-[350px]'>
                <h1 className='text-center font-semibold'>
                  You are qualified to add events
                </h1>
                <p className='pb-6 pt-2 text-center text-xs text-gray-500'>
                  {
                    "If you've performed something that's altered the product please state it and submit the form"
                  }
                </p>
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col'>
                    <span className='mb-2 block text-xs font-semibold text-gray-600'>
                      Event Category
                    </span>
                    <select
                      name='eventCategory'
                      value={eventCategory}
                      onChange={e => setEventCategory(e.target.value)}
                      className='form-control block w-full appearance-none rounded-lg border bg-gray-50 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing.3)-1px)] text-gray-900 ring-0 ring-transparent transition duration-200 placeholder:text-gray-400 hover:bg-white hover:ring-4 hover:ring-blue-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 active:border-blue-500 active:bg-white active:ring-0' // Apply any needed styling or classes
                    >
                      <option value='remanufacturing'>Remanufacturing</option>
                      <option value='shipping'>Shipping</option>
                    </select>
                  </div>
                  <TextField
                    label='Event Data'
                    name='eventData'
                    value={eventData}
                    onChange={handleInputChange}
                    error={error}
                    className='w-full'
                    type='text'
                  />
                  <TextField
                    label='Event Type'
                    name='eventType'
                    value={eventType}
                    onChange={handleInputChange}
                    error={error}
                    className='w-full'
                    type='text'
                  />
                  <div className='flex flex-col'>
                    <span className='mb-2 block text-xs font-semibold text-gray-600'>
                      Date
                    </span>
                    <DatePicker
                      selected={eventDate}
                      onChange={date => setEventDate(date)}
                      className='form-control block w-full appearance-none rounded-lg border bg-gray-50 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing.3)-1px)] text-gray-900 ring-0 ring-transparent transition duration-200 placeholder:text-gray-400 hover:bg-white hover:ring-4 hover:ring-blue-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 active:border-blue-500 active:bg-white active:ring-0'
                      name='eventDate'
                    />
                  </div>
                </div>
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
        )}
        <div className='w-full rounded-md border-2 bg-white shadow-md'>
          <div className='p-8'>
            <div className='flex flex-col space-y-2 px-4 sm:px-0'>
              <h3 className='text-4xl font-semibold leading-7 text-gray-900'>
                {product.ProductName}
              </h3>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                CID: {product.cid}
              </p>
            </div>
            <div className='mt-6 border-t border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 text-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className=' font-medium leading-6 text-gray-900'>
                    Product Type:
                  </dt>
                  <dd className='mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {product.ProductType}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Creation time:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {formatDate(product.Entrydate)}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Plant:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {product.Plant}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Material ID:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {product.MaterialId}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Order ID:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {product.OrderId}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    <span>Dimensions</span>{' '}
                    <span className='text-xs font-semibold text-gray-300'>
                      (XX YY ZZ)
                    </span>
                    :{' '}
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {formatDimensions(product.Dimensions)}
                  </dd>
                </div>

                <div className='flex flex-col space-y-4 divide-y divide-gray-100'>
                  {product.remanEvents && (
                    <details className='bg-white p-6'>
                      <summary className='select-none text-sm font-semibold text-slate-900'>
                        Remanufacturing Events
                      </summary>
                      <div className='mt-3 flex flex-col space-y-8 text-sm text-slate-600'>
                        <div>
                          <p>Data: {product.remanEvents.Data}</p>
                          <p>
                            Creation Time:{' '}
                            {formatDate(product.remanEvents.Datetime)}
                          </p>
                          <p>Event Type: {product.remanEvents.Eventtype}</p>
                          <br />
                        </div>
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
