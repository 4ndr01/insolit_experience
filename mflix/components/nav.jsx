import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Logo from "../public/logo.svg";
import Loading from "../components/loading";

export default function NavComponent() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession(); // Retrieve user session


    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    // Sticky Navbar
    const [sticky, setSticky] = useState(false);
    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
    });

    // submenu handler
    const [openIndex, setOpenIndex] = useState(-1);
    const handleSubmenu = (index) => {
        if (openIndex === index) {
            setOpenIndex(-1);
        } else {
            setOpenIndex(index);
        }
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
            <nav className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
                sticky
                    ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
                    : "absolute"
            }`}
            >

                <div className="container flex items-center justify-between">
                    <Link href="/">
                        <img src="/logo.svg" alt="logo" className="h-20 w-20 cursor-pointer " />
                    </Link>

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
                            className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block cursor-pointer"
                        >
                            Déconnexion
                        </button>
                    ) : (
                        <Link href="/login/login">
                            <p className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block cursor-pointer">Connexion</p>
                        </Link>
                    )}
                    {session ? (
                        <Link href="/profil/profil">
                            <p className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 cursor-pointer">Profil</p>
                        </Link>
                    ) : (
                        <Link href="/signup/signup">
                            <p className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 cursor-pointer">Inscription</p>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}
