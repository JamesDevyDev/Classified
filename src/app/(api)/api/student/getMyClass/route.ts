import connectDb from "@/utils/connectDb";
import { NextResponse } from "next/server";
import Student from "@/utils/model/users/student/Student.model";
import "../../../../../utils/model/class/teacher/Class.Model";
import '../../../../../utils/model/users/teacher/Teacher.model'

export const POST = async (req: Request) => {
    try {
        await connectDb();

        const { studentId } = await req.json();

        const studentClass = await Student.findById(studentId)
            .populate({
                path: "class",
                select: "-studentList -students", // exclude these
                populate: {
                    path: "teacherId",           
                    select: "teacherName",         
                },
            });

        if (!studentClass) {
            return NextResponse.json("Student doesn't exist", { status: 400 });
        }

        return NextResponse.json(studentClass.class);
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};
