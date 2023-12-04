import Head from 'next/head'

export function AuthLayout({
  title,
  subtitle,
  children,
  smallTitle,
  parentClassName,
  header = true,
  fwClassName = 'flex overflow-hidden bg-white pt-10 sm:py-12',
}) {
  return (
    <>
      <Head>
        <meta property='og:image' content={'https://hektar.se/og.jpg'} />
      </Head>

      <main className={fwClassName} style={{ minHeight: '100vh' }}>
        <div className='mx-auto flex w-full max-w-2xl flex-col px-4  sm:px-6'>
          {header && (
            <>
              <div className='relative mx-auto mt-8 flex max-w-md flex-col items-center'>
                {!smallTitle ? (
                  <h1 className='text-center text-2xl font-semibold tracking-tight text-gray-900'>
                    {title}
                  </h1>
                ) : (
                  <h1 className='text-center text-2xl font-semibold tracking-tight text-gray-900'>
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className='mt-3 max-w-xs text-center font-medium text-gray-600'>
                    {subtitle}
                  </p>
                )}
              </div>
            </>
          )}

          <div
            className={`mx-auto mt-10 w-full  ${
              parentClassName ? parentClassName : 'md:max-w-sm'
            }`}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
