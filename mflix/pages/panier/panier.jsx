import { useRouter } from 'next/router';

const PanierPage = () => {
    const router = useRouter();
    const { panier } = router.query;

    // Convertir les voyages en JSON (si nécessaire)
    const voyagesInPanier = panier ? JSON.parse(panier) : [];

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
