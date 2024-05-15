import { NextResponse } from "next/server";
import User from "../../../../models/user";
import connectMongoDB from "../../../../lib/mongodb";

export async function DELETE(request, { params }) {
    const { id } = params;
    await connectMongoDB();

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        return NextResponse.json({ message: "User not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
