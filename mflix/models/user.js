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
        commande: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Commande",
            },
        ],

    },
    { timestamps: true }
);

const User =mongoose.models.User || mongoose.model("User", userSchema);
export default User;