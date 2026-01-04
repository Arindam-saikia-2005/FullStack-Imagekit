import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DbConnect } from "./db";
import User from "@/models/user";
import bcrypt from "bcrypt";


const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

  if(!NEXTAUTH_SECRET) {
        throw new Error("Please put a secret in your env file")
   }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "example@...." },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email and password")
                }

                try {
                    await DbConnect()
                    const user = await User.findOne({ email: credentials.email })

                    if (!user) {
                        throw new Error("no user found with this email")
                    }
                    const isMatch = await bcrypt.compare(credentials.password, user.password)

                    if (!isMatch) {
                        throw new Error("Invalid password and email")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }

                } catch (error: any) {
                    console.error("Error while logging through NextAuth", error.message)
                    throw error.message
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token;
        },
       async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session
        },
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    
    secret:NEXTAUTH_SECRET
}