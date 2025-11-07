import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Class from "@/utils/model/class/teacher/Class.Model";
import Teacher from "@/utils/model/users/teacher/Teacher.model";
import Logs from "@/utils/model/logs/Logs.Model";

// Validate 24-hour time format (HH:MM)
function isValid24HourTime(time: string): boolean {
    const match = time.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/);
    return match !== null;
}

// Convert "6:00 PM" to "18:00"
function convertTo24Hour(time: string): string | null {
    try {
        if (isValid24HourTime(time)) return time;

        const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!match) return null;

        let [_, hours, minutes, period] = match;
        let h = parseInt(hours, 10);
        const m = parseInt(minutes, 10);

        if (period.toUpperCase() === "PM" && h !== 12) h += 12;
        if (period.toUpperCase() === "AM" && h === 12) h = 0;

        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    } catch {
        return null;
    }
}

export const POST = async (req: Request) => {
    try {
        await connectDb();

        const body = await req.json();
        const { teacherId, course, dayOfWeek, startTime, endTime, students, color, studentList } = body;

        // ✅ Check required fields
        if (!teacherId || !course || !dayOfWeek || !startTime || !endTime || color === undefined) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        // ✅ Validate teacher
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return NextResponse.json({ error: "Teacher not found." }, { status: 404 });
        }

        // ✅ Monday–Friday validation
        const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        if (!validDays.includes(dayOfWeek)) {
            return NextResponse.json({ error: "Invalid dayOfWeek. Must be Monday–Friday only." }, { status: 400 });
        }

        // ✅ Color validation
        const validColors = ["cyan", "purple", "emerald", "amber", "rose", "blue"];
        if (!validColors.includes(color)) {
            return NextResponse.json({ error: "Invalid color option." }, { status: 400 });
        }

        // ✅ Convert time to 24-hour format
        const start24 = convertTo24Hour(startTime);
        const end24 = convertTo24Hour(endTime);

        if (!start24 || !end24) {
            return NextResponse.json({
                error: "Invalid time format. Use 24-hour (HH:MM) or 12-hour (hh:mm AM/PM)."
            }, { status: 400 });
        }

        // ✅ Ensure valid range 06:00–22:00
        if (start24 < "06:00") {
            return NextResponse.json({ error: "Start time must be at or after 6:00 AM." }, { status: 400 });
        }

        if (end24 > "22:00") {
            return NextResponse.json({ error: "End time must be at or before 10:00 PM." }, { status: 400 });
        }

        if (start24 >= end24) {
            return NextResponse.json({ error: "End time must be later than start time." }, { status: 400 });
        }

        const studentCount = typeof students === "number" ? students : 0;
        if (studentCount < 0) {
            return NextResponse.json({ error: "Students count cannot be negative." }, { status: 400 });
        }

        // ✅ Create the class
        const newClass = await Class.create({
            teacherId,
            course,
            dayOfWeek,
            startTime: start24,
            endTime: end24,
            students: studentCount,
            color,
            studentList: studentList || [],
        });

        // ✅ Create log entry
        await Logs.create({
            action: "Class Created",
            teacherId: teacher._id,
            details: `Teacher "${teacher.teacherName}" created class "${course}" on ${dayOfWeek} (${start24}–${end24}).`,
            type: "create",
        });

        return NextResponse.json({
            message: "Class created successfully.",
            class: newClass
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating class:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
};
