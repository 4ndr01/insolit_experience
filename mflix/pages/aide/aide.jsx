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
                    "Dans votre espace abonnée, sélectionner la réservation \n";
            case 2:
                return "La plateforme Insolit’Experience, ne met pas à disposition les coordonnées des propriétaires de logement et d’activité, pour des raisons de confidentialité. \n" +
                    "\n" +
                    "Si vous souhaitez avoir des informations complémentaires, nous serons ravis de vous accompagner afin de répondre à vos différentes questions.";
            case 3:
                return "Insolit’Experience réalise des promotions durant l’année, comme pendant la période des fêtes de fin d’année.\n" +
                    "\n" +
                    "Insolit’Experience ne peut pas prendre la décision de réaliser des offres spéciales. \n" +
                    "\n" +
                    "Si vous souhaitez vous renseigner sur des offres spéciales sur des logements et activités, nous restons à votre écoute. Nous vous confirmerons si le propriétaire donne son accords \n";
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
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <h1 className="text-2xl font-bold text-white text-center">Foire aux questions</h1>
                <div className="container mx-auto p-4 mt-14">
                    {/* Première div */}
                    <div
                        className={`border p-4 cursor-pointer ${expandedDiv === 1 ? 'h-auto' : 'h-12'} overflow-hidden bg-white rounded-lg`}
                        onClick={() => toggleExpansion(1)}
                    >
                        <p className="font-bold">
                            Puis-je annuler ou modifier ma réservation ? Quelles sont les conditions d'annulation ?
                        </p>
                    </div>

                    {/* Texte supplémentaire pour la première div */}
                    <div className={`answer ${expandedDiv === 1 ? 'active' : ''}`}>
                        <p className="mt-4 bg-white rounded-lg h-auto p-4">{getExpandedText(1)}</p>
                    </div>

                    {/* Deuxième div */}
                    <div
                        className={`border p-4 cursor-pointer ${expandedDiv === 2 ? 'h-auto' : 'h-12'} overflow-hidden mt-4 bg-white rounded-lg`}
                        onClick={() => toggleExpansion(2)}
                    >
                        <p className="font-bold">
                            Comment contacter le propriétaire du logement ou l'organisateur de l'activité ?
                        </p>
                    </div>

                    {/* Texte supplémentaire pour la deuxième div */}
                    <div className={`answer ${expandedDiv === 2 ? 'active' : ''}`}>
                        <p className="mt-4 bg-white rounded-lg h-auto p-4">{getExpandedText(2)}</p>
                    </div>

                    {/* Troisième div */}
                    <div
                        className={`border p-4 cursor-pointer ${expandedDiv === 3 ? 'h-auto' : 'h-12'} overflow-hidden mt-4 bg-white rounded-lg`}
                        onClick={() => toggleExpansion(3)}
                    >
                        <p className="font-bold">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor sed odio id
                            consectetur.
                        </p>
                    </div>

                    {/* Texte supplémentaire pour la troisième div */}
                    <div className={`answer ${expandedDiv === 3 ? 'active' : ''}`}>
                        <p className="mt-4 bg-white rounded-lg h-auto p-4">{getExpandedText(3)}</p>
                    </div>

                    {/* Quatrième div */}
                    <div
                        className={`border p-4 cursor-pointer ${expandedDiv === 4 ? 'h-auto' : 'h-12'} overflow-hidden mt-4 bg-white rounded-lg`}
                        onClick={() => toggleExpansion(4)}
                    >
                        <p className="font-bold">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor sed odio id
                            consectetur.
                        </p>
                    </div>

                    {/* Texte supplémentaire pour la quatrième div */}
                    <div className={`answer ${expandedDiv === 4 ? 'active' : ''}`}>
                        <p className="mt-4 bg-white rounded-lg h-auto p-4">{getExpandedText(4)}</p>
                    </div>

                    {/* Cinquième div */}
                    <div
                        className={`border p-4 cursor-pointer ${expandedDiv === 5 ? 'h-auto' : 'h-12'} overflow-hidden mt-4 bg-white rounded-lg`}
                        onClick={() => toggleExpansion(5)}
                    >
                        <p className="font-bold">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor sed odio id
                            consectetur.
                        </p>
                    </div>

                    {/* Texte supplémentaire pour la cinquième div */}
                    <div className={`answer ${expandedDiv === 5 ? 'active' : ''}`}>
                        <p className="mt-4 bg-white rounded-lg h-auto p-4">{getExpandedText(5)}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>

        <style jsx>{`
        .answer {
    transition: max-height 0.3s ease;
    max-height: 0;
    overflow: hidden;
}

.answer.active {
    max-height: 200px; /* Hauteur maximale de la réponse, ajustez selon vos besoins */
}
`}</style>
        </>
    );
}

export default Aide;
