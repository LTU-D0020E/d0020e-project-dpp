import { useState } from 'react'
import ReactModal from 'react-modal'
import { formatDate } from '@/utils/server/helpers'

export default function Scans({ scans }) {
  const [activeModal, setActiveModal] = useState(null)
  const openModal = modalNumber => {
    setActiveModal(modalNumber)
  }
  const closeModal = () => {
    setActiveModal(null)
  }

  const [form, setForm] = useState({
    name: '',
  })

  const handleSubmit = async e => {
    e.preventDefault()
    // Add logic to handle form submission
  }

  return (
    <div className=''>
      <div className='px-4 sm:px-0'>
        <h3 className='text-base text-xl font-semibold leading-7 text-teal-600'>
          Scanned products
        </h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
          View or create event
        </p>
      </div>
      <table className='my-8 w-[100%] text-left'>
        <thead>
          <tr className='border-b-[1px] text-gray-700'>
            <th>Product</th>
            <th>Product ID</th>
            <th>Date Scanned</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scans ? (
            scans.map(scan => (
              <tr
                key={scan._id}
                className='border-b-[1px] text-gray-700 hover:bg-[#0f8a8086]'
              >
                <td>{scan.product.name}</td>
                <td>{scan.product._id}</td>
                <td>{formatDate(scan.createdAt)}</td>
                <td>
                  <button
                    onClick={() => openModal(1)}
                    className='cursor-pointer rounded-xl px-2 py-1 pb-2 font-bold text-teal-600 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                  >
                    Create event
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No scans available</td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactModal
        isOpen={activeModal === 1}
        onRequestClose={closeModal}
        contentLabel='Create event for item 1'
        className='flex h-[100%] items-center justify-center'
      >
        <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
          <div className='flex flex-row justify-between font-bold'>
            <p className=''>
              Product <span className='italic text-teal-600'>GET PROD.</span>
            </p>
            <button
              onClick={closeModal}
              className='rounded-md bg-zinc-300 px-[10px] py-[2px] transition duration-200 ease-in-out hover:bg-zinc-100'
            >
              X
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className='flex h-[80%] flex-col items-center justify-center'
          >
            <div className='m-2 flex w-[70%] justify-between'>
              <label for='fname'>First name:</label>
              <input type='text' id='fname' name='fname' />
            </div>
            <div className='m-2 flex w-[70%] justify-between'>
              <label for='lname'>Last name:</label>
              <input type='text' id='lname' name='lname' />
            </div>
            <input type='submit' value='Submit' className='m-2 bg-zinc-300' />
          </form>
        </div>
      </ReactModal>
    </div>
  )
}
