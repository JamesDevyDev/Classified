import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Class from "@/utils/model/class/teacher/Class.Model";

export const POST = async (req: Request) => {
    try {
        await connectDb();

        const { classId, studentId } = await req.json();

        console.log("Class Id ", classId)

        // const cls = await Class.findById(classId)

        // console.log(cls)

        // if (!classId || !studentId) {
        //     return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
        // }

        // const cls = await Class.findById(classId);
        // if (!cls) {
        //     return NextResponse.json({ message: "Class not found" }, { status: 404 });
        // }

        // let action: "added" | "removed";

        // // Check if student is already in the class
        // const index = cls.studentList.findIndex((id: any) => id.toString() === studentId);

        // if (index !== -1) {
        //     // Remove student
        //     cls.studentList.splice(index, 1);
        //     action = "removed";
        // } else {
        //     // Add student
        //     cls.studentList.push(studentId);
        //     action = "added";
        // }

        // await cls.save();

        // return NextResponse.json({ success: true, action });

        return NextResponse.json("Works")

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
