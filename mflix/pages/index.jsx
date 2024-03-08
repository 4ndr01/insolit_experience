// Import necessary modules and components
import Link from "next/link";
import 'tailwindcss/tailwind.css';
import Loading from "../components/loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import NavComponent from "../components/nav.jsx";

// Define the Main component
const Main = () => {

    return(
        <>
        <NavComponent/>


        </>

    )
}

export default Main;




