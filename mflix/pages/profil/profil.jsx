import { signOut, useSession } from "next-auth/react";
import NavComponent from "../../components/nav";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Footer from "../../components/footer";
import Link from "next/link";
import { Button, Input, Alert } from "flowbite-react";


const Profile = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [userCommands, setUserCommands] = useState([]);
    const [userPanier, setUserPanier] = useState([]);
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newPseudo, setNewPseudo] = useState(user?.name || "");


    const router = useRouter();

    useEffect(() => {
        if (user && user.userId) {
            fetchUserData(user.userId).then(r => console.log(r));
        }
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`/api/user_id/${userId}`);
            if (!response.ok) {
                throw new Error("Une erreur s'est produite");
            }
            const data = await response.json();
            setUserData(data);
            setUserCommands(data.commande);
            setUserPanier(data.panier);
            setImage(data.imageFond);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`/api/user_id/${user.userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newPseudo }),
            });

            if (response.ok) {
                // Mettre à jour le nom dans la session NextAuth
                session.user.name = newPseudo;
                setIsEditing(false);
                setError("Votre pseudo a été mis à jour. Veuillez vous reconnecter pour que les changements soient pris en compte.");
            } else {
                throw new Error('Erreur lors de la mise à jour du pseudo.');
            }
        } catch (error) {
            setError(error.message);
        }
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
                {/* ... (autre code inchangé) */}
                <div className="bg-white rounded-lg p-4 md:ml-4 w-96 mt-16 mx-auto">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={newPseudo}
                                placeholder="Nouveau pseudo"
                                onChange={(e) => setNewPseudo(e.target.value)}
                                className="bg-gray-100 border border-gray-300 focus:ring focus:ring-blue-500 rounded-md p-2"
                            />
                            <Button className="mt-2 bg-amber-400 text-black "
                                    onClick={handleSaveClick}>Modifier</Button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold">Pseudo: {user?.name}</h1>
                            <Button onClick={handleEditClick}>Modifier</Button>
                        </>
                    )}

                    <p className="text-lg text-gray-500">Email: {user?.email}</p>
                    <p className="text-lg text-gray-500">Rôle : {user?.role}</p>
                </div>

                {error && ( // Afficher l'alerte si une erreur s'est produite ou si le pseudo a été mis à jour
                    <div className="flex justify-center mt-4">
                        <div className="w-96">
                            <Alert color={error.startsWith("Votre pseudo") ? "success" : "failure"}>
                        <span>
                            <span className="font-medium">
                                {error.startsWith("Votre pseudo") ? "Succès :" : "Erreur :"}
                            </span>{" "}
                            {error}
                        </span>
                            </Alert>
                            {error.startsWith("Votre pseudo") && ( // Afficher le bouton de déconnexion uniquement si le pseudo a été mis à jour
                                <Button onClick={() => {
                                    signOut().then(r => router.push('/login/login'))
                                }} className="mt-2">
                                    Se reconnecter
                                </Button>


                            )}
                        </div>
                    </div>
                )}

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
                <div className="container mx-auto mt-8 px-4">
                    <h2 className="text-3xl font-bold mb-4">Vos Packs :</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userPanier.map((panier, index) => (
                        <li
                            key={index}
                            className="bg-white p-4 shadow-md rounded-md relative"
                        >
                            <Link href={`/voyage/${panier.voyageId}`}>
                                <img
                                    src={panier.image}
                                    alt={panier.destination}
                                    className="w-full h-48 object-cover rounded-t-md"
                                />
                                <div className="p-4">
                                    <p className="text-lg font-bold">Destination: {panier.destination}</p>
                                    <p>Date de départ: {formatDate(panier.departDate)}</p>
                                    <p>Date de retour: {formatDate(panier.retourDate)}</p>
                                    <p>Nombre de personnes: {panier.nombrePersonnes}</p>
                                </div>
                            </Link>
                            <div className="absolute bottom-2 right-2">
                                <Button
                                    color="red"
                                    onClick={() => handleDelete(panier._id)}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Profile;
