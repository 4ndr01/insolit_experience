
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import Voyages from '../../components/voyages/list';
import NavComponent from '../../components/nav';
import MontageForm from '../../components/form_travel/form_travel';
import Footer from '../../components/footer';

const VoyageDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const addToPanier = () => {
        // Récupérer le panier existant depuis localStorage
        const panierData = localStorage.getItem('panier');
        const panierActuel = panierData ? JSON.parse(panierData) : [];

        // Vérifier si le voyage est déjà dans le panier
        if (panierActuel.some(item => item.id === voyage.id)) {
            alert("Ce voyage est déjà dans votre panier.");
            return;
        }

        // Ajouter le voyage au panier existant
        const nouveauPanier = [...panierActuel, voyage];

        // Sauvegarder le nouveau panier dans localStorage
        localStorage.setItem('panier', JSON.stringify(nouveauPanier));

        // Notification et redirection (optionnel)
        alert("Le voyage a été ajouté au panier !");
        // ... (code de redirection optionnel)
    };



    // Trouver le voyage correspondant à l'ID
    const voyage = Voyages.find(v => String(v.id) === id);

    if (!voyage) {
        return <p>Voyage non trouvé</p>;
    }


    return (
        <>
        <NavComponent/>
        <div className="bg-gradient-to-b min-h-screen px-4 py-8 md:py-16"
             style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-3xl bg-white p-6 rounded-lg w-full md:w-260">

                    <div className="flex flex-col md:flex-row">
                        <div
                            className="w-full rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-4"> {/* Marge à droite sur grand écran */}
                            <img
                                src={voyage.image}
                                alt={voyage.name}
                                className="w-300 h-auto rounded-lg"  // Responsive image
                            />
                        </div>
                        {voyage.image2 && ( // Condition pour afficher la 2ème image
                            <div className="w-full rounded-lg overflow-hidden">
                                <img
                                    src={voyage.image2}
                                    alt={voyage.name}
                                    className="w-full h-auto rounded-lg"  // Responsive image
                                />
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 mr">
                        <div className="container">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{voyage.name}</h1>
                            <p className="text-lg text-gray-700 mt-2">Lieu : {voyage.position}</p>
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
                            <button onClick={addToPanier}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Ajouter au panier
                            </button>

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

</>
)
    ;
};

export default VoyageDetailPage;
