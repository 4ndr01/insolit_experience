import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(

    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32,
        },

        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "administrateur"],
            default: "user",
            required: true,
        },
        imageFond: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_1280.jpg",
        },

        imageProfil: {
            type: String,
        },
        commande: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Commande",
                required: true,
            },
        ],

    },
    { timestamps: true }
);

const User =mongoose.models.User || mongoose.model("User", userSchema);
export default User;