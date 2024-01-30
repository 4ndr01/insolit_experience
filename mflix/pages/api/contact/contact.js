import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const {  email, message } = await req.body;
            await connectMongoDB();
            await Contact.create({  email, message });

            res.status(200).json({ message: "User registered." });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while registering the user." });
        }
    } else {
        res.status(405).end();
    }
}