import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Class from "@/utils/model/class/teacher/Class.Model";
import Teacher from "@/utils/model/users/teacher/Teacher.model";
import Student from "@/utils/model/users/student/Student.model";

export const DELETE = async (req: Request) => {
    try {
        await connectDb();

        const body = await req.json();
        const { id } = body;

        // 1️⃣ Find the class first to get teacherId and studentList
        const existingClass = await Class.findById(id);
        if (!existingClass) {
            return NextResponse.json("Class not found", { status: 404 });
        }

        const { teacherId, studentList } = existingClass;

        // 2️⃣ Delete the class document itself
        await Class.findByIdAndDelete(id);

        // 3️⃣ Remove class from the teacher's classCreated array
        if (teacherId) {
            await Teacher.updateOne(
                { _id: teacherId },
                { $pull: { classCreated: id } }
            );
        }

        // 4️⃣ Remove class from all students' class arrays
        if (studentList.length > 0) {
            await Student.updateMany(
                { _id: { $in: studentList } },
                { $pull: { class: id } }
            );
        }

        return NextResponse.json("Class deleted successfully", { status: 200 });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};
