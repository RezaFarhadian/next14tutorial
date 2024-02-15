"use server"

import { connectToDb } from "./utils"
import { Post, User } from "./models"
import { revalidatePath } from "next/cache"
import { signIn, signOut } from "./auth"
import bcrypt from "bcryptjs"

export const addPost = async (prevState, formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData)

    try {
        connectToDb()
        const newPost = new Post({
            title, desc, slug, userId
        })
        await newPost.save()
        console.log("saved to db")
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (e) {
        console.log(e)
        return { err: "something went wrong for connecting to db" }
    }
}

export const addUser = async (prevState, formData) => {
    const { username, email, password, img } = Object.fromEntries(formData)

    try {
        connectToDb()
        const newUser = new User({
            username, email, password, img
        })
        await newUser.save()
        console.log("saved to db")
        revalidatePath("/admin")
    } catch (e) {
        console.log(e)
        return { err: "something went wrong for connecting to db" }
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        await Post.findByIdAndDelete(id)
        console.log("deleted from db")
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (e) {
        console.log(e)
        return { err: "something went wrong for connecting to db" }
    }
}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        await Post.deleteMany({ userId: id })
        await User.findByIdAndDelete(id)
        console.log("deleted from db")
        revalidatePath("/admin")
    } catch (e) {
        console.log(e)
        return { err: "something went wrong for connecting to db" }
    }
}

export const handleGithubLogin = async () => {
    "use server"
    await signIn("github")
}

export const handleLogout = async () => {
    "use server"
    await signOut()
}

export const register = async (previousState, formData) => {
    const {
        username,
        email,
        password,
        passwordRepeat,
        img
    } = Object.fromEntries(formData)

    if (password !== passwordRepeat) {
        return { error: "passwords does not match" }
    }

    try {
        connectToDb()
        const user = await User.findOne({username})
        if (user) {
            return { error: "username already exists" }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        })

        await newUser.save()
        console.log("saved to db")
        return { success: true }
    } catch (e) {
        console.log(e)
        return { error: "something goes wrong" }
    }
}

export const login = async (previousState, formData) => {
    const { username, password } =
        Object.fromEntries(formData)

    try {
        await signIn("credentials", {
            username,
            password
        })
    } catch (e) {
        console.log(e)

        if (e.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password"}
        }

        throw e
    }
}
