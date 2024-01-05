import Link from 'next/link';

const Main = () => {
    return (
        <header className="bg-white dark:bg-dark">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="hidden w-full text-gray-600 md:flex md:items-center">
                        {/* Vos éléments de navigation ou de contenu peuvent être ajoutés ici */}
                        <Link
                            href="/Accueil"
                            className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                            target="_blank"
                        >
                            Accueil

                        </Link>
                        <Link href="/login">
                            Connexion
                        </Link>
                        <Link href="/contact">
                            Contact
                        </Link>
                        <Link href="/signup/signup">
                            Inscription
                        </Link>
                    </div>

                    {/* Autres éléments du header peuvent être ajoutés ici */}
                </div>
            </div>
        </header>
    );
};

export default Main;
