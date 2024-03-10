import { useSession } from 'next-auth/react'
import { UserHeroLayout, UserProfileCardLayout } from './Layout'
import { UserHeader } from './UserHeader'
import { UserVerifications } from './UserVerifications'
import { UserAffiliation } from './UserAffiliation'
import { Additionals } from './Additionals'

export default function UserHero({ user, editable }) {
  const { data: session } = useSession()
  return (
    <UserHeroLayout editable={editable}>
      <div className='col-span-3 mx-auto block w-full max-w-lg pb-40 lg:block'>
        <div className='grid gap-8 pt-3 lg:sticky lg:top-28 lg:pt-0'>
          <UserProfileCardLayout editable={editable} user={user}>
            <UserHeader user={user} editable={editable} session={session} />
            <UserAffiliation user={user} editable={editable} />
          </UserProfileCardLayout>
          <UserVerifications user={user} editable={editable} />
        </div>
      </div>
      {editable && <Additionals user={user} session={session} />}
    </UserHeroLayout>
  )
}
