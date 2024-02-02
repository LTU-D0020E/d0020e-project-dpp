import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { UserIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { QrCodeIcon } from '@heroicons/react/24/outline'

import ReactModal from 'react-modal'
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [activePage, setActivePage] = useState(1)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `/api/v1/users/me`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched user data:', data); // Log the fetched data
        setUserData(data); // Update userData state with the fetched data
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    fetchUser(); // Call the function to fetch user data when the component mounts
  }, []);

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
        <div className='my-10 flex h-[80vh] w-full flex-row rounded-2xl bg-zinc-100 px-5 py-10'>
          <div className='flex w-[300px] flex-col'>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 1 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <UserIcon className='mr-2 mt-[2px] h-5' />
              Account
            </button>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 2 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(2)}
            >
              <Cog6ToothIcon className='mr-2 mt-[2px] h-5' />
              Security
            </button>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 3 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(3)}
            >
              <QrCodeIcon className='mr-2 mt-[2px] h-5' />
              Scanned products
            </button>
            <button
              className={`my-1 flex w-[90%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
                activePage === 4 ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(4)}
            >
              <ClipboardDocumentListIcon className='mr-2 mt-[2px] h-5' />
              Events
            </button>
          </div>
          <div className='border-r-1 h-full border border-zinc-200'></div>
          <div className='mx-20 h-[30vw] w-full'>
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
                         {/* fetch name? */}
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
                        <dt class='mt-[2px] text-sm font-medium leading-6 text-gray-900 sm:col-span-1 sm:mt-0'>
                          Full name
                        </dt>
                        <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                          <div class='text-sm leading-6 text-gray-700'>
                            <input
                              className='w-[200px] rounded-lg p-1'
                              type='text'
                              id='name'
                              value='Aron Gunnar'
                            />
                          </div>
                          <div class='mx-[110px] text-sm leading-6 text-gray-700'>
                            <button
                              type='submit'
                              class='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                            >
                              <PencilIcon class='mr-2 mt-[4px] h-4' />
                              <p class='font-bold'>Edit</p>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt class='mt-[2px] text-sm font-medium leading-6 text-gray-900'>
                          Email address
                        </dt>
                        <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                          <div class='text-sm leading-6 text-gray-700'>
                            <input
                              className='w-[200px] rounded-lg p-1'
                              type='text'
                              id='name'
                              value='argun-9@student.ltu.se'
                            />
                          </div>
                          <div class='mx-[110px] text-sm leading-6 text-gray-700'>
                            <button
                              type='submit'
                              class='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                            >
                              <PencilIcon class='mr-2 mt-[4px] h-4' />
                              <p class='font-bold'>Edit</p>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt class='text-sm font-medium leading-6 text-gray-900'>
                          Password
                        </dt>
                        <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                          <div class='text-sm leading-6 text-gray-700'>
                            <input
                              className='w-[200px] rounded-lg p-1'
                              type='text'
                              id='name'
                              value='**********'
                            />
                          </div>
                          <div class='mx-[110px] text-sm leading-6 text-gray-700'>
                            <button
                              type='submit'
                              class='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                            >
                              <PencilIcon class='mr-2 mt-[4px] h-4' />
                              <p class='font-bold'>Edit</p>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt class='text-sm font-medium leading-6 text-gray-900'>
                          Conpany / Institution
                        </dt>
                        <form className='flex flex-row justify-between sm:col-span-1 sm:mt-0'>
                          <div class='text-sm leading-6 text-gray-700'>
                            <input
                              className='w-[200px] rounded-lg p-1'
                              type='text'
                              id='name'
                              value='Luleå Tekniska Universitet'
                            />
                          </div>
                          <div class='mx-[110px] text-sm leading-6 text-gray-700'>
                            <button
                              type='submit'
                              class='flex cursor-pointer flex-row rounded-xl bg-zinc-200 px-3 py-1 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
                            >
                              <PencilIcon class='mr-2 mt-[4px] h-4' />
                              <p class='font-bold'>Edit</p>
                            </button>
                          </div>
                        </form>
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
                        className='cursor-pointer rounded-xl px-2 py-1 font-bold text-teal-600 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
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
                        className='cursor-pointer rounded-xl px-2 py-1 font-bold text-teal-600 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
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
                        className='cursor-pointer rounded-xl px-2 py-1 font-bold text-teal-600 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
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
                        className='cursor-pointer rounded-xl px-2 py-1 font-bold text-teal-600 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
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
                        className='cursor-pointer rounded-xl px-2 py-1 font-bold text-teal-600 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
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
                        className='cursor-pointer rounded-xl px-2 py-1 font-bold text-teal-600 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-zinc-100'
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
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 2}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 2'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 3}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 3'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 4}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 4'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 5}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 5'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 6}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
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
                    <tr
                      onClick={() => openModal(7)}
                      className='cursor-pointer text-gray-700'
                    >
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr
                      onClick={() => openModal(8)}
                      className='cursor-pointer text-gray-700'
                    >
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr
                      onClick={() => openModal(9)}
                      className='cursor-pointer text-gray-700'
                    >
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr
                      onClick={() => openModal(10)}
                      className='cursor-pointer text-gray-700'
                    >
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr
                      onClick={() => openModal(11)}
                      className='cursor-pointer text-gray-700'
                    >
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                    <tr
                      onClick={() => openModal(12)}
                      className='cursor-pointer text-gray-700'
                    >
                      <td>Battery</td>
                      <td>QWERTY123</td>
                      <td>21/01/2024</td>
                    </tr>
                  </table>
                </div>
                <ReactModal
                  isOpen={activeModal === 7}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 8}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 9}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 10}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 11}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>

                <ReactModal
                  isOpen={activeModal === 12}
                  onRequestClose={closeModal}
                  contentLabel='Create event for item 6'
                  className='flex h-[100%] items-center justify-center'
                >
                  <div className='h-[40%] w-[30%] rounded-xl bg-zinc-200 p-[20px]'>
                    <div className='flex flex-row justify-between font-bold'>
                      <p className=''>
                        Product{' '}
                        <span className='italic text-teal-600'>GET PROD.</span>
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
                      <input
                        type='submit'
                        value='Submit'
                        className='m-2 bg-zinc-300'
                      />
                    </form>
                  </div>
                </ReactModal>
              </div>
            )}
          </div>
        </div>
      </Container>
    </LayoutGlobal>
  )
}
