import React, { useState } from 'react';
import Link from "next/link";

const SearchBarWithVoyagesList: React.FC<{ voyages: any[] }> = ({ voyages }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showVoyages, setShowVoyages] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setShowVoyages(true); // Afficher les voyages lorsque la recherche est effectuée
    };

    const filteredVoyages = voyages.filter(voyage =>
        voyage.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">

            <div className="z-10 relative">
                <div className="flex justify-center items-center mt-20">
                    <input
                        type="text"
                        placeholder="Rechercher un voyage"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-96 h-12 text-black"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                {showVoyages && (
                    <div className="flex justify-center items-center mt-20">
                        <div className="grid grid-cols-3 gap-4">
                            {filteredVoyages.map((voyage) => (
                                <div key={voyage.id} className="border border-gray-300 rounded-lg p-4">
                                    <Link href={`/voyage/${voyage.id}`}>
                                        <img src={voyage.image} alt={voyage.name} className="rounded-lg"/>
                                        <h3 className="text-xl font-bold">{voyage.name}</h3>
                                        <p>{voyage.content}</p>
                                        <p className="text-blue-600 font-bold">{voyage.price} €</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBarWithVoyagesList;
