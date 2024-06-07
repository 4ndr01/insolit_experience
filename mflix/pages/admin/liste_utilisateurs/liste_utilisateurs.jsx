import React, { useEffect, useState } from "react";
import withAuth from "../../../midleware/withAuth";
import NavComponent from "../../../components/nav";
import Footer from "../../../components/footer";
import toast from 'react-hot-toast';
import {XCircleIcon} from "@heroicons/react/24/solid";

function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [isDeleteConfirmOpen2, setDeleteConfirmOpen2] = useState(false);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/getMessage/getMessage');
                const data = await res.json();
                setMessages(data.messages);
            } catch (error) {
                console.error('Erreur lors de la récupération des messages :', error);
            }
        };

        fetchMessages().then(r => r);
    }, []);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await fetch('/api/configUser/users', {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error("Failed to load users");
            }

            const data = await res.json();

            if (data.success) {
                const fetchedUsers = data.data || [];
                setUsers(fetchedUsers);
                setLoading(false);
            } else {
                throw new Error(data.message || "Failed to load users");
            }
        } catch (error) {
            console.error("Error loading users: ", error);
            setLoading(false);
        }
    };










    const deleteContact = async (id) => {
        let toastId = null;
        try {
            toastId = toast.loading("Suppression en cours...", {
                duration: 5000 // Durée plus longue pour refléter le temps de suppression
            });
            const res = await fetch(`/api/deleteContact/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Contact supprimé avec succès", { id: toastId }); // Toast de succès
                await loadUsers(); // Rechargement des utilisateurs APRÈS succès de la suppression
            } else {
                const errorData = await res.json(); // Récupération de l'erreur depuis l'API
                toast.error(errorData.error || "Échec de la suppression du contact", { id: toastId }); // Toast d'erreur spécifique
            }
        } catch (error) {
            console.error("Erreur inattendue lors de la suppression du contact:", error); // Log de l'erreur complète pour le débogage
            toast.error("Une erreur inattendue s'est produite.", { id: toastId }); // Toast d'erreur générique pour l'utilisateur
        }




}

    const handleDeleteClick2 = (id) => {
        setSelectedContactId(id);
    }
        const confirmDelete2 = async () => {
            await deleteContact(selectedContactId);
            setDeleteConfirmOpen(false);
        };



    const deleteUser = async (id) => {
        const toastId = toast.loading("Suppression en cours...", {
            duration: 3000,
        });
        try {
            const res = await fetch(`/api/deleteUser/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                toast.error("Échec de la suppression de l'utilisateur", {id: toastId}); // Toast d'erreur
                throw new Error("Échec de la suppression de l'utilisateur");
            } else {
                toast.success("Utilisateur supprimé avec succès", {id: toastId}); // Toast de succès
            }
        }
        catch (error) {
            console.error("Error deleting user: ", error);
        }
        finally {
            loadUsers();
        }
    };

    const confirmDelete = async () => {
        await deleteUser(selectedUserId);
        setDeleteConfirmOpen(false);
    };

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setDeleteConfirmOpen(true);
    };

    return (
        <>
            <NavComponent />
            <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <h1 className="text-2xl font-bold text-white">Liste des utilisateurs</h1>

                <section>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <table className="table-auto border-collapse w-full mt-14 bg-white rounded-lg">
                            <thead>
                            <tr className="rounded-lg text-sm font-medium text-gray-700 ">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Actions</th>
                                <th className="px-4 py-2">Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-100 border-b border-gray-200">
                                    <td className="px-4 py-2 text-center">{user.name}</td>
                                    <td className="px-4 py-2 text-center">{user.email}</td>
                                    <td className="px-4 py-2 text-center">{user.role}</td>
                                    <td className="px-4 py-2 text-center"> {/* Ajout de text-center pour centrer le contenu */}
                                        <button onClick={() => handleDeleteClick(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                    {isDeleteConfirmOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <p>Confirmer la suppression de l'utilisateur ?</p>
                                <button onClick={() => setDeleteConfirmOpen(false)}>Non</button>
                                <button onClick={confirmDelete}>Oui</button>
                            </div>
                        </div>
                    )}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <a href="/addVoyage/addVoyage">ajout de voyage</a>
                    </button>
                </section>
                <section className="container mx-auto mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">Messages des utilisateurs :</h2>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                De
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Message
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Supprimer</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {messages.map((message) => (
                            <tr key={message._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {message.nom} ({message.email})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.message}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleDeleteClick2(message._id)}>
                                        <XCircleIcon className="w-6 h-6 text-red-500" aria-hidden="true"/>
                                    </button>
                                    {isDeleteConfirmOpen2 && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <p>Confirmer la suppression du message ?</p>
                                                <button onClick={() => setDeleteConfirmOpen2(false)}>Non</button>
                                                <button onClick={confirmDelete2}>Oui</button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>


            </div>
            <Footer/>
        </>
    );
}

export default withAuth(UsersManagement, ["administrateur"]);
