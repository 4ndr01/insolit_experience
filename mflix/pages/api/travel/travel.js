import connectMongoDB from "../../../lib/mongodb";
import Travel from "../../../models/travel";
import User from "../../../models/user";
import mongoose from "mongoose"; // Importez le modèle utilisateur

export default async function POST(request, response) {
    const { destination, departDate, retourDate, nombrePersonnes, userId } = request.body;

    try {
        await connectMongoDB();

        // Vérifiez l'ID utilisateur
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            response.status(400).json({
                success: false,
                message: "ID utilisateur invalide.",
            });
            return;
        }

        const travel = new Travel({
            destination,
            departDate,
            retourDate,
            nombrePersonnes,
            userId,
        });
        await travel.save();

        const user = await User.findById(userId);
        if (user) {
            user.commande.push(travel._id); // Assumant qu'il y a un champ 'commande'
            await user.save();
        }

        response.status(201).json({
            success: true,
            message: "Voyage créé avec succès.",
            data: travel,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
