import Image from "next/image";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Voyages from "./list";
import Link from "next/link";

const Pack = () => {
    const [activeGroup, setActiveGroup] = useState(0);
    const [groupSize, setGroupSize] = useState(3); // Nombre d'images à afficher dans chaque groupe

    const totalGroups = Math.ceil(Voyages.length / groupSize);

    // Fonction pour déterminer le nombre d'images par groupe en fonction de la largeur de l'écran
    const updateGroupSize = () => {
        if (window.innerWidth < 768) {
            setGroupSize(2); // Afficher 2 images par groupe pour les écrans étroits (mobiles)
        } else {
            setGroupSize(3); // Afficher 3 images par groupe pour les écrans plus larges (tablettes et ordinateurs)
        }
    };

    useEffect(() => {
        // Mettre à jour le nombre d'images par groupe lors du chargement initial et lors du redimensionnement de la fenêtre
        updateGroupSize();
        window.addEventListener("resize", updateGroupSize);
        return () => {
            window.removeEventListener("resize", updateGroupSize);
        };
    }, []);

    const goToGroup = (groupIndex: number) => {
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
            <h2 className="text-3xl font-bold ml-15 mb-5">Les packs</h2>
            <div className="flex justify-center items-center overflow-x-scroll scrollbar-hide">
                <button onClick={prevGroup} className="mr-4">
                    <FiChevronLeft size={24} />
                </button>
                <div className="flex gap-4" style={{ scrollBehavior: "smooth" }}>
                    {Voyages.slice(activeGroup * groupSize, (activeGroup + 1) * groupSize).map((voyage) => (
                        <div key={voyage.id} className="relative ml-4 image group">
                            <Link href={`/voyage/${voyage.id}`}>
                                <Image
                                    src={voyage.image}
                                    alt={voyage.name}
                                    width={400}
                                    height={400}
                                    className="rounded-lg object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4 rounded-lg text-center">
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
                <button onClick={nextGroup} className="ml-4">
                    <FiChevronRight size={24} />
                </button>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalGroups }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => goToGroup(index)}
                        className={`w-3 h-3 mx-1 rounded-full ${index === activeGroup ? 'bg-blue-600' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};


export default Pack;
