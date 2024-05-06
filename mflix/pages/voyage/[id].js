import { useRouter } from 'next/router';
import { useState } from 'react';
import Voyages from '../../components/voyages/list';
import NavComponent from '../../components/nav';
import MontageForm from '../../components/form_travel/form_travel';
import Footer from '../../components/footer';

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
            pathname: '/panier/panier',
            query: { panier: JSON.stringify([...panier, voyage]) },
        });
    };

    return (
        <>
            <NavComponent />
            <div className="bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 min-h-screen px-4 py-8 md:py-16"
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <div className="flex items-center justify-center min-h-screen ">
                    <div className="max-w-3xl w-200 bg-white rounded-lg shadow-lg p-6 ">
                        <div
                            className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                            <img
                                src={voyage.image}
                                alt={voyage.name}
                                className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
                                style={{height: '400px'}}
                            />
                            <div className="w-full md:w-1/2 mr">
                                <div className="container">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{voyage.name}</h1>
                                <p className="text-lg text-gray-700 mt-2">Lieu : {voyage.location}</p>
                                <p className="text-gray-800 mt-4">{voyage.content}</p>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-xl font-semibold text-gray-800 ml-4">Réservation</h2>
                                    <MontageForm id={id}/>
                                    <button
                                        onClick={() => addToPanier(voyage)}
                                        className="mt-4 w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-80 transition duration-300"
                                    >
                                        Ajouter au Panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    );
};

export default VoyageDetailPage;
