import React, { useState } from 'react';
import NavComponent from "../../components/nav";
import Footer from "../../components/footer";

function Aide() {
    const [expandedDiv, setExpandedDiv] = useState(null);

    const toggleExpansion = (divNumber) => {
        setExpandedDiv(divNumber === expandedDiv ? null : divNumber);
    };

    const getExpandedText = (divNumber) => {
        switch (divNumber) {
            case 1:
                return "Votre réservation est annulable 15 jours avant le jour de votre arrivée. \n" +
                    "\n" +
                    "Si vous souhaitez faire une procédure d’annulation : \n" +
                    "\n" +
                    "Se rendre sur votre compte Insolit’Experience \n" +
                    "Dans votre espace abonné, sélectionner la réservation \n";
            case 2:
                return "La plateforme Insolit’Experience ne met pas à disposition les coordonnées des propriétaires de logement et d’activité, pour des raisons de confidentialité. \n" +
                    "\n" +
                    "Si vous souhaitez avoir des informations complémentaires, nous serons ravis de vous accompagner afin de répondre à vos différentes questions.";
            case 3:
                return "Insolit’Experience réalise des promotions durant l’année, comme pendant la période des fêtes de fin d’année.\n" +
                    "\n" +
                    "Insolit’Experience ne peut pas prendre la décision de réaliser des offres spéciales. \n" +
                    "\n" +
                    "Si vous souhaitez vous renseigner sur des offres spéciales sur des logements et activités, nous restons à votre écoute. Nous vous confirmerons si le propriétaire donne son accord \n";
            case 4:
                return "Contenu supplémentaire pour la quatrième div.";
            case 5:
                return "Contenu supplémentaire pour la cinquième div.";
            default:
                return "";
        }
    };

    return (
        <>
            <NavComponent/>

            {/* Contenu principal */}
            <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                 style={{ background: 'linear-gradient(to bottom, #8474E4, #4CB4FF)' }}>
                <h1 className="text-2xl font-bold text-white text-center">Foire aux questions</h1>
                <div className="container mx-auto p-4 mt-14 grid gap-4 sm:grid-cols-2">
                    {/* Boucle pour les divs */}
                    {[1, 2, 3, 4, 5].map((divNumber) => (
                        <div
                            key={divNumber}
                            className={`border p-4 cursor-pointer overflow-hidden bg-white rounded-lg`}
                            onClick={() => toggleExpansion(divNumber)}
                            style={{ maxHeight: expandedDiv === divNumber ? 'auto' : '3rem' }} // Hauteur initiale
                        >
                            <p className="font-bold">
                                {divNumber === 1
                                    ? "Puis-je annuler ou modifier ma réservation ? Quelles sont les conditions d'annulation ?"
                                    : divNumber === 2
                                        ? "Comment contacter le propriétaire du logement ou l'organisateur de l'activité ?"
                                        : "Titre de la question par défaut"}
                            </p>
                            {/* Texte supplémentaire conditionnel */}
                            {expandedDiv === divNumber && (
                                <div className="mt-4 bg-white rounded-lg p-4">
                                    <p>{getExpandedText(divNumber)}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer/>

            {/* Styles CSS adaptatifs */}
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .border {
                    border: 1px solid #ccc;
                    width: 100%;
                    box-sizing: border-box;
                }

                .answer {
                    transition: max-height 0.3s ease;
                    max-height: 0;
                    overflow: hidden;
                    width: 100%;
                    box-sizing: border-box;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-top: none;
                    padding: 1rem;
                    border-radius: 0 0 0.5rem 0.5rem;
                }

                @media (min-width: 640px) {
                    .container {
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }

                    .border {
                        width: calc(50% - 1rem);
                        margin-bottom: 1rem;
                    }
                }

                @media (min-width: 768px) {
                    .border {
                        width: calc(50% - 1rem);
                        margin-bottom: 1rem;
                    }
                }
            `}</style>
        </>
    );
}

export default Aide;
