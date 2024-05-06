import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Voyages from "./list";
import Link from "next/link";

const VoyagesList = () => {
    const [activeGroup, setActiveGroup] = useState(0);

    const groupSize = 3; // Nombre d'images à afficher dans chaque groupe
    const totalGroups = Math.ceil(Voyages.length / groupSize);

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
            <h2 className="text-3xl font-bold ml-15 mb-5">Pour vous</h2>
            <div className="flex justify-center items-center overflow-x-scroll scrollbar-hide">
                <button onClick={prevGroup} className="mr-4">
                    <FiChevronLeft size={24}/>
                </button>
                <div className="flex gap-4" style={{ scrollBehavior: "smooth" }}>
                    {Voyages.slice(activeGroup * groupSize, (activeGroup + 1) * groupSize).map((voyage) => (
                        <div
                            key={voyage.id}
                            className="relative ml-4 image"
                        >
                            <Link href={`/voyage/${voyage.id}`}>

                                    <Image src={voyage.image} alt={voyage.name} width={400} height={400} className="rounded-lg" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100 flex justify-center items-center">
                                    </div>

                            </Link>
                        </div>
                    ))}
                </div>
                <button onClick={nextGroup} className="ml-4">
                    <FiChevronRight size={24}/>
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

export default VoyagesList;
