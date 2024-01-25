import Link from "next/link";



const City = () => {

    return (
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

        );
    }

    export default City;

