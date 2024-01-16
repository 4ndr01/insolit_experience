import Link from "next/link";
import Body from "./components/body/body";

const Main = () => {
    return (
<>
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
                        <Link
                            href="/login/login"
                            className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"

                        >
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
                <section className="min-h-screen flex items-center justify-center">
                    <Body />
                </section>
            </div>


</>


        //corp de la page
    );
};

export default Main;
