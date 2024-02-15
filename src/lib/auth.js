import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsContainer from "next-auth/providers/credentials"
import { User } from "./models"
import { connectToDb } from "./utils"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

const login = async (credentials) => {
    try {
        connectToDb()
        const user = await User.findOne({
            username: credentials.username
        })

        if (!user) {
            throw new Error('user not found')
        }

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        )

        if (!isPasswordCorrect) {
            throw new Error("wrong credentials")
        }

        return user
    } catch(e) {
        console.log(e)
        throw new Error("failed to login")
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...authConfig, providers: [
    GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsContainer({
        async authorize(credentials) {
            try {
                const user = await login(credentials)
                return user;
            } catch (e) {
                return null
            }
        }
    })
], callbacks: {
    async signIn({ user, account, profile }) {
        if (account.provider === "github") {
            connectToDb()
            try {
                const user = await User.findOne({ email: profile.email })

                if (!user) {
                    const newUser = new User({
                        username: profile.login,
                        email: profile.email,
                        image: profile.avatar_url
                    })

                    await newUser.save()
                }
            } catch(e) {
                console.log(e)
                return false
            }
        }
        return true
    },
    ...authConfig.callbacks
} })
