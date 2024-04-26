// pages/voyages/[id].js

import { useRouter } from 'next/router';
import Voyages from "../../components/voyages/list";
import NavComponent from "../../components/nav";
import MontageForm from "../../components/form_travel/form_travel";

const VoyageDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Trouver le voyage correspondant à l'ID dans le tableau Voyages
    const voyage = Voyages.find(voyage => String(voyage.id) === id);

    if (!voyage) {
        return <p>Voyage non trouvé</p>;
    }

    return (
        <>
            <NavComponent/>
            <body style={{ background: 'linear-gradient( #8474E4,#4CB4FF )', height: '100vh', overflow: 'auto' }}>
            {/* Utiliser la propriété height: '100vh' pour définir la hauteur maximale du body */}
            {/* Utiliser overflow: 'auto' pour activer le défilement si nécessaire */}
            <div className="container mx-auto p-4 bg-white mt-20 rounded-full " style={{ display: 'flex', alignItems: 'center', maxWidth: '60%', }}>
                {/* Définir maxWidth: '100%' pour que la div container s'adapte à la largeur maximale de la fenêtre */}

                <img src={voyage.image} alt={voyage.name}
                     style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }}/>

                <div style={{ flex: '1' }}>
                    {/* Contenu à côté de l'image */}
                    <h1>{voyage.name}</h1>
                    <p>Lieu : {voyage.location}</p>
                    <p>Description : {voyage.content}</p>

                    {/* Formulaire de réservation */}
                    <div className="mt-4" style={{ maxWidth: '400px' }}>
                        <h2>Réservation</h2>
                        <MontageForm id={id}/>
                    </div>
                </div>
            </div>
            </body>
        </>
    );
};

export default VoyageDetailPage;
