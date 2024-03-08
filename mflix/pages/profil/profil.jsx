import {signOut, useSession} from "next-auth/react";
import NavComponent from "../../components/nav";


const Profile = () => {


  const { data: session } = useSession()
    const user = session?.user
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
                    </div>
                </div>
            </div>
        </section>
        </>
    );

}
export default Profile;