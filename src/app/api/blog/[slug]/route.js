import { Post } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const { slug } = params
    try {
        connectToDb()
        const post = await Post.findOne({ slug });
        return NextResponse.json(post)
    } catch (e) {
        throw new Error(e)
    }
}

export const DELETE = async (request, {params}) => {
    const { slug } = params
    try {
        connectToDb()
        await Post.deleteOne({ slug });
        return NextResponse.json("Post deleted")
    } catch (e) {
        throw new Error(e)
    }
}
