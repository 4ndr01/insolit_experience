import { useRouter } from 'next/router';
import { useState } from 'react';
import Voyages from '../../components/voyages/list';
import NavComponent from '../../components/nav';
import MontageForm from '../../components/form_travel/form_travel';

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
            pathname: '/panier/panier', // Chemin de la page du panier
            query: {panier: JSON.stringify([...panier, voyage])}, // Transmettre le nouveau panier via query parameters
        }).then(r => console.log(r));
    };

    return (
        <>
            <NavComponent />
            <body style={{ background: 'linear-gradient( #8474E4,#4CB4FF )', height: '100vh', overflow: 'auto' }}>
            <div className="container mx-auto p-4 bg-white mt-20 rounded-full" style={{ display: 'flex', alignItems: 'center', maxWidth: '60%' }}>
                <img src={voyage.image} alt={voyage.name} style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }} />
                <div style={{ flex: '1' }}>
                    <h1>{voyage.name}</h1>
                    <p>Lieu : {voyage.location}</p>
                    <p>Description : {voyage.content}</p>
                    <div className="mt-4" style={{ maxWidth: '400px' }}>
                        <h2>Réservation</h2>
                        <MontageForm id={id} />
                    </div>
                    <button onClick={() => addToPanier(voyage)} className="mt-4 w-full bg-primary text-white p-3 rounded-md button">
                        Ajouter au Panier
                    </button>
                </div>
            </div>
            </body>
        </>
    );
};

export default VoyageDetailPage;
