import React from 'react';
import 'tailwindcss/tailwind.css';
import Link from "next/link";

interface UnusualActivity {
    name: string;
    location: string;
    image: string;
}

const UnusualActivitiesList: React.FC = () => {
    const unusualActivities: UnusualActivity[] = [
        { name: 'Vol en montgolfière au lever du soleil', location: 'Disponible dans diverses régions montagneuses.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { name: 'Dîner dans le noir complet', location: 'Restaurants insolites dans les grandes villes.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { name: 'Cours de jonglage', location: 'Écoles de cirque ou ateliers artistiques.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { name: 'Visite d\'un musée abandonné', location: 'Exploration urbaine dans certaines zones.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { name: 'Séance de yoga sur un paddleboard', location: 'Sur des lacs ou des rivières calmes.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: 'Participation à un escape game en plein air', location: 'Disponible dans divers parcs ou zones spécifiques.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: 'Observation des étoiles avec un astronome amateur', location: 'Observatoires locaux ou événements astronomiques.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: 'Cours de cuisine moléculaire', location: 'Écoles de cuisine spécialisées.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: 'Randonnée nocturne avec des lanternes', location: 'Parcs naturels organisant des événements nocturnes.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: 'Balade en segway dans la ville', location: 'Visites guidées en segway dans les centres-villes.', image:"https://images.unsplash.com/photo-1497531551184-06b252e1bee1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ];

    return (
        <div className="container-fluid px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold text-gray-800 p-4">Activités insolites</h2>
            <ul className="mt-4 space-y-4">
                {unusualActivities.map((activity, index) => (
                    <li key={index} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800">{activity.name}</h3>
                        <Link href={`/search?location=${activity.location}`} className="mt-2 text-sm font-semibold text-gray-600 hover:text-gray-800">
                        <img className="mt-4 rounded-lg shadow-md w-96" src={activity.image} alt={activity.name} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UnusualActivitiesList;