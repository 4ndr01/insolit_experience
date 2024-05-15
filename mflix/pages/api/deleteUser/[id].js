import User from "../../../models/user";
import connectMongoDB from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
        await connectMongoDB();

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found or already deleted" });
        }

        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
