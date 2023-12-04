import Image from 'next/image'
import { Inter } from 'next/font/google'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <LayoutGlobal>
      <Container>
        <div className='table-container h-[80vh] w-full flex items-center justify-center flex-col'>
          <h2 className='py-[20px] w-[80%] text-2xl'>
            Results from <span className='text-teal-600 italic'>query</span>
          </h2>

          <table>
            <tr>
              <th>Product</th>
              <th>Text</th>
              <th>Text</th>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
          </table>
        </div>
      </Container>
    </LayoutGlobal>
  )
}
