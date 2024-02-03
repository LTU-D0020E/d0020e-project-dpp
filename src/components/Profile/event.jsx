export default function Event({ user }) {
  return (
    <div className=''>
      <div className='px-4 sm:px-0'>
        <h3 className='text-base text-xl font-semibold leading-7 text-teal-600'>
          Events
        </h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
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

      <ReactModal
        isOpen={activeModal === 8}
        onRequestClose={closeModal}
        contentLabel='Create event for item 6'
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

      <ReactModal
        isOpen={activeModal === 9}
        onRequestClose={closeModal}
        contentLabel='Create event for item 6'
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

      <ReactModal
        isOpen={activeModal === 10}
        onRequestClose={closeModal}
        contentLabel='Create event for item 6'
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

      <ReactModal
        isOpen={activeModal === 11}
        onRequestClose={closeModal}
        contentLabel='Create event for item 6'
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

      <ReactModal
        isOpen={activeModal === 12}
        onRequestClose={closeModal}
        contentLabel='Create event for item 6'
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
