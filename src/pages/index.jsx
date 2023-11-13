import Image from 'next/image'
import { Inter } from 'next/font/google'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <LayoutGlobal></LayoutGlobal>
}
