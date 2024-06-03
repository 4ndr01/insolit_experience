import { signOut, useSession } from "next-auth/react";
import NavComponent from "../../components/nav";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Footer from "../../components/footer";
import Link from "next/link";
import {Button} from "flowbite-react";

const Profile = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [userCommands, setUserCommands] = useState([]);
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setLoading] = useState(false);

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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleDelete = async (commandeId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?")) { // Confirmation de suppression
            try {
                const response = await fetch(`/api/deleteComand/${commandeId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Mettre à jour la liste des commandes après la suppression
                    setUserCommands(userCommands.filter(cmd => cmd._id !== commandeId));
                } else {
                    throw new Error('Erreur lors de la suppression du voyage.');
                }
            } catch (error) {
                setError(error.message);
            }
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
            <div
                style={{
                    background: "linear-gradient( #8474E4,#4CB4FF )",
                    minHeight: "100vh",
                    overflow: "auto",
                }}
            >
                <div className="container mx-auto mt-20 flex flex-col items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-4">
                            {image && (
                                <Image
                                    src={image}
                                    alt="profile"
                                    layout="responsive"
                                    width={100}
                                    height={100}
                                />
                            )}
                        </div>
                        <div className="bg-white rounded-lg p-4 md:ml-4">
                            <h1 className="text-2xl font-bold">Pseudo: {user?.name}</h1>
                            <p className="text-lg text-gray-500">Email: {user?.email}</p>
                            <p className="text-lg text-gray-500">Rôle : {user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Section des voyages */}
                <div className="container mx-auto mt-8 px-4">
                    <h2 className="text-3xl font-bold mb-4">Vos voyages :</h2>
                    {isLoading ? (
                        <p>Chargement en cours...</p>
                    ) : userCommands.length === 0 ? (
                        <p>Aucun voyage trouvé.</p>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userCommands.map((commande, index) => (
                                <li
                                    key={index}
                                    className="bg-white p-4 shadow-md rounded-md relative"
                                >
                                    <Link href={`/voyage/${commande.voyageId}`}>
                                        <img
                                            src={commande.image}
                                            alt={commande.destination}
                                            className="w-full h-48 object-cover rounded-t-md"
                                        />
                                        <div className="p-4">
                                            <p className="text-lg font-bold">Destination: {commande.destination}</p>
                                            <p>Date de départ: {formatDate(commande.departDate)}</p>
                                            <p>Date de retour: {formatDate(commande.retourDate)}</p>
                                            <p>Nombre de personnes: {commande.nombrePersonnes}</p>
                                        </div>
                                    </Link>
                                    <div className="absolute bottom-2 right-2">
                                        <Button
                                            color="red"
                                            onClick={() => handleDelete(commande._id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
