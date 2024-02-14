"use client";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import 'tailwindcss/tailwind.css';
import Loading from "../components/loading";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Carousel from "../components/caroussel";
import { useSession, signIn, signOut } from "next-auth/react"
import Btn from "../components/btn_auth";


const Main = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession()




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
            {loading && <Loading />} {/* Affichez le composant de chargement lorsque loading est vrai */}
            <div className="bg-primary py-3 px-4 md:px-6 lg:px-8 xl:px-10 h-20">
                <div className="container mx-auto flex items-center justify-between h-12 ml-22">
                    <Btn/>
                    <Link href="/">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Accueil</p>
                    </Link>
                    <Link href="/contact/contact">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Contact</p>
                    </Link>
                    <Link href="/form_travel/form_travel">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Explorer</p>
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/login/login">
                            <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Se connecter</p>
                        </Link>
                        <Link href="/signup/signup">
                            <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">S'inscrire</p>
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

            <Carousel/>

        </>
    );
};

export default Main;
