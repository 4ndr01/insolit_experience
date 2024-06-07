import React, { useState } from 'react';
import NavComponent from "../../components/nav";
import Footer from "../../components/footer";
import { ChevronDownIcon } from '@heroicons/react/24/solid';

function Aide() {
    const [expandedDivs, setExpandedDivs] = useState({}); // État pour chaque div

    const toggleExpansion = (divNumber) => {
        setExpandedDivs(prevDivs => ({
            ...prevDivs,
            [divNumber]: !prevDivs[divNumber]
        }));
    };

    const getExpandedText = (divNumber) => {
        switch (divNumber) {
            case 1:
                return (
                    <div>
                        <p>Votre réservation est annulable 15 jours avant le jour de votre arrivée.</p>
                        <p>Si vous souhaitez faire une procédure d’annulation :</p>
                        <ul className="list-disc list-inside">
                            <li>Se rendre sur votre compte Insolit’Experience</li>
                            <li>Dans votre espace abonné, sélectionner la réservation</li>
                        </ul>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <p>La plateforme Insolit’Experience ne met pas à disposition les coordonnées des propriétaires de logement et d’activité, pour des raisons de confidentialité.</p>
                        <p>Si vous souhaitez avoir des informations complémentaires, nous serons ravis de vous accompagner afin de répondre à vos différentes questions.</p>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <p>Insolit’Experience réalise des promotions durant l’année, comme pendant la période des fêtes de fin d’année.</p>
                        <p>Insolit’Experience ne peut pas prendre la décision de réaliser des offres spéciales.</p>
                        <p>Si vous souhaitez vous renseigner sur des offres spéciales sur des logements et activités, nous restons à votre écoute. Nous vous confirmerons si le propriétaire donne son accord.</p>
                    </div>
                );
            case 4:
                return <p>Contenu supplémentaire pour la quatrième div.</p>;
            case 5:
                return <p>Contenu supplémentaire pour la cinquième div.</p>;
            default:
                return "";
        }
    };

    return (
        <>
            <NavComponent/>
            <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <h1 className="text-2xl font-bold text-white text-center">Foire aux questions</h1>

                <div className="container mx-auto p-4 mt-14 grid gap-4 sm:grid-cols-2">
                    {[1, 2, 3, 4, 5].map((divNumber) => (
                        <div
                            key={divNumber}
                            className="border p-4 cursor-pointer overflow-hidden bg-white rounded-lg transition-all duration-300"
                            onClick={() => toggleExpansion(divNumber)}
                        >
                            <div className="flex justify-between items-center">
                                <p className="font-bold">
                                    {divNumber === 1
                                        ? "Puis-je annuler ou modifier ma réservation ? Quelles sont les conditions d'annulation ?"
                                        : divNumber === 2
                                            ? "Comment contacter le propriétaire du logement ou l'organisateur de l'activité ?"
                                            : "Titre de la question par défaut"}
                                </p>
                                <ChevronDownIcon
                                    className={`w-5 h-5 transition-transform ${
                                        expandedDivs[divNumber] ? "rotate-180" : "" // Rotation de l'icône si la div est ouverte
                                    }`}
                                />
                            </div>

                            {/* Contenu de la réponse (visible si expanded) */}
                            {expandedDivs[divNumber] && (
                                <div className="mt-4">
                                    {getExpandedText(divNumber)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default Aide;
