import { signOut, useSession } from "next-auth/react";
import NavComponent from "../../components/nav";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
const Profile = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [userCommands, setUserCommands] = useState([]);
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState({});

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
            <body style={{background: 'linear-gradient( #8474E4,#4CB4FF )', height: '100vh', overflow: 'auto'}}>
            <div className="container mx-auto bg mt-20 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-lg overflow-hidden">
                        <Image src={users?.imageFond} alt="profile" layout="responsive" width="100" height="100" />
                    </div>
                    <div className="ml-4 bg-white rounded-lg p-4">
                        <h1 className="text-2xl font-bold">Pseudo: {user?.name}</h1>
                        <p className="text-lg text-gray-500">Email: {user?.email}</p>
                        <p className="text-lg text-gray-500">Rôle : {user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Section des voyages */}
            <div className="container mx-auto mt-8 px-4">
                <h2 className="text-3xl font-bold mb-4">Vos voyages :</h2>
                <ul className="grid gap-4">
                    {userCommands.length === 0 ? (
                        <p>Chargement en cours...</p>
                    ) : (
                        <ul className="grid gap-4">
                            {userCommands.map((commande, index) => (
                                <li key={index} className="bg-white p-4  shadow-md mt-20 image rounded-md">
                                    <img src={commande.image} alt={commande.destination} className=" h-auto object-cover rounded-md" style={{height: '300px'}} />
                                    <p className="text-lg font-bold">Destination: {commande.destination}</p>
                                    <p>Date de départ: {formatDate(commande.departDate)}</p>
                                    <p>Date de retour: {formatDate(commande.retourDate)}</p>
                                    <p>Nombre de personnes: {commande.nombrePersonnes}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </ul>
            </div>
            </body>
        </>
    );
};

export default Profile;
