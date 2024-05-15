import React, { useEffect, useState } from "react";
import withAuth from "../../../midleware/withAuth";
import NavComponent from "../../../components/nav";

function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/configUser/users", {
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

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`/api/deleteUser/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Échec de la suppression de l'utilisateur");
            }
            console.log(res);
            await loadUsers(); // Recharge la liste des utilisateurs après la suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur: ", error);
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
            <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)' }}>
                <h1 className="text-2xl font-bold text-white">Liste des utilisateurs</h1>
            <NavComponent />
            <section>
                {isLoading ? (
                    <p>Loading...</p>
                ) : users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table className="border-collapse w-full">
                        <thead>
                        <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100 border-b border-gray-200">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2 ">
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
            </section>
            </div>
        </>
    );
}

export default withAuth(UsersManagement, ["administrateur"]);
