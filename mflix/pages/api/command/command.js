import connectMongoDB from "../../../lib/mongodb";
import VoyageReserve from "../../../models/voyage";
import User from "../../../models/user";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
        await connectMongoDB();

        const { userId, voyages,destination,
            departDate,
            retourDate,
            nombrePersonnes} = req.body;

        // Vérification de l'utilisateur
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const createdVoyages = [];

        for (const voyage of voyages) {
            const travel = new VoyageReserve({
                ...voyage,
                userId: userId,
                destination,
                departDate,
                retourDate,
                nombrePersonnes

            });

            try {
                const savedTravel = await travel.save();
                createdVoyages.push(savedTravel);
                user.commande.push(savedTravel._id);
            } catch (err) {
                console.error("Erreur lors de l'enregistrement d'un voyage :", err);
                // Gérez l'erreur ici (par exemple, annulez la transaction, renvoyez un message d'erreur spécifique, etc.)
                return res.status(500).json({ error: "Erreur lors de l'enregistrement d'un voyage" });
            }
        }

        await user.save(); // Sauvegarder l'utilisateur après avoir ajouté tous les voyages

        res.status(201).json({
            success: true,
            message: "Voyages enregistrés avec succès",
            voyages: createdVoyages,
        });
    } catch (error) {
        console.error("Erreur globale lors de l'enregistrement des voyages:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
