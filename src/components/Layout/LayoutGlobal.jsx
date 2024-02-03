import Head from 'next/head'
import { NavbarGlobal } from '../Global/NavbarGlobal'

export default function LayoutGlobal({
  className,
  title,
  description = 'Digital Product Passport Project.',
  searchBar = true,
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
      <NavbarGlobal searchBar={searchBar} />
      <main>
        <>{props.children}</>
      </main>
    </>
  )
}
