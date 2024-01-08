import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(

    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User =mongoose.models.User || mongoose.model("User", userSchema);
export default User;