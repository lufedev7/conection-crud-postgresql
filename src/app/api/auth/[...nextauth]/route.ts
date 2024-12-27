import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login'
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'test@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log(url)
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        const user = await res.json()
        console.log(user)

        if (user.error) throw user

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})
export { handler as GET, handler as POST }
