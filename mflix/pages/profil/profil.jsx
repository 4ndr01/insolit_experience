import {useSession} from "next-auth/react";
import Btn from "../../components/btn_auth";
import Link from "next/link";


const Profile = () => {
  const { data: session } = useSession()
    const user = session?.user
  return (
      <div className="bg-primary py-3 px-4 md:px-6 lg:px-8 xl:px-10 h-20">
        <div className="container mx-auto flex items-center justify-between h-12 ml-22">
          <Btn/>
          <Link href="/">
            <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Accueil</p>
          </Link>
          <Link href="/contact/contact">
            <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Contact</p>
          </Link>
          <Link href="/form_travel/form_travel">
            <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Explorer</p>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/login/login">
              <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">Se connecter</p>
            </Link>
            <Link href="/signup/signup">
              <p className="text-white text-lg font-bold hover:opacity-80 transition duration-300">S'inscrire</p>
            </Link>


          </div>
        </div>
        <section className="bg-white py-20">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full overflow-hidden">
                <img src={user?.image} alt="profile" className="w-full h-full object-cover"/>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-lg text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </section>
        </div>
        )
        }
        export default Profile;