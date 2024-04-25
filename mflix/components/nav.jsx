import Link from "next/link";
import 'tailwindcss/tailwind.css';
import Loading from "../components/loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Logo from "../public/logo.svg";

export default function NavComponent() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession(); // Retrieve user session
    const [isOpen, setIsOpen] = useState(false);
    console.log("Session:", session);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
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



    return (
        <>
            {loading && <Loading />}
            <div className="py-3 px-4 md:px-6 lg:px-8 xl:px-10 h-20">
                <div className="container mx-auto flex items-center justify-between h-12 ml-22">
                    <Link href={"/"}>
                        <img src="/logo.svg" alt="logo" className="h-20 w-20 cursor-pointer" /> {/* Utilisation du logo importé */}
                    </Link>

                    <Link href="/contact/contact">
                        <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300">Idées de séjour</p>
                    </Link>
                    <Link href="/form_travel/form_travel">
                        <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300">Logement</p>
                    </Link>
                    <Link href="/contact/contact">
                        <p className="text-blacktext-lg font-bold hover:opacity-80 transition duration-300">Activités</p>
                    </Link>
                    {session ? (
                        <button
                            onClick={() => signOut({callbackUrl: "/"})}
                            className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
                        >
                            Déconnexion
                        </button>
                    ) : (
                        <Link
                            href="/login/login"
                            className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
                        >
                            Connexion
                        </Link>
                    )}
                    {session ? (
                        <Link
                            href="/profil/profil"
                            className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                        >
                            Profil
                        </Link>
                    ) : (
                        <Link
                            href="/signup/signup"
                            className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                        >
                            Inscription
                        </Link>
                    )}
                </div>
            </div>
        </>

    );
};