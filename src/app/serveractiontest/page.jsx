const { addPost, deletePost } = require("@/lib/action")

const ServerActionTestPage = () => {
    // const actionInComponent = async () => {
    //     "use server"
    //     console.log("it works")
    // }

    return (
        <div>
            <form action={addPost}>
                <input type="text" placeholder="Title" name="title" />
                <input type="text" placeholder="Desc" name="desc" />
                <input type="text" placeholder="Slug" name="slug" />
                <input type="text" placeholder="User ID" name="userId" />
                <button>Create</button>
            </form>

            <form action={deletePost}>
                <input type="text" name="id" placeholder="ID" />
                <button>Delete</button>
            </form>
        </div>
    )
}

export default ServerActionTestPage
