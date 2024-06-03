import Commande from "../../../models/travel";
import connectMongoDB from "../../../lib/mongodb";

export default async function handler(req, res) {
    await connectMongoDB();

    if (req.method === 'DELETE') {
        const { commandeId } = req.query;

        try {
            await Commande.findByIdAndDelete(commandeId);
            res.status(200).json({ message: 'Commande supprimée avec succès' });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression de la commande' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
