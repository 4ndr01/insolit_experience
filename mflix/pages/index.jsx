// Import necessary modules and components
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import 'tailwindcss/tailwind.css';
import Loading from "../components/loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Carousel from "../components/caroussel";
import { useSession, signOut } from "next-auth/react" // Removed signIn import, as it's not used
import Btn from "../components/btn_auth";

// Define the Main component
const Main = () => {
    // Initialize necessary hooks and variables
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession(); // Retrieve user session

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
            {loading && <Loading />} {/* Display loading component when loading is true */}
            <div className="bg-primary py-3 px-4 md:px-6 lg:px-8 xl:px-10 h-20">
                <div className="container mx-auto flex items-center justify-between h-12 ml-22">
                    <Link href="/">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Accueil</p>
                    </Link>
                    <Link href="/contact/contact">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Contact</p>
                    </Link>
                    <Link href="/form_travel/form_travel">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Explorer</p>
                    </Link>
                    {session ? (
                        <button
                            onClick={() => signOut({ callbackUrl: "/login_client" })}
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
                            href="/signup"
                            className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                        >
                            Inscription
                        </Link>
                    )}
                </div>
            </div>

            {/* Section de présentation du site de voyage avec un espace ajouté en margin-top */}
            <section className="container mx-auto my-8 px-6 mt-20">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Découvrez notre site de voyage
                </h2>
                <p className="text-lg text-gray-600">
                    Bienvenue sur notre site de voyage, où vous pouvez explorer des destinations exotiques, trouver des
                    offres incroyables et planifier votre prochaine aventure mémorable.
                </p>

                {/* Ajoutez d'autres éléments de la présentation ici */}
            </section>


        </>
    );
};

// Export the Main component as default
export default Main;
