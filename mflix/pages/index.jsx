import Link from "next/link";
import SearchBar from "../components/SearchBar";
import Activity from "../components/activity";
import 'tailwindcss/tailwind.css';
import {Fade} from "@mui/material";

const Main = () => {
    return (
        <>
            <div className="bg-primary py-3 px-4 md:px-6 lg:px-8 xl:px-10">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Accueil</p>
                    </Link>
                    <Link href="/contact/contact">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Contact</p>
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/login/login">
                            <p className="text-dark font-bold hover:opacity-80 transition duration-300 mr-3">Connexion</p>
                        </Link>

                        <Link href="/signup/signup">
                            <p className="text-dark font-bold hover:opacity-80 transition duration-300">Inscription</p>
                        </Link>
                    </div>
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
            <div className="container mx-auto my-8 px-6 mt-20">
                <SearchBar/>
            </div>

            <Activity/>

        </>


    );
};

export default Main;
