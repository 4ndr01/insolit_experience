import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const PanierPage = () => {
    const router = useRouter();
    const [voyagesInPanier, setVoyagesInPanier] = useState([]);


    useEffect(() => {
        const panierData = localStorage.getItem('panier');
        if (panierData) {
            setVoyagesInPanier(JSON.parse(panierData));
        }
    }, []);

    return (
        <div>
            <h1>Mon Panier</h1>
            <ul>
                {voyagesInPanier.map((voyage, index) => (
                    <li key={index}>
                        <img src={voyage.image} alt={voyage.name} />
                        <p>{voyage.name}</p>
                        <p>{voyage.price} €</p>
                        {/* Autres détails du voyage */}
                    </li>
                ))}
            </ul>
            <button>Valider mon panier</button>
        </div>
    );
};

export default PanierPage;
