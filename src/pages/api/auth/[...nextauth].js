import { authOptions } from '@/utils/server/auth'
import NextAuth from 'next-auth/next'

export default NextAuth(authOptions)
