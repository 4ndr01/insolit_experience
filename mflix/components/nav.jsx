import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import menuData from "./menuData";

export default function NavComponent() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const isAdmin = session?.user?.role === "administrateur";
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

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <>
            <nav
                className={`md:px-6 lg:px-8 xl:px-10 transition-all duration-300 h-35`}
                >
                <div className="container flex items-center justify-between">
                    <Link href="/">
                        <img src="/Logo2.svg" alt="logo" className="h-20 w-20 cursor-pointer"/>
                    </Link>

                    <ul className="block lg:flex lg:space-x-12">
                        {menuData.map((menuItem, index) => (
                            <li key={menuItem.id} className="group relative">
                                {menuItem.path ? (
                                    menuItem.title === "Gestion" && isAdmin ? (
                                        <Link
                                            href={menuItem.path}
                                            className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                                        >
                                            {menuItem.title}
                                        </Link>
                                    ) : menuItem.title !== "Gestion" ? (
                                        <Link
                                            href={menuItem.path}
                                            className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                                        >
                                            {menuItem.title}
                                        </Link>
                                    ) : null
                                ) : (
                                    <>
                                        <a
                                            onClick={() => handleSubmenu(index)}
                                            className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                                        >
                                            {menuItem.title}
                                            <span className="pl-3">
                              <svg width="15" height="14" viewBox="0 0 15 14">
                                <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                />
                              </svg>
                            </span>
                                        </a>
                                        <div
                                            className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                                openIndex === index ? "block" : "hidden"
                                            }`}
                                        >
                                            {menuItem.submenu.map((submenuItem) => (
                                                <Link
                                                    href={submenuItem.path}
                                                    key={submenuItem.id}
                                                    className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
                                                >
                                                    {submenuItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>


                    {/* Main navigation */}
                    <Link href="/idea/idea">
                        <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300 cursor-pointer">Idées
                            de séjour</p>
                    </Link>
                    <Link href="/logement/logement">
                        <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300 cursor-pointer">Logement</p>
                    </Link>
                    <Link href="/activity/activity">
                        <p className="text-black text-lg font-bold hover:opacity-80 transition duration-300 cursor-pointer">Activités</p>
                    </Link>
                    <Link href="/panier/panier">
                        <img src={"/Vector.svg"} alt="panier" className="h-8 w-8 cursor-pointer"/>
                    </Link>
                    {session ? (
                        <button
                            onClick={() => signOut({callbackUrl: "/"})}
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
