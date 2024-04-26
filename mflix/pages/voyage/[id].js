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
            <div className="container mx-auto p-4">

                <img src={voyage.image} alt={voyage.name}
                     style={{width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px'}}/>
                <h1>{voyage.name}</h1>
                <p>Lieu : {voyage.location}</p>
                <p>Description : {voyage.content}</p>

                <div className="mt-4">
                    <h2>Réservation</h2>
                    <MontageForm id={id}/>
                </div>
            </div>
        </>
    );
};

export default VoyageDetailPage;
