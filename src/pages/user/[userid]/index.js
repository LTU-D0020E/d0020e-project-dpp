import React, { useState, useEffect } from 'react'
import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { UserIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { QrCodeIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import Account from '@/components/Profile/account'
import Settings from '@/components/Profile/settings'
import Scans from '@/components/Profile/scans'
import Event from '@/components/Profile/event'
import UserHero from '@/components/app/profile/UserHero'
import { FullPageLoader } from '@/components/Global/Loader'

export default function Profile() {
  const router = useRouter()
  const { data: session } = useSession()

  const [user, setUser] = useState(null)
  const {
    data: userResponse,
    error: error,
    status: isValidating,
  } = useSWR(`/api/v1/users/by-id/${router.query.userid}`, {
    onErrorRetry: ({ retryCount }) => {
      if (retryCount >= 1) return window.location.reload()
    },
  })
  useEffect(() => {
    if (userResponse) {
      setUser(userResponse)
    }
  }, [userResponse])

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (session && user) {
      setEditable(session.user._id === user._id)
      console.log('session:', session)
      console.log('user:', user)
    }
  }, [session, user])

  if (user) {
    return (
      <>
        <LayoutGlobal
          title={editable ? 'Your Profile' : `${user.name}'s Profile`}
        >
          <Container>
            <UserHero user={user} editable={editable} />
          </Container>
        </LayoutGlobal>
      </>
    )
  }
  return (
    <>
      <FullPageLoader />
    </>
  )
}

Profile.auth = true
