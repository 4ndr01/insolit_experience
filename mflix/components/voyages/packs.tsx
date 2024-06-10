import Image from "next/image";
import React, { useState, useEffect, SetStateAction} from "react";
import {FiChevronLeft, FiChevronRight, FiHeart} from "react-icons/fi";
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
            <h2 className="text-3xl font-bold text-center mb-5 mr-20">Pour vous</h2>

            {/* Carrousel */}
            <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory">
                {/* Boutons de navigation */}
                <button onClick={prevGroup} className="snap-start shrink-0 mr-4">
                    <FiChevronLeft size={24} />
                </button>

                <div className="flex gap-4 justify-center items-center">
                    {Voyages.slice(activeGroup * groupSize, (activeGroup + 1) * groupSize).map((voyage) => (
                        <div key={voyage.id}
                             className="snap-center shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 relative p-4">
                            {/* Image du produit */}
                            <div className="relative">
                                <Image
                                    src={voyage.image}
                                    alt={voyage.name}
                                    width={400}
                                    height={400}
                                    className="rounded-lg object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition duration-200">
                                    <FiHeart size={20}/> {/* Bouton de liste de souhaits */}
                                </button>
                            </div>

                            {/* Détails du produit */}
                            <div className="mt-4 text-center bg-white p-4 rounded-lg"> {/* Ajout de bg-white et p-4 */}
                                <h3 className="text-lg font-semibold mb-1">{voyage.name}</h3>
                                <p className="text-gray-600 text-sm">{voyage.position}</p>
                                <p className="text-lg font-semibold mt-2">{voyage.price} €</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={nextGroup} className="snap-end shrink-0 ml-4">
                    <FiChevronRight size={24}/>
                </button>
            </div>

            {/* Indicateurs de groupe (points) */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalGroups }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToGroup(index)}
                        className={`w-3 h-3 rounded-full bg-gray-300 mx-1 focus:outline-none ${
                            index === activeGroup ? "bg-gray-600" : ""
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Pack;