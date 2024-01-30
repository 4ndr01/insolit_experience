import mongoose, { Schema, models } from "mongoose";


const contactSchema = new Schema(

        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

            email: {
                type: String,
                required: true,
            },

            message: {
                type: String,
                required: true,
            },
        },

        { timestamps: true }
    );

    const Contact =mongoose.models.Contact || mongoose.model("Contact", contactSchema);
    export default Contact;
