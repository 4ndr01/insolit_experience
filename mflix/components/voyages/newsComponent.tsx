import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Voyages from "./list";

const News=()=>{
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
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
        <div>
            <div className="relative mt-20">
                <h2 className="text-3xl font-bold ml-15 mb-5">Nouveautés</h2>
                <div className="flex justify-center items-center">
                    <button onClick={prevGroup} className="mr-4">
                        <FiChevronLeft size={24}/>
                    </button>
                    <div className="flex gap-4">
                        {Voyages.slice(activeGroup * groupSize, (activeGroup + 1) * groupSize).map((voyage, index) => (
                            <div
                                key={voyage.id}
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`relative ${hoveredItem === index ? 'scale-110' : 'scale-100'} transition-all duration-300 mr-4 image` }
                            >
                                <Image src={voyage.image} alt={voyage.name} width={400} height={400} className="rounded-lg"/>
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100 flex justify-center items-center">
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={nextGroup} className="ml-4">
                        <FiChevronRight size={24}/>
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    {Array.from({length: totalGroups}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => goToGroup(index)}
                            className={`w-3 h-3 mx-1 rounded-full ${index === activeGroup ? 'bg-blue-600' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default News;

