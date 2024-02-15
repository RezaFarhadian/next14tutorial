import Image from "next/image"
import styles from "./singlePost.module.css"
import UserPost from "@/components/userPost/UserPost"
import { Suspense } from "react"
import { getPost } from "@/lib/data"

// const getData = async (slug) => {
//     const res = await fetch(`http://localhost:300/api/blog/${slug}`, {method: "DELETE"})

//     if (!res.ok) {
//         throw new Error("Something went wrong in fetching data")
//     }

//     return res.json()
// }

export const generateMetadata = async ({ params }) => {
    const { slug } = params

    const post = await getPost(slug)

    return {
        title: post.title,
        description: post.desc
    }
}

const SinglePostPage = async ({ params }) => {
    const {slug} = params

    //const post = await getData(slug)
    const post = await getPost(slug)

    return (
        <div className={styles.container}>
            {post.img &&
                <div className={styles.imgContainer}>
                    <Image src={post.img} fill alt="" className={styles.img} />
                </div>
            }
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post?.title}</h1>
                <div className={styles.detail}>
                    { post &&
                        <Suspense fallback={<div>Loading...</div>}>
                            <UserPost userId={post.userId} />
                        </Suspense>
                    }
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{post.createdAt.toString().slice(0, 16)}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post.desc}
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage
