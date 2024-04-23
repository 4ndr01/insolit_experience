"use client";
import { signOut, useSession } from "next-auth/react";
import NavComponent from "../../components/nav";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const Profile = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [userCommands, setUserCommands] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (user && user.userId) {
            fetchUserData(user.userId).then(r => console.log(r));
        }
    }, [user]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`/api/user_id/${userId}`);
            if (!response.ok) {
                throw new Error("Une erreur s'est produite");
            }
            const data = await response.json();
            setUserData(data);
            setUserCommands(data.commande);
            setImage(data.imageFond);


        } catch (error) {
            setError(error.message);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <NavComponent />
            <section className="bg-white py-20">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>
                    <div className="flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full overflow-hidden">
                            <img src={image?.imageFond} alt="profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold">{user?.name}</h1>
                            <p className="text-lg text-gray-500">{user?.email}</p>
                            <p className="text-lg text-gray-500">Rôle : {user?.role}</p>
                            <p className="text-2xl font-bold">Vos voyages :</p>
                            <ul className="text-lg text-gray-500">
                                {userCommands.map((commande, index) => (
                                    <li key={index} className="mt-4 border-b pb-4">
                                        <p className="mb-2">Destination: {commande.destination}</p>
                                        <p className="mb-2">Date de départ: {formatDate(commande.departDate)}</p>
                                        <p className="mb-2">Date de retour: {formatDate(commande.retourDate)}</p>
                                        <p className="mb-2">Nombre de personnes: {commande.nombrePersonnes}</p>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
