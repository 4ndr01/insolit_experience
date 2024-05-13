"use client";
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import NavComponent from "../../components/nav";
import Footer from "../../components/footer";

const sanitizeInput = (input) => {
    // Implémentez votre logique de désinfection ici
    // Exemple : Supprimer les balises HTML
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
        setIsFormValid(
            formData.name &&
            formData.email &&
            formData.telephone &&
            formData.message
);
    }, [formData]);
    useEffect(() => {
        if (session) {
            setFormData(prevData => ({
                ...prevData,
                name: session.user.name || "",
                email: session.user.email || ""
            }));
        }

    }, [session]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const sanitizedValue = sanitizeInput(value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: sanitizedValue,
        }));
    }

    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.telephone || !formData.message){
            alert("Tous les champs sont requis.");

        }
        try {
            const requestBody = JSON.stringify({
                name: formData.name,
                email: formData.email,
                telephone: formData.telephone,
                message: formData.message

            });
            const response = await fetch("/api/contact/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });
            if (response.ok) {
                router.push("/");
            } else {
                throw new Error("Échec de l'envoi du message");
            }

        } catch (error) {
            console.error(error);
        }
    }




    return (
        <>
            <NavComponent/>
            <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <section className="container mx-auto ">
                    <h1 className="text-4xl text-white font-bold">Contactez-nous</h1>
                    <form onSubmit={handleSumbit} className="mt-8">
                        <label htmlFor="nom" className="block mt-4 text-white">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label htmlFor="email" className="block mt-4 text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label htmlFor="telephone" className="block mt-4 text-white">Téléphone</label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label htmlFor="message" className="block mt-4 text-white">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                        <button type="submit" className="mt-4 w-full bg-white text-white p-3 rounded-md button">
                            Envoyer
                        </button>
                    </form>
                </section>
            </div>
            <Footer/>

            <style jsx>{`
                button {
                    cursor: pointer;
                    background-color: rgb(74 108 247);
                }

                .button {
                    cursor: pointer;
                }

                .button:hover {
                    background-color: rgb(74 108 247);
                }
            `}</style>
        </>
    )

}