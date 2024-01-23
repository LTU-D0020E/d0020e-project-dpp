import { useRouter } from 'next/router'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { useEffect, useState } from 'react'

export async function getServerSideProps(context) {
  const { productId } = context.params

  //const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL //REDO THIS LATER WE CANT HAVE BASE URL SHOULD WORK TO JUST DO /api/v1/product/${productID}

  try {
    const res = await fetch(`http://localhost:3000/api/v1/product/${productId}`) // Use backticks for template literal

    if (!res.ok) {
      throw new Error(`Failed to fetch product, status: ${res.status}`) // Template literal
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
/*
export default function ProductPage({ product }) {
  // Function to recursively render product properties, including nested objects/arrays
  const renderProductData = data => {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{renderProductData(item)}</li>
          ))}
        </ul>
      )
    } else if (typeof data === 'object' && data !== null) {
      return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {renderProductData(value)}
            </li>
          ))}
        </ul>
      )
    } else {
      return data.toString()
    }
  }

  return (
    <div>
      <h1>Product Details</h1>
      {renderProductData(product)}
    </div>
  )
}*/

/*
function ProductDetails({ product }) {
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
                <div>
                  <details className='rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10'>
                    <summary class='select-none text-sm font-semibold leading-6 text-slate-900 dark:text-white'>
                      Events
                    </summary>
                    <div class='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
                      <p>{[product.has_carbon_footprint.id]}</p>
                    </div>
                  </details>
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
*/

/*
const CarComponent = ({ product }) => {
  const extractComponents = data => {
    const components = []

    for (const key in data) {
      if (typeof data[key] === 'object') {
        if (data[key].id && data[key].dpp_class) {
          components.push({
            id: data[key].id,
            dpp_class: data[key].dpp_class,
            action: data[key].action,
          })

          if (Object.keys(data[key]).length > 2) {
            const subcomponents = extractComponents(data[key])
            components[components.length - 1].subcomponents = subcomponents
          }
        } else {
          const subcomponents = extractComponents(data[key])
          components.push(...subcomponents)
        }
      }
    }

    return components
  }

  const components = extractComponents(product)

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
                <div>
                  <details
                    className='rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10'
                    open
                  >
                    <summary className='select-none text-sm font-semibold leading-6 text-slate-900 dark:text-white'>
                      Events
                    </summary>
                    <div className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
                      {components.map((component, index) => (
                        <div key={index}>
                          <p>ID: {component.id}</p>
                          <p>DPP CLASS {component.dpp_class}</p>
                          <p>Action: {component.action}</p>
                          {component.subcomponents && (
                            <div className='ml-4'>
                              {component.subcomponents.map(
                                (subcomponent, subIndex) => (
                                  <div key={subIndex}>
                                    <p>ID: {subcomponent.id}</p>
                                    <p>DPP Class: {subcomponent.dpp_class}</p>
                                    {subcomponent.has_event_trail && (
                                      <div className='ml-4'>
                                        <p>
                                          Has Event Trail Privacy:{' '}
                                          {subcomponent.has_event_trail.privacy}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
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

export default CarComponent
*/

/*
const extractComponents = data => {
  const components = []

  const processObject = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (obj[key].id && obj[key].dpp_class) {
          components.push({
            id: obj[key].id,
            dpp_class: obj[key].dpp_class,
            action: obj[key].action, // Include action property
          })

          if (Object.keys(obj[key]).length >= 2) {
            const subcomponents = extractComponents(obj[key])
            components[components.length - 1].subcomponents = subcomponents
          }
        } else if (Array.isArray(obj[key]) && obj[key].length > 0) {
          // Handle arrays, such as the 'component' array
          const arrayComponents = obj[key].map(item => extractComponents(item))
          components.push(...arrayComponents)
        } else {
          const subcomponents = extractComponents(obj[key])
          components.push(...subcomponents)
        }
      }
    }
  }

  processObject(data)

  return components
}

const DisplayNestedObjects = ({ product }) => {
  const components = extractComponents(product)

  return (
    <div>
      <details
        className='rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10'
        open
      >
        <summary className='select-none text-sm font-semibold leading-6 text-slate-900 dark:text-white'>
          Events and Components
        </summary>
        <div className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
          {components.map((component, index) => (
            <div key={index}>
              {component.id && <p>ID: {component.id}</p>}
              {component.dpp_class && <p>DPP CLASS {component.dpp_class}</p>}
              {component.action && <p>Action: {component.action}</p>}
              {component.subcomponents && (
                <div className='ml-4'>
                  {component.subcomponents.map((subcomponent, subIndex) => (
                    <div key={subIndex}>
                      {subcomponent.id && <p>ID: {subcomponent.id}</p>}
                      {subcomponent.dpp_class && (
                        <p>DPP Class: {subcomponent.dpp_class}</p>
                      )}
                      {subcomponent.action && (
                        <p>Action: {subcomponent.action}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}

export default DisplayNestedObjects
*/
import React from 'react'

const extractComponents = data => {
  const components = []

  const processObject = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (obj[key].id && obj[key].dpp_class) {
          components.push({
            id: obj[key].id,
            dpp_class: obj[key].dpp_class,
          })

          if (Object.keys(obj[key]).length >= 2) {
            const subcomponents = extractComponents(obj[key])
            components[components.length - 1].subcomponents = subcomponents
          }
        } else {
          const subcomponents = extractComponents(obj[key])
          components.push(...subcomponents)
        }
      }
    }
  }

  processObject(data)

  return components
}

const DisplayNestedObjects = ({ product }) => {
  const components = extractComponents(product)

  return (
    <div>
      <details
        className='rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10'
        open
      >
        <summary className='select-none text-sm font-semibold leading-6 text-slate-900 dark:text-white'>
          Components
        </summary>
        <div className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
          {components.map((component, index) => (
            <div key={index}>
              <p>ID: {component.id}</p>
              <p>DPP Class: {component.dpp_class}</p>
              {component.subcomponents && (
                <div className='ml-4'>
                  {/* Recursive call for subcomponents */}
                  {component.subcomponents.map((subcomponent, subIndex) => (
                    <div key={subIndex}>
                      <p>ID: {subcomponent.id}</p>
                      <p>DPP Class: {subcomponent.dpp_class}</p>
                      {/* Add more properties if needed */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}

export default DisplayNestedObjects
