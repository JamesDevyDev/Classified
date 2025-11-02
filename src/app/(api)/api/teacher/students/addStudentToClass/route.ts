import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Class from "@/utils/model/class/teacher/Class.Model";
import Student from "@/utils/model/users/student/Student.model";

export const POST = async (req: Request) => {
    try {
        await connectDb();

        const { classId, studentId } = await req.json();
        console.log(classId, studentId);

        if (!classId || !studentId) {
            console.log("missing params");
            return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
        }

        const cls = await Class.findById(classId);
        if (!cls) {
            console.log("class not found");
            return NextResponse.json({ message: "Class not found" }, { status: 404 });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            console.log("student not found");
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        let action: "added" | "removed";

        // Check if student is already in the class
        const index = cls.studentList.findIndex((id: any) => id.toString() === studentId);

        if (index !== -1) {
            // Remove student from class
            cls.studentList.splice(index, 1);
            // Also remove class from student's list
            student.class = student.class.filter((id: any) => id.toString() !== classId);
            action = "removed";
        } else {
            // Add student to class
            cls.studentList.push(studentId);
            // Add class to student's list (avoid duplicates)
            if (!student.class.includes(classId)) {
                student.class.push(classId);
            }
            action = "added";
        }

        // Update student count
        cls.students = cls.studentList.length;

        // Save both documents
        await Promise.all([cls.save(), student.save()]);

        return NextResponse.json({
            success: true,
            action,
            updatedCount: cls.students,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
