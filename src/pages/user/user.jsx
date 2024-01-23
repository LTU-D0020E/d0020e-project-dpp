import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { UserIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { QrCodeIcon } from '@heroicons/react/24/outline'

import ReactModal from 'react-modal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {}, [])

  const handleButtonClick = pageNumber => {
    setActivePage(pageNumber)
  }

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
  }

  return (
    <LayoutGlobal>
      <Container>
        <div className='flex flex-row h-[80vh] w-full bg-zinc-100 rounded-2xl my-10 px-5 py-10'>
          <div className='flex flex-col w-[300px]'>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 1 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <UserIcon className='h-5 mt-[2px] mr-2' />
              Account
            </button>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 2 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(2)}
            >
              <Cog6ToothIcon className='h-5 mt-[2px] mr-2' />
              Security
            </button>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 3 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(3)}
            >
              <QrCodeIcon className='h-5 mt-[2px] mr-2' />
              Scanned products
            </button>
            <button
              className={`flex flex-row text-left w-[90%] p-2 my-1 rounded-md font-bold text-zinc-600 transition duration-200 ${
                activePage === 4 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(4)}
            >
              <ClipboardDocumentListIcon className='h-5 mt-[2px] mr-2' />
              Events
            </button>
          </div>
          <div className='h-full border border-r-1 border-zinc-200'></div>
          <div className='h-[30vw] w-full mx-20'>
            {activePage === 1 && (
              <div>
                <div class='px-4 sm:px-0'>
                  <h3 class='text-base text-xl font-semibold leading-7 text-teal-600'>
                    Account
                  </h3>
                  <p class='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                    Personal details
                  </p>
                </div>
                <div class='mt-6 border-t border-gray-100'>
                  <dl class='divide-y divide-gray-100'>
                    <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt class='text-sm font-medium leading-6 text-gray-900'>
                        Full name
                      </dt>
                      <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        Aron Gunnar
                      </dd>
                    </div>
                    <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt class='text-sm font-medium leading-6 text-gray-900'>
                        Role
                      </dt>
                      <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        Admin
                      </dd>
                    </div>
                    <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt class='text-sm font-medium leading-6 text-gray-900'>
                        Email address
                      </dt>
                      <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        a*******@student.ltu.se
                      </dd>
                    </div>
                    <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt class='text-sm font-medium leading-6 text-gray-900'>
                        Company / Institution
                      </dt>
                      <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        Luleå Tekniska Universitet
                      </dd>
                    </div>
                    <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt class='text-sm font-medium leading-6 text-gray-900'>
                        About
                      </dt>
                      <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
            {activePage === 2 && (
              <div className=''>
                <div>
                  <div class='px-4 sm:px-0'>
                    <h3 class='text-base text-xl font-semibold leading-7 text-teal-600'>
                      Security
                    </h3>
                    <p class='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                      Edit information
                    </p>
                  </div>
                  <div class='mt-6 border-t border-gray-100'>
                    <dl class='divide-y divide-gray-100'>
                      <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt class='text-sm font-medium leading-6 text-gray-900'>
                          Full name
                        </dt>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          Aron Gunnar
                        </dd>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          <button className='px-3 py-1 bg-zinc-200 rounded-xl flex flex-row hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'>
                            <PencilIcon className='h-4 mt-[4px] mr-2' />
                            <p className='font-bold'>Edit</p>
                          </button>
                        </dd>
                      </div>
                      <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt class='text-sm font-medium leading-6 text-gray-900'>
                          Email address
                        </dt>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          arogun-9@student.ltu.se
                        </dd>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          <button className='px-3 py-1 bg-zinc-200 rounded-xl flex flex-row hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'>
                            <PencilIcon className='h-4 mt-[4px] mr-2' />
                            <p className='font-bold'>Edit</p>
                          </button>
                        </dd>
                      </div>
                      <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt class='text-sm font-medium leading-6 text-gray-900'>
                          Password
                        </dt>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          *********
                        </dd>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          <button className='px-3 py-1 bg-zinc-200 rounded-xl flex flex-row hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'>
                            <PencilIcon className='h-4 mt-[4px] mr-2' />
                            <p className='font-bold'>Edit</p>
                          </button>
                        </dd>
                      </div>
                      <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt class='text-sm font-medium leading-6 text-gray-900'>
                          Conpany / Institution
                        </dt>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          Luleå Tekniska Universitet
                        </dd>
                        <dd class='mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0'>
                          <button className='px-3 py-1 bg-zinc-200 rounded-xl flex flex-row hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'>
                            <PencilIcon className='h-4 mt-[4px] mr-2' />
                            <p className='font-bold'>Edit</p>
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}
            {activePage === 3 && (
              <div className=''>
                <div class='px-4 sm:px-0'>
                  <h3 class='text-base text-xl font-semibold leading-7 text-teal-600'>
                    Scanned products
                  </h3>
                  <p class='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                    View or create event
                  </p>
                </div>
                <table className='my-8'>
                  <tr className='text-gray-700'>
                    <th className=''>Product</th>
                    <th>Product ID</th>
                    <th>Date Scanned</th>
                    <th></th>
                  </tr>
                  <tr className='text-gray-700'>
                    <td>Battery</td>
                    <td>QWERTY123</td>
                    <td>21/01/2024</td>
                    <td>
                      <button
                        onClick={() => openModal(1)}
                        className='font-bold text-teal-600 px-2 py-1 rounded-xl hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'
                      >
                        Create event
                      </button>
                    </td>
                  </tr>
                  <tr className='text-gray-700'>
                    <td>Battery</td>
                    <td>QWERTY123</td>
                    <td>21/01/2024</td>
                    <td>
                      <button
                        onClick={() => openModal(2)}
                        className='font-bold text-teal-600 px-2 py-1 rounded-xl hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'
                      >
                        Create event
                      </button>
                    </td>
                  </tr>
                  <tr className='text-gray-700'>
                    <td>Battery</td>
                    <td>QWERTY123</td>
                    <td>21/01/2024</td>
                    <td>
                      <button
                        onClick={() => openModal(3)}
                        className='font-bold text-teal-600 px-2 py-1 rounded-xl hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'
                      >
                        Create event
                      </button>
                    </td>
                  </tr>
                  <tr className='text-gray-700'>
                    <td>Battery</td>
                    <td>QWERTY123</td>
                    <td>21/01/2024</td>
                    <td>
                      <button
                        onClick={() => openModal(4)}
                        className='font-bold text-teal-600 px-2 py-1 rounded-xl hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'
                      >
                        Create event
                      </button>
                    </td>
                  </tr>
                  <tr className='text-gray-700'>
                    <td>Battery</td>
                    <td>QWERTY123</td>
                    <td>21/01/2024</td>
                    <td>
                      <button
                        onClick={() => openModal(5)}
                        className='font-bold text-teal-600 px-2 py-1 rounded-xl hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'
                      >
                        Create event
                      </button>
                    </td>
                  </tr>
                  <tr className='text-gray-700'>
                    <td>Battery</td>
                    <td>QWERTY123</td>
                    <td>21/01/2024</td>
                    <td>
                      <button
                        onClick={() => openModal(6)}
                        className='font-bold text-teal-600 px-2 py-1 rounded-xl hover:bg-teal-600 hover:text-zinc-100 transition duration-300 ease-in-out cursor-pointer'
                      >
                        Create event
                      </button>
                    </td>
                  </tr>
                </table>
                <ReactModal
                  isOpen={activeModal === 1}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 1'
                  className='h-[100%] flex justify-center items-center'
                >
                  <div className='bg-zinc-200 w-[30%] h-[40%] p-[20px] rounded-xl'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
                      </p>
                      <button
                        onClick={closeModal}
                        className='bg-zinc-300 px-[10px] py-[2px] rounded-md hover:bg-zinc-100 transition duration-200 ease-in-out'
                      >
                        X
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className='h-[80%] flex flex-col justify-center items-center'
                    >
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='fname'>First name:</label>
                        <input type='text' id='fname' name='fname' />
                      </div>
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='lname'>Last name:</label>
                        <input type='text' id='lname' name='lname' />
                      </div>
                      <input
                        type='submit'
                        value='Submit'
                        className='bg-zinc-300 m-2'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 2}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 2'
                  className='h-[100%] flex justify-center items-center'
                >
                  <div className='bg-zinc-200 w-[30%] h-[40%] p-[20px] rounded-xl'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
                      </p>
                      <button
                        onClick={closeModal}
                        className='bg-zinc-300 px-[10px] py-[2px] rounded-md hover:bg-zinc-100 transition duration-200 ease-in-out'
                      >
                        X
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className='h-[80%] flex flex-col justify-center items-center'
                    >
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='fname'>First name:</label>
                        <input type='text' id='fname' name='fname' />
                      </div>
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='lname'>Last name:</label>
                        <input type='text' id='lname' name='lname' />
                      </div>
                      <input
                        type='submit'
                        value='Submit'
                        className='bg-zinc-300 m-2'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 3}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 3'
                  className='h-[100%] flex justify-center items-center'
                >
                  <div className='bg-zinc-200 w-[30%] h-[40%] p-[20px] rounded-xl'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
                      </p>
                      <button
                        onClick={closeModal}
                        className='bg-zinc-300 px-[10px] py-[2px] rounded-md hover:bg-zinc-100 transition duration-200 ease-in-out'
                      >
                        X
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className='h-[80%] flex flex-col justify-center items-center'
                    >
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='fname'>First name:</label>
                        <input type='text' id='fname' name='fname' />
                      </div>
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='lname'>Last name:</label>
                        <input type='text' id='lname' name='lname' />
                      </div>
                      <input
                        type='submit'
                        value='Submit'
                        className='bg-zinc-300 m-2'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 4}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 4'
                  className='h-[100%] flex justify-center items-center'
                >
                  <div className='bg-zinc-200 w-[30%] h-[40%] p-[20px] rounded-xl'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
                      </p>
                      <button
                        onClick={closeModal}
                        className='bg-zinc-300 px-[10px] py-[2px] rounded-md hover:bg-zinc-100 transition duration-200 ease-in-out'
                      >
                        X
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className='h-[80%] flex flex-col justify-center items-center'
                    >
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='fname'>First name:</label>
                        <input type='text' id='fname' name='fname' />
                      </div>
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='lname'>Last name:</label>
                        <input type='text' id='lname' name='lname' />
                      </div>
                      <input
                        type='submit'
                        value='Submit'
                        className='bg-zinc-300 m-2'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 5}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 5'
                  className='h-[100%] flex justify-center items-center'
                >
                  <div className='bg-zinc-200 w-[30%] h-[40%] p-[20px] rounded-xl'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
                      </p>
                      <button
                        onClick={closeModal}
                        className='bg-zinc-300 px-[10px] py-[2px] rounded-md hover:bg-zinc-100 transition duration-200 ease-in-out'
                      >
                        X
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className='h-[80%] flex flex-col justify-center items-center'
                    >
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='fname'>First name:</label>
                        <input type='text' id='fname' name='fname' />
                      </div>
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='lname'>Last name:</label>
                        <input type='text' id='lname' name='lname' />
                      </div>
                      <input
                        type='submit'
                        value='Submit'
                        className='bg-zinc-300 m-2'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 6}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='h-[100%] flex justify-center items-center'
                >
                  <div className='bg-zinc-200 w-[30%] h-[40%] p-[20px] rounded-xl'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
                      </p>
                      <button
                        onClick={closeModal}
                        className='bg-zinc-300 px-[10px] py-[2px] rounded-md hover:bg-zinc-100 transition duration-200 ease-in-out'
                      >
                        X
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className='h-[80%] flex flex-col justify-center items-center'
                    >
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='fname'>First name:</label>
                        <input type='text' id='fname' name='fname' />
                      </div>
                      <div className='w-[70%] flex justify-between m-2'>
                        <label for='lname'>Last name:</label>
                        <input type='text' id='lname' name='lname' />
                      </div>
                      <input
                        type='submit'
                        value='Submit'
                        className='bg-zinc-300 m-2'
                      />
                    </form>
                  </div>
                </ReactModal>
              </div>
            )}
            {activePage === 4 && (
              <div className=''>
                <div class='px-4 sm:px-0'>
                  <h3 class='text-base text-xl font-semibold leading-7 text-teal-600'>
                    Events
                  </h3>
                  <p class='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                    Inspect event status
                  </p>
                </div>
                <div className=''>
                  <table className='my-8'>
                    <tr className='text-gray-700'>
                      <th className=''>Product</th>
                      <th>Product ID</th>
                      <th>Date Scanned</th>
                    </tr>
                    <tr className='text-gray-700'>
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr className='text-gray-700'>
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr className='text-gray-700'>
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr className='text-gray-700'>
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr className='text-gray-700'>
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr className='text-gray-700'>
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </LayoutGlobal>
  )
}
