import {signOut, useSession} from "next-auth/react";
import NavComponent from "../../components/nav";
import {useEffect, useState} from "react";
import travel from "../../models/travel";
import {router} from "next/client";





const Profile = () => {
    const {data: session} = useSession();
    const user = session?.user;
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);


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
        } catch (error) {
            setError(error.message);
        }
    };









    return (
        <>
            <NavComponent/>
            <section className="bg-white py-20">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>

                    <div className="flex items-center justify-center">
                        <div
                            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full overflow-hidden">
                            <img src={user?.image} alt="profile" className="w-full h-full object-cover"/>
                        </div>
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold">{user?.name}</h1>
                            <p className="text-lg text-gray-500">{user?.email}</p>
                            <p className="text-lg text-gray-500">ID : {user?.userId}</p>
                            <p className="text-lg text-gray-500">Rôle : {userData?.role}</p>
                            {/* Afficher d'autres propriétés de l'utilisateur si nécessaire */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

    export default Profile;