import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import NavComponent from '../../components/nav';
import Footer from '../../components/footer';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from "next-auth/react";
import {Button,  Label} from "flowbite-react";
import * as formState from "zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "flowbite-react";
import Voyages from "../../components/voyages/list";
import id from "../voyage/[id]";



const PanierPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [destination, setDestination] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [retourDate, setRetourDate] = useState('');
    const [nombrePersonnes, setNombrePersonnes] = useState(1);
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const voyage = Voyages.find(voyage => String(voyage.id) === id);

    const [voyagesInPanier, setVoyagesInPanier] = useState([]);
    const [showModal, setShowModal] = useState(false);


    const validationSchema = z.object({
        nom: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
        prenom: z.string().min(2, "Le prénom doit comporter au moins 2 caractères"),
        email: z.string().email("Adresse e-mail invalide"),
        telephone: z.string().optional(),
        adresse: z.string().optional(),
        commentaires: z.string().optional(),
    });


    useEffect(() => {
        const panierData = localStorage.getItem('panier');
        if (panierData) {
            setVoyagesInPanier(JSON.parse(panierData));
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validationSchema),
    });

    //Fonction de suppression du voyage
    const removeFromPanier = (voyageId) => {
        const updatedPanier = voyagesInPanier.filter(voyage => voyage.id !== voyageId);
        setVoyagesInPanier(updatedPanier);
        localStorage.setItem('panier', JSON.stringify(updatedPanier));
    };

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
        setIsFormValid(name && email && destination && validateTextArea(destination));
    }, [name, email, destination]);



    const submit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            const response = await fetch("/api/command/command", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    userId,
                    voyages: voyagesInPanier,



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

    const handleValidateClick = () => {
        if (status === 'unauthenticated') {
            router.push('/login/login').then(r => console.log(r))
            return;
        }
        setShowModal(true);
    };



    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">

            <NavComponent/>
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold mb-6 text-center">Mon Panier</h1>

                {voyagesInPanier.length === 0 ? (
                    <p className="text-center text-gray-500">Votre panier est vide.</p>
                ) : (
                    <ul className="space-y-4">
                        {voyagesInPanier.map((voyage, index) => (
                            <li key={index} className="flex items-start bg-white rounded-lg shadow p-4">
                                <img src={voyage.image} alt={voyage.name} className="w-24 h-24 rounded-md object-cover mr-4"/>
                                <div>
                                    <h2 className="text-lg font-medium">{voyage.name}</h2>
                                    <p className="text-gray-600">Lieu: {voyage.location}</p>
                                    <p className="text-gray-800 font-semibold">{voyage.price} €</p>
                                    <button onClick={() => removeFromPanier(voyage.id)} className="text-red-500 mt-2">
                                        <XCircleIcon className='w-6 h-6'/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {voyagesInPanier.length > 0 && (
                    <div className="flex justify-end mt-8">
                        <Button onClick={handleValidateClick} className="bg-blue-500 text-black px-4 py-2 rounded-lg">
                            Valider
                        </Button>

                        {/* Fenêtre modale pour le formulaire */}
                        <Modal show={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Header>Validez votre panier</Modal.Header>
                            <Modal.Body>
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

                            </Modal.Body>
                        </Modal>
                    </div>
                )}

            </div>
            <Footer/>

        </div>
    );
}

export default PanierPage;
