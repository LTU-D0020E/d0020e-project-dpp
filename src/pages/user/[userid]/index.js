import React, { useState, useEffect } from 'react'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { UserIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { QrCodeIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Account from '@/components/Profile/account'
import Settings from '@/components/Profile/settings'
import Scans from '@/components/Profile/scans'
import Event from '@/components/Profile/event'

export default function Profile() {
  const { data: session } = useSession()
  const [user, setUser] = useState(null)
  const router = useRouter()

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (session && user) {
      setEditable(session.user.id === user.id)
    }
  }, [session, user])

  return <>dasda</>
}
