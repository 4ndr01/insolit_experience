// /pages/api/users.js

import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function handler(request, response) {
    await connectMongoDB();

    if (request.method === "GET") {
        try {
            const users = await User.find(); // Récupérer tous les utilisateurs depuis la base de données
            return response.status(200).json({
                success: true,
                message: "Users retrieved successfully.",
                data: users,
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                success: false,
                message: "Unable to retrieve users.",
                error: error.message,
            });
        }
    } else {
        return response.status(405).json({
            success: false,
            message: `Method ${request.method} Not Allowed`,
        });
    }
}
