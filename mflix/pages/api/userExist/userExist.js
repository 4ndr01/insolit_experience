import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";



export default async function POST(req, res) {
    try {
        await connectMongoDB();
        const { email } = req.body; // Utilisation de req.body pour lire le corps de la requête
        const user = await User.findOne({ email }).select("_id");
        console.log(user);
        return res.json({ user }); // Utilisation de res.json() pour renvoyer une réponse JSON
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" }); // En cas d'erreur, renvoyer une réponse d'erreur
    }
}
