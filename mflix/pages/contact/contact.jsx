import {useState} from "react";
import {useRouter} from "next/router";


const Contact = () => {
     const [email, setEmail] = useState("");
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
        const router = useRouter();

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch('/api/contact/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, message}),
                });
                if (response.ok) {
                    setEmail('');
                    setMessage('');
                    setError('');
                } else {
                    const data = await response.json();
                    setError(data.error || 'Erreur lors de l\'envoi du message');
                }
            }
            catch (error) {
                console.error('Erreur lors de la requête d\'inscription', error);
                setError('Erreur lors de l\'envoi du message');
            }
            await router.replace('/')
        }



        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl text-center mb-4">Contact</h2>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                Message
                            </label>
                            <textarea
                                type="message"
                                id="message"
                                name="message"
                                className="mt-1 p-2 w-full border rounded-md"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="mt-4 w-full bg-primary text-white p-3 rounded-md">
                            Envoyer
                        </button>
                    </form>
                </div>
            </section>

        );



}

export default Contact;