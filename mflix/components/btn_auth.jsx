import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <Link href="/profil/profil"> {session.user.name}</Link><br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}