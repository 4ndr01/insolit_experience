import { getSession } from "next-auth/react";

import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";
import mongoose from "mongoose";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
    try {
        await connectMongoDB();

        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: "Non autorisé" });
        }

        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Format d'ID invalide" });
        }

        const objectId = mongoose.Types.ObjectId(id);
        const deletedUser = await Contact.findByIdAndDelete(objectId);
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}

