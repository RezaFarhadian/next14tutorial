import PostCard from "@/components/postCard/PostCard"
import styles from "./blog.module.css"
import { getPosts } from "@/lib/data"

const getData = async () => {
    const res = await fetch("http://localhost:300/api/blog", {next: { revalidate: 3600 }})

    if (!res.ok) {
        throw new Error("Something went wrong in fetching data")
    }

    return res.json()
}

const BlogPage = async () => {
    const posts = await getData()
    //const posts = await getPosts()

    return (
        <div className={styles.container}>
            {posts.map(post => (
                <div className={styles.post} key={post.id}><PostCard post={post} /></div>
            ))}
        </div>
    )
}

export default BlogPage