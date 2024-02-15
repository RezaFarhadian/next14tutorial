"use client"

import { addUser } from "@/lib/action"
import { useFormState } from "react-dom"
import styles from "./adminUserForm.module.css"

const UserPostForm = () => {
    const [state, formAction] = useFormState(addUser, undefined)

    return (
        <form action={formAction} className={styles.container}>
            <h1>Add New User</h1>
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <input type="text" name="img" placeholder="img" />
            <select name="isAdmin">
                <option value="false">Is Admin?</option>
                <option value="false">User</option>
                <option value="true ">Admin</option>
            </select>
            <button>Add</button>
            {state && state.error}
        </form>
    )
}

export default UserPostForm
