// Import necessary modules and components
import Link from "next/link";
import 'tailwindcss/tailwind.css';
import Loading from "../components/loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import NavComponent from "../components/nav.jsx";
import VoyagesList from "../components/voyages/list_voyage";

// Define the Main component
const Main = () => {

    return(
        <>
        <NavComponent/>
        <div className="flex flex-col items-center justify-center h-screen">

            <VoyagesList/>
        </div>



        </>

    )
}

export default Main;




