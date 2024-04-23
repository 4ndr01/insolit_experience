"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import {signIn} from "next-auth/react";



const Login_admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.ok) {
                // Après l'enregistrement réussi, connectez l'utilisateur
                const signInResponse = await signIn("credentials", {
                    redirect: false, // Ne pas rediriger, gérer la redirection manuellement si nécessaire
                    email, // Utilisez l'email de l'utilisateur
                    password, // Utilisez le mot de passe de l'utilisateur
                });

                if (signInResponse.error) {
                    // Gérez les erreurs de connexion ici
                    console.error("Error during sign-in:", signInResponse.error);
                    return;
                }

                // L'utilisateur est maintenant connecté

                const form = e.target;
                form.reset();
                await router.push("/"); // Redirigez l'utilisateur vers la page souhaitée après la connexion
            } else {
                // Afficher un message d'erreur
                setError('Adresse email ou mot de passe incorrect');
            }
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setError('Quelque chose s\'est mal passé');
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl text-center mb-4">Connexion</h2>


                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-red">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="mt-4 w-full bg-primary text-white p-3 rounded-md">
                        Connexion
                    </button>
                </form>

            </div>

        </section>
    );
};

export default Login_admin
