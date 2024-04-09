// Fichier: /api/user_id/[userId]/routes.js

import connectMongoDB from "../../../lib/mongodb"
import User from "../../../models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Commande from "../../../models/travel";

export async function POST(request) {
    const { userId, retourDate, etat } = await request.json();

    try {
        await connectMongoDB();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid user ID.",
                },
                { status: 400 }
            );
        }

        const commande = new Commande({
            user: userId,
            retourDate,

            etat,
        });
        await commande.save();

        const user = await User.findById(userId);
        if (user) {
            user.commande.push(commande._id); // 'commandes' alanı olduğunu varsayıyorum
            await user.save();

            return NextResponse.json({
                success: true,
                message: "Commande sent successfully",
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error(error);
        // Hata yönetimi
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(error.errors[e].message);
            }
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation error.",
                    errors: errorList,
                },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unable to process request.",
                    error: error.message,
                },
                { status: 500 }
            );
        }
    }
}
///api/commandes

export async function GET(request) {
    try {
        await connectMongoDB();

        const travel = await Commande.find();

        return NextResponse.json({
            success: true,
            message: "Commandes retrieved successfully.",
            data: travel,
        });
    } catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(error.errors[e].message);
            }
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation error.",
                    errors: errorList,
                },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unable to process request.",
                    error: error.message,
                },
                { status: 500 }
            );
        }
    }
}
