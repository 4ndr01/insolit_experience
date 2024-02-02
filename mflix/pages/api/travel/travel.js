import connectMongoDB from "../../../lib/mongodb";
import mongoose from "mongoose";
import Travel from "../../../models/travel";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { destination, departDate, retourDate, nombrePersonnes, userId } = req.body;

        try {
            const db = await connectMongoDB();
            await Travel.create({
                destination,
                departDate: new Date(departDate),
                retourDate: new Date(retourDate),
                nombrePersonnes,
                userId,
            });

            return res.status(201).json({ success: true, message: 'Voyage enregistré avec succès!' });
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du voyage:', error);
            return res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement du voyage' });
        }
    } else {
        // Méthode non autorisée
        return res.status(405).end();
    }
}

