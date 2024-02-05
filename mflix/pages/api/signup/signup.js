import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = await req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectMongoDB();
      await User.create({ name, email, password: hashedPassword });

      res.status(200).json({ message: "User registered." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while registering the user." });
    }
  } else {
    res.status(405).end();
  }
}