import { useRouter } from 'next/router'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { useEffect, useState } from 'react'
import React from 'react'
import { formatDate } from '@/utils/server/helpers'
import Link from 'next/link'

export async function getServerSideProps(context) {
  console.log('context', context.params)
  const { productId } = context.params

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product/${productId}`

  try {
    console.log(`Fetching URL: ${fetchUrl}`)
    const res = await fetch('this is our fetchurl', fetchUrl)

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

const extractObjects = data => {
  const events = []
  const components = []

  const processObject = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (isEventObject(obj[key])) {
          events.push({
            id: obj[key].id,
            dpp_class: obj[key].dpp_class,
            creation_time: obj[key].creation_time,
            action: obj[key].action,
          })

          const objects = extractObjects(obj[key])
          if (objects.hasEvents.length > 0) {
            events[events.length - 1].subcomponents = objects.hasEvents
          }
        } else if (isComponentObject(obj[key])) {
          // Handle component object logic
          const componentData = {
            id: obj[key].id,
            dpp_class: obj[key].dpp_class,
            name: obj[key].name,
            _id: obj[key]._id,
          }
          components.push(componentData)

          const subcomponents = extractObjects(obj[key])
          if (subcomponents.hasEvents.length > 0) {
            componentData.subcomponents = subcomponents.hasEvents
          }
        } else {
          const subcomponents = extractObjects(obj[key])
          events.push(...subcomponents.hasEvents)
          components.push(...subcomponents.componentObjects)
        }
      }
    }
  }

  const isEventObject = obj => {
    return obj.hasOwnProperty('action')
    // Add any additional conditions for the 'has_event' object if needed
  }

  const isComponentObject = obj => {
    // Change the condition to check if the object has a 'name' property
    return obj.hasOwnProperty('name')
  }

  processObject(data)

  return {
    hasEvents: events,
    componentObjects: components,
  }
}

function ProductDetails({ product }) {
  const nestedObjects = extractObjects(product)

  return (
    <LayoutGlobal>
      <Container className={'pt-20'}>
        <div className='rounded-md border-2 bg-white shadow-md'>
          <div className='px-4 py-4'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-base font-semibold leading-7 text-gray-900'>
                {product.name}
              </h3>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                ProductID: {product.id}
              </p>
            </div>
            <div className='mt-6 border-t border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>
                    Manufactuter:
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
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
                <div className='flex flex-col space-y-4'>
                  {nestedObjects.hasEvents.length > 0 && (
                    <details className='rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10'>
                      <summary className='select-none text-sm font-semibold leading-6 text-slate-900 dark:text-white'>
                        Events
                      </summary>
                      <div className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
                        {nestedObjects.hasEvents.map((component, index) => (
                          <div key={index}>
                            <p>ID: {component.id}</p>
                            <p>
                              Creation Time:{' '}
                              {formatDate(component.creation_time)}
                            </p>
                            <p>Action: {component.action}</p>
                            <br></br>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                  {nestedObjects.componentObjects.length > 0 && (
                    <details className='rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10'>
                      <summary className='select-none text-sm font-semibold leading-6 text-slate-900 dark:text-white'>
                        Key components
                      </summary>
                      <div className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
                        {nestedObjects.componentObjects.map(
                          (component, index) => (
                            <div key={index}>
                              <p>ID: {component.id}</p>
                              <p>DPP Class: {component.dpp_class}</p>
                              <p>
                                Name:&nbsp;
                                <Link
                                  className='text-teal-600'
                                  href={`/product/${component._id}`}
                                >
                                  {component.name}
                                </Link>
                              </p>
                              <br></br>
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
