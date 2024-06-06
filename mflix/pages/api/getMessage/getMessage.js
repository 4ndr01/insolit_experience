import connectMongoDB from '../../../lib/mongodb';
import Contact from '../../../models/contact';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    try {
        await connectMongoDB();

        // Récupérez les messages (éventuellement avec une pagination)
        const messages = await Contact.find()
            .sort({ date: -1 }) // Trier par date décroissante (les plus récents en premier)
            .limit(20); // Limiter à 20 messages par page (optionnel)

        res.status(200).json({ messages });
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
