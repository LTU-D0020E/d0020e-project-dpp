import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server' // Import NextResponse

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(req) {
    // If the user is authorized and on the root path, redirect to "/explore"
    if (req.nextauth.token && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`)
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Apply admin authorization logic only to specified paths
        const adminPaths = ['/admin']
        const isOnAdminPath = adminPaths.some(path =>
          req.nextUrl.pathname.startsWith(path)
        )
        return isOnAdminPath ? token?.isAdmin === true : true
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
)

export const config = {
  matcher: ['/admin'],
}
