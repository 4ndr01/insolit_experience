// Import des dépendances nécessaires
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Utilisation de useRouter au lieu de next/navigation
import { useSession } from "next-auth/react";
import Voyages from "../../components/voyages/list";
import Success from "../../pages/success/success";

// Définition du composant MontageForm
const MontageForm = ({id}) => {
    // États locaux
    const [destination, setDestination] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [retourDate, setRetourDate] = useState('');
    const [nombrePersonnes, setNombrePersonnes] = useState(1);
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const voyage = Voyages.find(voyage => String(voyage.id) === id);
const image = voyage.image;

    // Effet pour mettre à jour les données de session
    useEffect(() => {
        if (session) {
            setUserId(session.user.userId);
            setName(session.user.name || "");
            setEmail(session.user.email || "");
        }
    }, [session]);

    useEffect(() => {
        if (voyage) {
            setDestination(voyage.name || '');
        }
    }, [voyage]);


    // Fonction pour nettoyer l'entrée
    const sanitizeInput = (input) => {
        return input.replace(/<\/?[^>]+(>|$)/g, "");
    };

    // Gestionnaire de changement pour le champ de destination
    const handleTextAreaChange = (e) => {
        setDestination(sanitizeInput(e.target.value));
    };

    // Validation du texte de destination
    const validateTextArea = (text) => {
        return text.length >= 5;
    };

    // Effet pour valider le formulaire
    useEffect(() => {
        setIsFormValid(image && name && email && destination && validateTextArea(destination));
    }, [name, email, destination]);

    // Fonction de soumission du formulaire
    const submit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            const response = await fetch("/api/travel/travel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    name,
                    email,
                    destination,
                    departDate,
                    retourDate,
                    nombrePersonnes,
                    image
                }),
            });

            if (response.ok) {
                await router.push("/success/success");
            } else {
                console.error("Échec de la soumission du formulaire");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire", error);
        }
    };

    // Rendu du composant
    return (
        <>
        <div className="container">
            <h1>Créer un montage</h1>
            <form onSubmit={submit}>
                <label htmlFor="destination" className="block mt-4">
                    Destination
</label>
                <textarea
                    id="destination"
                    name="destination"
                    value={destination}
                    onChange={handleTextAreaChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
                <label htmlFor="departDate" className="block mt-4">
                    Date de départ
</label>
                <input
                    type="date"
                    id="departDate"
                    name="departDate"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label htmlFor="retourDate" className="block mt-4">
                    Date de retour
</label>
                <input
                    type="date"
                    id="retourDate"
                    name="retourDate"
                    value={retourDate}
                    onChange={(e) => setRetourDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label htmlFor="nombrePersonnes" className="block mt-4">
                    Nombre de personnes
</label>
                <input
                    type="number"
                    id="nombrePersonnes"
                    name="nombrePersonnes"
                    value={nombrePersonnes}
                    onChange={(e) => setNombrePersonnes(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="mt-4 w-full bg-primary text-white p-3 rounded-md button">
                    Réserver maintenant
                </button>
            </form>
        </div>

            <style jsx>{`
                button {
                    cursor: pointer;
                    background-color: rgb(74 108 247);
                }

                .button {
                    cursor: pointer;
                }

                .button:hover {
                    background-color: rgb(74 108 247);
                }
            `}</style>
    </>
    );
};

// Export du composant MontageForm
export default MontageForm;
