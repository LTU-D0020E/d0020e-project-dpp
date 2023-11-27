import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { AuthLayout } from '@/components/Layout/AuthLayout'
import { AuthForm } from './login'

export default function Login() {
  return (
    <>
      <Head>
        <title>Gå med i DPP D0020E</title>
        <meta property='og:title' content='Gå med i DPP D0020E' />
        <meta
          property='og:description'
          content='En plattform för att enkelt få information om saker'
        />
      </Head>
      <AuthForm />
    </>
  )
}
