import Image from "next/image";
import { useState, useEffect, SetStateAction} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import Voyages from "./list";
import Link from "next/link";

const Pack = () => {
    const [activeGroup, setActiveGroup] = useState(0);
    const [groupSize, setGroupSize] = useState(1); // 1 image par défaut (petits écrans)

    useEffect(() => {
        const updateGroupSize = () => {
            if (window.innerWidth < 640) {  // Mobile: 1 voyage par groupe
                setGroupSize(1);
            } else if (window.innerWidth < 768) { // Tablette: 2 voyages par groupe
                setGroupSize(2);
            } else {                               // Grand écran: 3 voyages par groupe
                setGroupSize(3);
            }
        };
        updateGroupSize(); // Initialisation au chargement
        window.addEventListener('resize', updateGroupSize); // Mise à jour lors du redimensionnement
        return () => window.removeEventListener('resize', updateGroupSize); // Nettoyage
    }, []);

    const totalGroups = Math.ceil(Voyages.length / groupSize);

    const goToGroup = (groupIndex: SetStateAction<number>) => {
        setActiveGroup(groupIndex);
    };

    const nextGroup = () => {
        setActiveGroup((prevGroup) => (prevGroup === totalGroups - 1 ? 0 : prevGroup + 1));
    };

    const prevGroup = () => {
        setActiveGroup((prevGroup) => (prevGroup === 0 ? totalGroups - 1 : prevGroup - 1));
    };

    return (
        <div className="relative mt-20">
            <h2 className="text-3xl font-bold text-center mb-5">Les packs</h2>
            <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory">
                <button onClick={prevGroup} className="snap-start shrink-0 mr-4">
                    <FiChevronLeft size={24}/>
                </button>
                <div className="flex gap-4 justify-center items-center">
                    {Voyages.slice(activeGroup * groupSize, (activeGroup + 1) * groupSize).map((voyage, index) => (
                        <div
                            key={voyage.id}
                            className={`relative snap-center shrink-0 w-full ${
                                groupSize > 1 ? "md:w-1/2 lg:w-1/3 xl:w-1/4" : "" // Réactif pour 2 ou 3 images
                            } image group mx-4`}
                        >
                            <Link href={`/voyage/${voyage.id}`}>
                                <Image
                                    src={voyage.image}
                                    alt={voyage.name}
                                    width={400}
                                    height={400}
                                    className="rounded-lg object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4 rounded-lg text-center"
                                >
                                    <h3 className="text-xl font-bold mb-2">{voyage.name}</h3>
                                    <p className="text-sm mb-1">Lieu : {voyage.position}</p>
                                    <p className="text-sm mb-1">Prix : {voyage.price} €</p>
                                    <p className="text-sm mb-1">Repas : {voyage.repas}</p>
                                    <p className="text-sm mb-1">Salles de bain : {voyage.nbSalleDeBain}</p>
                                    <p className="text-sm mb-1">Wifi : {voyage.wifi ? "Oui" : "Non"}</p>
                                    <p className="text-sm">Capacité : {voyage.nbPersonne} personnes</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <button onClick={nextGroup} className="snap-end shrink-0 ml-4">
                    <FiChevronRight size={24}/>
                </button>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({length: totalGroups}, (_, index) => (
                    <button
                        key={index}
                        onClick={() => goToGroup(index)}
                        className={`w-3 h-3 mx-1 rounded-full ${
                            index === activeGroup ? "bg-blue-600" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Pack;