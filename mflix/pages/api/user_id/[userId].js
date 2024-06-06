import Commande from "../../../models/travel";
import User from "../../../models/user";
import VoyageReserve from "../../../models/voyage";
import connectMongoDB from "../../../lib/mongodb";

export default async function handler(req, res) {
    await connectMongoDB();

    const { userId } = req.query;

    switch (req.method) {
        case "GET":
            try {
                const userCommands = await Commande.find({ userId: userId });
                const usersPanier = await  VoyageReserve.find({ userId: userId });

                return res.status(200).json({ commande: userCommands, panier: usersPanier });
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: "Erreur lors de la récupération des commandes de l'utilisateur",
                });
            }
        case "PATCH":
            const { name } = req.body;
            try {
                const user = await User.findByIdAndUpdate(userId, { name }, { new: true });
                if (!user) {
                    return res.status(404).json({ message: "Utilisateur non trouvé" });
                }
                res.status(200).json({ message: "Pseudo mis à jour avec succès", user });
            } catch (error) {
                res.status(500).json({ message: "Erreur lors de la mise à jour du pseudo" });
            }
            break; // Important : ajouter break pour sortir du switch
        default:
            res.status(405).end(); // Method Not Allowed
    }
}
