import React, { useEffect, useState } from "react";
import withAuth from "../../../midleware/withAuth";
import NavComponent from "../../../components/nav";

function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

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

    return (
        <>
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
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-100 border-b border-gray-200"
                            >
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
}

export default withAuth(UsersManagement, ["administrateur"]);
