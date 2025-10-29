import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Student from "@/utils/model/users/student/Student.model";
import { getAuthenticatedUser } from "@/utils/verifyUser";

export const DELETE = async (req: Request) => {
    try {
        const body = await req.json();
        const { id, authUserId } = body;

        await connectDb();

        const authenticatedUser = await getAuthenticatedUser();

        if (!authenticatedUser || !authenticatedUser.user) {
            return NextResponse.json("Authentication failed.", { status: 401 });
        }

        if (authenticatedUser.role !== "admin") {
            return NextResponse.json("Error. You need to be ADMIN to do this.", { status: 400 });
        }

        // ✅ FIX: Access the _id from authenticatedUser.user
        if (authenticatedUser._id.toString() !== authUserId) {
            return NextResponse.json("You are not allowed to do this. This is not your account.", { status: 400 });
        }

        const deleting = await Student.findByIdAndDelete(id);

        if (!deleting) {
            return NextResponse.json("Student not found.", { status: 404 });
        }

        return NextResponse.json(
            { message: `Student ${deleting.studentName} deleted successfully.` },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};
