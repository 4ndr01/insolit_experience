import { useRouter } from 'next/router';
import { useState } from 'react';
import Voyages from '../../components/voyages/list';
import NavComponent from '../../components/nav';
import MontageForm from '../../components/form_travel/form_travel';
import Footer from '../../components/footer';


const VoyageDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [panier, setPanier] = useState([]);

    // Trouver le voyage correspondant à l'ID dans le tableau Voyages
    const voyage = Voyages.find((voyage) => String(voyage.id) === id);

    if (!voyage) {
        return <p>Voyage non trouvé</p>;
    }

    const addToPanier = (voyage) => {
        // Ajouter le voyage au panier
        setPanier([...panier, voyage]);

        // Naviguer vers la page du panier avec les voyages actuels dans le panier
        router.push({
            pathname: '/panier/panier',
            query: { panier: JSON.stringify([...panier, voyage]) },
        });
    };

    return (
        <>
            <NavComponent />
            <div className="bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 min-h-screen px-4 py-8 md:py-16"
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <div className="flex items-center justify-center min-h-screen  ">
                    <div className="max-w-3xl w-200 bg-white p-6 w-260 rounded-lg ">

                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                                <img
                                    src={voyage.image}
                                    alt={voyage.name}
                                    className=" object-cover"
                                    style={{height: '400px'}}
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:ml-4 mt-4 md:mt-0">
                                <img
                                    src={voyage.image2 ? voyage.image2 : voyage.image}
                                    alt={voyage.name}
                                    className="object-cover"
                                    style={{height: '400px'}}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 mr">
                            <div className="container">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{voyage.name}</h1>
                                <p className="text-lg text-gray-700 mt-2">Lieu : {voyage.location}</p>
                                <p className="text-gray-800 mt-4">{voyage.content}</p>
                                <div className="flex items-center mt-4">
                                    <img src="/Frame85.svg" alt="nuage" className="w-9 h-9"/> <p
                                    className="text-lg text-gray-700 ml-2">Prix : {voyage.repas}</p>
                                    <img src="/salleDebain.svg" alt="nuage" className="w-9 h-9 ml-4"/> <p
                                    className="text-lg text-gray-700 ml-2">Salle de bain: {voyage.nbSalleDeBain}</p>
                                    <img src="/euros.svg" alt="nuage" className="w-9 h-9 ml-4"/> <p
                                    className="text-lg text-gray-700 ml-2">Prix : {voyage.price} €</p>
                                    <img src="/wifi.svg" alt="nuage" className="w-9 h-9 ml-4"/> <p
                                    className="text-lg text-gray-700 ml-2">Wifi : {voyage.wifi ? "Oui" : "Non"}</p>
                                    <img src="/lit.svg" alt="nuage" className="w-9 h-9 ml-4"/> <p
                                    className="text-lg text-gray-700 ml-2">{voyage.nbPersonne} personnes</p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold text-gray-800 ml-4">Réservation</h2>
                                <MontageForm id={id}/>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-800 ml-4">Avis</h2>
                            <div className="bg-white p-4 rounded-lg mt-4">
                                <div className="flex items-center">
                                    <img src="/Icône%20profil.png" alt="avatar" className="w-12 h-12 rounded-full"/>
                                    <div className="ml-4">

                                        <p className="text-gray-700">{voyage.avis}</p>
                                    </div>

                                    <div className="ml-4">
                                        <img src="/Icône%20profil.png" alt="avatar" className="w-12 h-12 rounded-full"/>
                                        <p className="text-gray-700">{voyage.avis2}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <Footer/>
            <style jsx>{`
                /* Pour les écrans larges */
                @media only screen and (min-width: 768px) {
                    .flex-col {
        flex-direction: row;
    }

    .w-full {
        width: 50%;
    }

    .mt-8 {
        margin-top: 2rem;
    }

    .ml-4 {
        margin-left: 1rem;
    }

    .mr {
        margin-right: 1rem;
    }
}

/* Pour les écrans étroits (mobiles) */
@media only screen and (max-width: 767px) {
    .w-260 {
        width: calc(100% - 2rem); /* Largeur à 100% moins les marges */
        margin: 0 auto; /* Centrer sur la page */
    }

    .w-full {
        width: 100%;
    }

    .md\\:ml-4 {
        margin-left: 0; /* Supprimer la marge sur les écrans mobiles */
    }

    .mt-8 {
        margin-top: 1rem; /* Réduire la marge supérieure sur les écrans mobiles */
    }

    .ml-4 {
        margin-left: 0; /* Supprimer la marge à gauche sur les écrans mobiles */
    }

    .mr {
        margin-right: 0; /* Supprimer la marge à droite sur les écrans mobiles */
    }
}
            `}</style>
        </>
    );
};

export default VoyageDetailPage;
