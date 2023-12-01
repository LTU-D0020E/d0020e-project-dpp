import { verifyPassword } from '@/utils/server/auth';
import { connectToDatabase } from '@/utils/server/db';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { User } from '@/models/User';
import { signOut } from 'next-auth';

export default NextAuth({
  session: {
    strategy: 'jwt',
    jwt: true,
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email.');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Incorrect password.');
        }

        return user; // Return the user object if email and password are correct
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isAdmin = user.admin;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      session.user.isAdmin = token.isAdmin;
      return session;
    },

    async signOut({ request }) {
      // Perform server-side logout operations here if needed
      // For example, you can invalidate the token on the server if applicable

      // After performing server-side logout, call NextAuth.js signOut to clear the client session
      await signOut({ request });

      // Return to the logout page or redirect to another page
      // For example, redirect to the home page
      return { url: '/' };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/login',
  },
});


