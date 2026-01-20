import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/userModels"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Username", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                try {
                    await connectDb()
                    
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required")
                    }
                    
                    const email = credentials.email as string;
                    const password = credentials.password as string
                    const user = await User.findOne({ email })
                    
                    if (!user) {
                        throw new Error("User Do Not exit")
                    }
                    
                    const isMatch = await bcrypt.compare(password, user.password)
                    if (!isMatch) {
                        throw new Error("password Incorrect")
                    }
                    
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                } catch (error) {
                    console.error("Authorization error:", error)
                    throw error
                }
            },
        }),
    ],
    callbacks: {
        // token k ander user ka data dalta hai
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.role = user.role
            }
            return token
        },

        // ab token sai session mai data  daalna hai 
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
        signOut: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60 * 1000
    },
    secret: process.env.AUTH_SECRET
})