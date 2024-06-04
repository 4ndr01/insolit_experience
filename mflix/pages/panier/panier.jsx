import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NavComponent from '../../components/nav';
import Footer from '../../components/footer';
import {XCircleIcon} from '@heroicons/react/24/solid'
// ... vos types (Voyage)

const PanierPage = () => {
    const router = useRouter();
    const [voyagesInPanier, setVoyagesInPanier] = useState([]);

    useEffect(() => {
        const panierData = localStorage.getItem('panier');
        if (panierData) {
            setVoyagesInPanier(JSON.parse(panierData));
        }
    }, []);

    //Fonction de suppression du voyage
    const removeFromPanier = (voyageId) => {
        const updatedPanier = voyagesInPanier.filter(voyage => voyage.id !== voyageId);
        setVoyagesInPanier(updatedPanier);
        localStorage.setItem('panier', JSON.stringify(updatedPanier));
    };


    return (
        <>
            <NavComponent />
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Valider mon panier
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default PanierPage;
