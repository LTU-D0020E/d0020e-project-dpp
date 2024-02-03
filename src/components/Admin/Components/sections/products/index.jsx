import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/solid'
import TextField from '@/components/UI/Forms/TextField'

export default function Products() {
  const [formOpen, setFormOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [productCount, setProductCount] = useState(0)

  const totalPages = productCount > 0 ? Math.ceil(productCount / pageSize) : 1

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/v1/admin/products?page=${page}&pageSize=${pageSize}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProducts(data.products)
        setProductCount(data.totalProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [page, pageSize])

  const toggleFormOpen = () => {
    setFormOpen(prevState => !prevState)
  }

  return (
    <div className='flex flex-col justify-center px-20 py-10'>
      <div className='mb-5'>
        <h1 className='text-3xl font-bold'>Products</h1>
        <p className='text-md text-gray-600'>{productCount} products found</p>
      </div>
      <div className='mb-5'>
        <button
          onClick={toggleFormOpen}
          className='flex items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:rounded-lg'
        >
          <Cog6ToothIcon className='mr-2 h-4 w-4' />
          Add Product
        </button>
      </div>

      {formOpen && (
        <ProductForm
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          setProducts={setProducts}
          setPage={setPage}
          setProductCount={setProductCount}
        />
      )}

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Product Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Manufactured By
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {products.map(product => (
              <tr
                key={product._id}
                className='border-b bg-white hover:bg-gray-50'
              >
                <td className='px-6 py-4'>{product._id}</td>
                <td className='px-6 py-4'>{product.name}</td>
                <td className='px-6 py-4'>
                  {product.manufactured_by.owner_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
          className={`text-gray-500 hover:text-gray-700 ${
            page === 1 && 'cursor-not-allowed'
          }`}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className={`text-gray-500 hover:text-gray-700 ${
            page === totalPages && 'cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

function ProductForm({
  formOpen,
  setFormOpen,
  setProducts,
  setPage,
  setProductCount,
}) {
  const [submitted, setSubmitted] = useState(false)
  const [formProduct, setFormProduct] = useState({
    name: '',
    // Initialize other fields as needed
  })

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormProduct(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const SubmitForm = async e => {
    e.preventDefault()
    setSubmitted(true)

    if (!formProduct.name) {
      return
    }
    try {
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProduct),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setFormOpen(false)
      // Optionally, refresh the products list or update state to include the new product
    } catch (error) {
      console.error('Submit failed:', error)
    }
  }

  return (
    <Transition.Root show={formOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setFormOpen(false)}
      >
        {/* Dialog and form content */}
        <form onSubmit={SubmitForm} className='...'>
          {/* Form fields and submit button */}
          <TextField
            label='Product Name'
            name='name'
            value={formProduct.name}
            onChange={handleFormChange}
            error={submitted && !formProduct.name ? 'Required' : ''}
            className='w-full'
            type='text'
          />
          {/* Add more fields as needed */}
          <button type='submit' className='...'>
            Add Product
          </button>
        </form>
      </Dialog>
    </Transition.Root>
  )
}
