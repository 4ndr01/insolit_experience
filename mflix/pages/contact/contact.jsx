"use client";
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import NavComponent from "../../components/nav";
import Footer from "../../components/footer";
import toast from "react-hot-toast";

const sanitizeInput = (input) => {

    return input.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telephone: "",
        message: ""

    });

    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();
    const {data: session} = useSession();

    useEffect(() => {
        if (session && session.user) {
            setFormData((prevData) => ({
                ...prevData,
                name: session.user.name || "",
                email: session.user.email || "",
            }));
        }
    }, [session]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = sanitizeInput(value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: sanitizedValue,
        }));
    };

    useEffect(() => {
        setIsFormValid(
            formData.name &&
            formData.email &&
            formData.message
        );
    }, [formData]);

    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("Tous les champs sont requis.");
            return;
        }

        try {
            const toastId = toast.loading("Suppression en cours...", {
                icon: "🚀",
                duration: 3000,
            });
            const requestBody = JSON.stringify(formData);
            const response = await fetch("/api/contact/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });

            if (response.ok) {
                toast.success("Message envoyé avec succès", {
                    id: toastId,

                });
                router.push("/");
                // Optionnel : vider le formulaire après envoi
                setFormData({
                    name: session?.user?.name || "",
                    email: session?.user?.email || "",
                    message: ""
                });
            } else {
                toast("Échec de l'envoi du message", {
                    id: toastId,
                    icon: "❌",
                    duration: 3000,
                });
            }
        }
        catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
            toast.error("Erreur lors de l'envoi du message", {
                id: toastId,
                duration: 3000,
            });
        }
    }

    return (
        <>
            <NavComponent />
            <div
                className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                style={{ background: "linear-gradient(to bottom, #8474E4,#4CB4FF)" }}
            >
                <section className="container mx-auto">
                    <h1 className="text-4xl text-white font-bold">Contactez-nous</h1>

                    <form onSubmit={handleSumbit} className="mt-8">
                        <label htmlFor="nom" className="block mt-4 text-white">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.name} // Valeur pré-remplie depuis la session
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />

                        <label htmlFor="email" className="block mt-4 text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email} // Valeur pré-remplie depuis la session
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label htmlFor="message" className="block mt-4 text-white">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                        >
                            Envoyer
                        </button>



                    </form>
                </section>
            </div>
            <Footer />
            {/* ... (votre style JSX) ... */}
        </>
    );
}