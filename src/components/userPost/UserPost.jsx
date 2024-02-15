import { getUser } from "@/lib/data"
import styles from "./userPost.module.css"
import Image from "next/image"

// const getData = async (id) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {cache: "no-store"})

//     if (!res.ok) {
//         throw new Error("Something went wrong in fetching data")
//     }

//     return res.json()
// }

const UserPost = async ({ userId }) => {
    //const user = await getData(userId)
    const user = await getUser(userId)

    return (
        <div className={styles.container}>
            <Image
                className={styles.avatar}
                src={user.img ? user.img : "/noavatar.png"}
                alt=""
                width={50}
                height={50}
            />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    )
}

export default UserPost
