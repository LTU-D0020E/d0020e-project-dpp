import User from '@/models/User'
import { verifyPassword } from '@/utils/server/auth'
import { connectToDatabase } from '@/utils/server/db'
import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'

export default NextAuth({
  session: {
    strategy: 'jwt',
    jwt: true,
    // fix expiry / refresh, currently some random date in 1970...
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        await connectToDatabase()

        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          throw new Error('No user found with this email.')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          throw new Error('Incorrect password.')
        }

        return user // Return the user object if email and password are correct
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.isAdmin = user.admin // Assuming 'admin' is a boolean field in your user model
      }
      return token
    },

    async session({ session, token }) {
      session.user.role = token.role
      session.user.isAdmin = token.isAdmin
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/login', // Error code passed in query string as ?error=
  },
})
