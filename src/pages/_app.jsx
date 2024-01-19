import { FullPageLoader } from '@/components/Global/Loader'
import '@/styles/globals.css'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { SWRConfig } from 'swr'
import NextProgress from 'next-progress'
import { projectThemeColor } from '@/utils/client/constants'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider
        session={session}
        refetchInterval={1500}
        refetchOnWindowFocus={true}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then(res => {
                if (!res.ok) {
                  throw new Error('Network response not ok.')
                }
                return res.json()
              }),
            onError: (error, key) => {
              console.error(error)
            },
          }}
        >
          {!Component.noProgressBar && (
            <NextProgress
              color={projectThemeColor}
              height={2}
              stopDelayMs={200}
              options={{ showSpinner: false }}
            />
          )}
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <>
              <Component {...pageProps} />
            </>
          )}
        </SWRConfig>
      </SessionProvider>
    </>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })
  if (status === 'loading') {
    return <FullPageLoader />
  }
  return children
}
