// Import de Tailwind CSS
import 'tailwindcss/tailwind.css';

import React, { useState, useEffect } from 'react';
import Link from "next/link";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });

                    try {
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB3pPTkNyPVkX54NYjH_ij0fa0I0cT_wcM`
                        );

                        if (!response.ok) {
                            throw new Error('Unable to fetch location data.');
                        }

                        const data = await response.json();

                        if (data.results && data.results.length > 0) {
                            const city = data.results[0].formatted_address;
                            setFilteredCities([city]);
                        } else {
                            console.error('City not found in location data:', data);
                        }
                    } catch (error) {
                        console.error('Error fetching location data:', error);
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        // Add logic to filter cities based on searchTerm and userLocation
        // For now, we'll use a dummy array of cities as an example
        const cities = ['Paris', 'London', 'New York', 'Tokyo'];
        const filteredCities = cities.filter((city) =>
            city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCities(filteredCities);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic for handling form submission
        console.log('Search term:', searchTerm);
        console.log('User location:', userLocation);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-md mt-8 ">
            <div>
                {loading ? (
                    <p className="text-center">Nous recherchons votre localisation...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 focus:outline-none"
                        >
                            Search
                        </button>
                    </form>
                )}
            </div>
            <ul>
                {filteredCities.map((city, index) => (
                    <li key={index} className="p-2 border-b border-gray-300">
                        <Link href="/city/city" className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block">

                            {city}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
