import connectMongoDB from "../../../../lib/mongodb";
import {NextResponse} from "next/server";
import Travel from "../../../../models/travel";

export async function GET(request) {
    try {
        const { id } = request.params;
        await connectMongoDB();

        // Trouver la commande par son ID
        const travel= await Travel.findOne({ _id: id });

        // Vérifier si la commande existe
        if (!travel) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Commande introuvable.",
                },
                { status: 404 }
            );
        }

        // Retourner la commande si elle est trouvée
        return NextResponse.json(
            {
                success: true,
                message: "Commande récupérée avec succès.",
                travel
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        // Gérer les erreurs lors de la récupération de la commande
        return NextResponse.json(
            {
                success: false,
                message: "Erreur lors de la récupération de la commande.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}