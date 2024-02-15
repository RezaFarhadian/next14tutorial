//import dynamic from "next/dynamic"
//import HydrationTest from "@/components/hydrationTest"
import styles from "./contact.module.css"
import Image from "next/image"
//const HydrationTestNoSSR = dynamic(() => import("@/components/hydrationTest"), { ssr: false })

export const metadata = {
    title: 'Contact',
    description: 'Contact description',
  }

const ContactPage = () => {
    //const a = Math.random()
    //console.log(a)
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src="/contact.png" alt="" fill className={styles.img} />
            </div>
            <div className={styles.formContainer}>
                {/* <HydrationTestNoSSR /> */}
                {/* <div suppressHydrationWarning>
                    {a}
                </div> */}
                <form action="" className={styles.form}>
                    <input type="text" placeholder="Name and surname" />
                    <input type="text" placeholder="Email Address" />
                    <input type="text" placeholder="Phone Number (optional)" />
                    <textarea cols="30" row="10" placeholder="Message"></textarea>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ContactPage
