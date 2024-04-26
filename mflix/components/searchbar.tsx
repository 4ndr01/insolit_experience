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
        voyage.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-center items-center mt-20">
                <input
                    type="text"
                    placeholder="Rechercher un voyage"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            {showVoyages && ( // Afficher les voyages seulement si showVoyages est vrai
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
    );
};

export default SearchBarWithVoyagesList;
