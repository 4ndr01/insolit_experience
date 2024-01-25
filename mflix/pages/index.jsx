import Link from "next/link";
import SearchBar from "../components/SearchBar";
import Activity from "../components/activity";
import 'tailwindcss/tailwind.css';
import {Fade} from "@mui/material";

const Main = () => {
    return (
        <>
            <div className="container-fluid py-3 bg-primary px-3 my-6">
                <div className="flex items-center justify-between">
                    <div className="w-full text-gray-600 md:flex md:items-center flex justify-between mb-4">
                        {/* Vos éléments de navigation ou de contenu peuvent être ajoutés ici */}
                        <Link
                            href="/"
                            className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/login/login"
                            className="py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/contact"
                            className="py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/signup/signup"
                            className="py-3 px-6 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
                        >
                            Inscription
                        </Link>
                    </div>

                    {/* Autres éléments du header peuvent être ajoutés ici */}
                </div>
            </div>

            {/* Section de présentation du site de voyage avec un espace ajouté en margin-top */}
            <section className="container mx-auto my-8 px-6 mt-20">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Découvrez notre site de voyage
                </h2>
                <p className="text-lg text-gray-600">
                    Bienvenue sur notre site de voyage, où vous pouvez explorer des destinations exotiques, trouver des offres incroyables et planifier votre prochaine aventure mémorable.
                </p>
                {/* Ajoutez d'autres éléments de la présentation ici */}
            </section>
            <div className="container mx-auto my-8 px-6 mt-20">
            <SearchBar />
            </div>

            <Activity />

        </>
    );
};

export default Main;
