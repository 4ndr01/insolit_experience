import React, { useState, useEffect } from 'react';
import Link from "next/link";

const SearchBarWithVoyagesList = ({ voyages }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showVoyages, setShowVoyages] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Extraire les catégories et lieux uniques
    const categories = [...new Set(voyages.map(voyage => voyage.category))];
    const locations = [...new Set(voyages.map(voyage => voyage.position))];
    useEffect(() => {
        setShowVoyages(searchQuery !== '' || selectedCategory || selectedLocation);
    }, [searchQuery, selectedCategory, selectedLocation]);
        console.log(voyages)

    const handleSearch = (query) => {
        setSearchQuery(query);
        setShowVoyages(true);
    };

    const filteredVoyages = voyages.filter(voyage => {
        const matchesCategory = selectedCategory ? voyage.category === selectedCategory : true;
        const matchesLocation = selectedLocation ? voyage.position === selectedLocation : true;
        const matchesQuery = voyage.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesLocation && matchesQuery;
    });

    return (
        <div className="relative">
            {/* ... (images de fond) ... */}
            <div className="relative z-10">
                {/* Barre de recherche */}
                {/* ... (votre barre de recherche existante) ... */}

                {/* Filtres */}
                <div className="flex justify-center mt-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mr-4"
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="">Tous les lieux</option>
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                {/* Résultats de recherche */}
                {showVoyages && (
                    <div className="flex justify-center items-center mt-20">
                        <div className="grid grid-cols-3 gap-4">
                            {filteredVoyages.map(voyage => (
                                <Link href={`/voyage/${voyage.id}`} key={voyage.id}>
                                    <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                        <img src={voyage.image} alt={voyage.name} className="w-full h-48 object-cover"/>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold">{voyage.name}</h3>
                                            <p className="text-sm text-gray-600">{voyage.content}</p>
                                            <p className="text-sm text-gray-600">{voyage.price} €</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default SearchBarWithVoyagesList;