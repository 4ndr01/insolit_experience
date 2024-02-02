"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../components/loading";
import Link from "next/link";
import loading from "../../components/loading";
import Travel from "../../models/travel";
import connectMongoDB from "../../lib/mongodb";
import axios from "axios";
const MontageForm = ({userId}) => {
    const [destination, setDestination] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [retourDate, setRetourDate] = useState('');
    const [nombrePersonnes, setNombrePersonnes] = useState(1);


            const handleVoyageSubmit = async (data) => {
                data.preventDefault();
                const voyage = {
                    destination,
                    departDate,
                    retourDate,
                    nombrePersonnes,
                    userId
                }
                try {
                    const response = await axios.post('/api/travel/travel', voyage);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }




    return (
        <>
            {loading && <Loading />} {/* Affichez le composant de chargement lorsque loading est vrai */}
            <div className="bg-primary py-3 px-4 md:px-6 lg:px-8 xl:px-10 h-20 mb-6">
                <div className="container mx-auto flex items-center justify-between h-12 ml-22">
                    <Link href="/">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Accueil</p>
                    </Link>
                    <Link href="/contact/contact">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Contact</p>
                    </Link>
                    <Link href="/form_travel/form_travel">
                        <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Explorer</p>
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/login/login">
                            <p className="text-dark font-bold hover:opacity-80 transition duration-300 mr-3">Connexion</p>
                        </Link>
                        <Link href="/signup/signup">
                            <p className="text-dark font-bold hover:opacity-80 transition duration-300">Inscription</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-dark mb-6">Créer un voyage</h1>
                <form onSubmit={handleVoyageSubmit}>
                    <div className="mb-4">
                        <label htmlFor="destination" className="block text-dark font-bold mb-2">Destination</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="departDate" className="block text-dark font-bold mb-2">Date de départ</label>
                        <input
                            type="date"
                            id="departDate"
                            name="departDate"
                            value={departDate}
                            onChange={(e) => setDepartDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="retourDate" className="block text-dark font-bold mb-2">Date de retour</label>
                        <input
                            type="date"
                            id="retourDate"
                            name="retourDate"
                            value={retourDate}
                            onChange={(e) => setRetourDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nombrePersonnes" className="block text-dark font-bold mb-2">Nombre de personnes</label>
                        <input
                            type="number"
                            id="nombrePersonnes"
                            name="nombrePersonnes"
                            value={nombrePersonnes}
                            onChange={(e) => setNombrePersonnes(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:opacity-80 transition duration-300"
                    >
                        Créer le voyage
                    </button>
                </form>
            </div>
        </>
    )
}

export default MontageForm;