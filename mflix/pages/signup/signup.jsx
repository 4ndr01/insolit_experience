// pages/login.js
import { useState } from 'react';
import Link from "next/link";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifiez si les mots de passe correspondent
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            // Simulation de la requête d'inscription
            const response = await fetch('/api/signup/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password,name }),
            });

            // Vérifiez la réponse de l'API
            if (response.ok) {
                // Réinitialisez les champs après une inscription réussie
                setEmail('');
                setName('')
                setPassword('');
                setConfirmPassword('');
                setError('');
                // Redirigez l'utilisateur vers une page de confirmation, par exemple
                // router.push('/registration-success');
            } else {
                const data = await response.json();
                setError(data.error || 'Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur lors de la requête d\'inscription', error);
            setError('Erreur lors de l\'inscription');
        }
    };

    return (
    <section className="flex flex-col items-center h-screen md:flex-row">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-center mb-4">Inscription</h2>
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
                    <label htmlFor="name" className="block text-sm font-medium text-red">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-red">
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
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-red">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md"
                >
                    S'inscrire
                </button>
            </form>

        </div>
        //ajout bouton connexion with google
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-center mb-4">Connexion avec Google</h2>
            <Link href="/api/auth/signin">
                <p className="text-center bg text-blue-500 cursor-pointer">Connexion avec Google</p>
            </Link>
        </div>

    </section>
    );
};

export default Register;
