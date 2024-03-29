import { hash, compare, genSalt } from 'bcrypt'
import { connectToDatabase } from '@/utils/server/db'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'

export async function hashPassword(plaintextPassword) {
  const saltRounds = 10 // Cost factor
  const hashedPassword = await new Promise((resolve, reject) => {
    genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err)
      }
      hash(plaintextPassword, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
  })
  return hashedPassword
}

export async function verifyPassword(plaintextPassword, hashedPassword) {
  const isValid = await new Promise((resolve, reject) => {
    compare(plaintextPassword, hashedPassword, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
  return isValid
}

export const authOptions = {
  session: {
    strategy: 'jwt',
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
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
        } catch (err) {
          console.log(err)
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id
        token.role = user.role
        token.isAdmin = user.admin
      }
      return token
    },

    async session({ session, token }) {
      session.user._id = token._id
      session.user.role = token.role
      session.user.isAdmin = token.isAdmin
      return session
    },

    async signOut({ request }) {
      // Perform server-side logout operations here if needed
      // For example, you can invalidate the token on the server if applicable

      // After performing server-side logout, call NextAuth.js signOut to clear the client session
      await signOut({ request })

      // Return to the logout page or redirect to another page
      // For example, redirect to the home page
      return { url: '/' }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signup',
    signOut: '/',
    error: '/signup',
  },
}
