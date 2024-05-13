import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Logo from "../public/logo.svg";
import Loading from "../components/loading";

export default function NavComponent() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    // Effect to handle route change events
    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    // Function to toggle mobile menu


    return (
        <>
            {loading && <Loading />}
            <nav className="md:px-6 lg:px-8 xl:px-10">
                <div className="container flex items-center justify-between">
                    <Link href="/">
                        <img src="/logo.svg" alt="logo" className="h-20 w-20 cursor-pointer" />
                    </Link>



                    {/* Main navigation */}
                        <Link href="/contact/contact">
                            <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300 cursor-pointer">Idées de séjour</p>
                        </Link>
                        <Link href="/form_travel/form_travel">
                            <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300 cursor-pointer">Logement</p>
                        </Link>
                        <Link href="/testPanier/test">
                            <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300 cursor-pointer">Activités</p>
                        </Link>
                        <Link href="/panier/panier">
                            <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300 cursor-pointer">Panier</p>
                        </Link>
                        {session ? (
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white cursor-pointer"
                            >
                                Déconnexion
                            </button>
                        ) : (
                            <Link href="/login/login">
                                <p className="py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white cursor-pointer">Connexion</p>
                            </Link>
                        )}
                        {session ? (
                            <Link href="/profil/profil">
                                <p className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp cursor-pointer">Profil</p>
                            </Link>
                        ) : (
                            <Link href="/signup/signup">
                                <p className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp cursor-pointer">Inscription</p>
                            </Link>
                        )}
                    </div>

            </nav>
        </>
    );
}
