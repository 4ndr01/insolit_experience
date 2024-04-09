import connectMongoDB from "../../../lib/mongodb";
import Commande from "../../../models/travel";

export default async function GET(req, res) {
    try {
        await connectMongoDB();

        const { userId } = req.query;

        // Trouver les commandes de l'utilisateur par son ID
        const userCommands = await Commande.find({ userId: userId });

        // Renvoyer les commandes de l'utilisateur en format JSON
        return res.status(200).json({ commande: userCommands });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des commandes de l'utilisateur",
        });
    }
}
