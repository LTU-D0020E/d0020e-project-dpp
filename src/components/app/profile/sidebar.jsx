import Link from 'next/link'
import {
  Cog6ToothIcon,
  QrCodeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export function ProfileNavigation({ selectedSection, handleSectionChange }) {
  const router = useRouter()

  const navigation = [
    {
      name: 'Account',
      href: '/app/settings/account',
      icon: UserIcon,
    },
    {
      name: 'Settings',
      href: '/app/settings/security',
      icon: Cog6ToothIcon,
    },
    {
      name: 'Scanned products',
      href: '/app/settings/scans',
      icon: QrCodeIcon,
    },
  ]

  return (
    <div className='flex w-[230px] flex-col border-r'>
      {navigation.map((item, index) => (
        <Link key={index} href={item.href} className='my-2 w-[80%]'>
          <button
            className={`my-1 mr-[150px] flex w-[100%] flex-row rounded-md p-2 text-left font-bold text-zinc-600 transition duration-200 ${
              router.pathname === item.href ? 'active' : ''
            }`}
          >
            <item.icon className='mr-2 mt-[2px] h-5' />
            {item.name}
          </button>
        </Link>
      ))}
    </div>
  )
}
