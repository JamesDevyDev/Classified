import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Teacher from "@/utils/model/users/teacher/Teacher.model";
import { getAuthenticatedUser } from "@/utils/verifyUser";

export const DELETE = async (req: Request) => {
    try {
        const body = await req.json();
        const { id } = body;

        await connectDb();

        const authenticatedUser = await getAuthenticatedUser();

        if (!authenticatedUser || !authenticatedUser.user) {
            return NextResponse.json("Authentication failed.", { status: 401 });
        }

        if (authenticatedUser?.user?.role !== "admin") {
            return NextResponse.json("Error. You need to be ADMIN to do this.", { status: 408 });
        }

        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return NextResponse.json("Teacher not found.", { status: 404 });
        }

        return NextResponse.json(
            { message: `Teacher ${deletedTeacher.teacherName} deleted successfully.` },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};
