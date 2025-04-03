import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.email }})

                if(!user || !user.password) return null

                const isValid = await compare(credentials.password, user.password)
                if(!isValid) return null
                
                return { email: user.email, id: user.id, name: user.name }  
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 1000 * 60 * 60 * 2
    },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        // Setting the user id to session id from the token
        session: ({ session, token }) => {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
            },
          };
        },
        // Setting the id to JWT from the user object
        jwt: ({ token, user }) => {
          if (user) {
            return {
              ...token,
              id: user.id,
            };
          }
          return token;
        },
      },
}

export default authOptions
