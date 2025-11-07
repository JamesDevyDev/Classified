import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Student from "@/utils/model/users/student/Student.model";
import { getAuthenticatedUser } from "@/utils/verifyUser";
import Logs from "@/utils/model/logs/Logs.Model";

export const DELETE = async (req: Request) => {
    try {
        const body = await req.json();
        const { id } = body;

        await connectDb();

        const authenticatedUser = await getAuthenticatedUser();

        if (!authenticatedUser || !authenticatedUser.user) {
            return NextResponse.json("Authentication failed.", { status: 401 });
        }

        if (authenticatedUser.role !== "admin") {
            return NextResponse.json("Error. You need to be ADMIN to do this.", { status: 400 });
        }

        const deleting = await Student.findByIdAndDelete(id);

        if (!deleting) {
            return NextResponse.json("Student not found.", { status: 404 });
        }

        // 🧾 Create a log entry after successful deletion
        await Logs.create({
            action: "Delete Student",
            userId: authenticatedUser.user._id,
            details: `Deleted student ${deleting.studentName} (ID: ${deleting._id})`,
            type: "deletion",
        });

        return NextResponse.json(
            { message: `Student ${deleting.studentName} deleted successfully.` },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};
