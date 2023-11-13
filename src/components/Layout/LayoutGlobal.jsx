import Head from 'next/head'
import { Header } from '../Global/NavbarGlobal'

export default function LayoutGlobal({
  className,
  title,
  description = 'Digital Product Passport Project.',
  ...props
}) {
  return (
    <>
      <Head>
        <title>{title ? title + ' | Project D0020E' : 'Project D0020E'}</title>
        <meta name='description' content={description} />
        <meta
          property='og:title'
          content={title ? title + ' | Project D0020E' : 'Project D0020E'}
        />
        <meta property='og:description' content={description} />
      </Head>
      <Header />
      <main>
        <>{props.children}</>
      </main>
    </>
  )
}
