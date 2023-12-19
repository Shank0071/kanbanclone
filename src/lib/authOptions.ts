import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "prisma/db"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize (credentials, req) {
          if (!credentials?.email || !credentials.password) {
            return null
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })
  
          if (!user) {
            return null
          }
  
          const isPasswordValid = await compare(credentials.password, user.password)
  
          if (!isPasswordValid) {
            return null
          }
  
          return {
            id: user.id+"",
            email: user.email,
            name: user.name,
            randomKey: "Hey Cool"
          }
        }
      })
    ],
    callbacks: {
      session: ({ session, token }: any) => {
        console.log("Session Callback", {session, token})
        return {
          ...session, 
          user: {
            ...session.user,
            id: token.id,
            randomKey: token.randomKey
          }
        }
      },
      jwt: ({ token, user }: any) => {
        // console.log("JWT Callback", {token, user})
        if (user) {
          const u = user
          return {
            ...token,
            id: u.id,
            randomKey: u.randomKey
          }
        }
        return token
      },
      async signIn() {
        return true
      },
      async redirect({url, baseUrl}: any) {
        return baseUrl
      }
    },
    session: { strategy: "jwt" },
    // pages: {
    //   signIn: "/signIn"
    // }
  }
