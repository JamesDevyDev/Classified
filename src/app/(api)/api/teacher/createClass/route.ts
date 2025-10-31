import { NextResponse } from "next/server";
import Class from "@/utils/model/class/teacher/Class.Model";
import '../../../../../utils/model/users/teacher/Teacher.model';

// Validate 24-hour time format (HH:MM)
function isValid24HourTime(time: string): boolean {
    const match = time.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/);
    return match !== null;
}

// Convert "6:00 PM" to "18:00" (for backward compatibility)
function convertTo24Hour(time: string): string | null {
    try {
        // Check if already in 24-hour format
        if (isValid24HourTime(time)) {
            return time;
        }

        // Try 12-hour format
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
        const body = await req.json();
        const { teacherId, course, dayOfWeek, startTime, endTime, students, color, studentList } = body;

        // ✅ Check required fields
        if (!teacherId || !course || !dayOfWeek || !startTime || !endTime || color === undefined) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
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

        // ✅ Convert time to 24-hour format (handles both formats)
        const start24 = convertTo24Hour(startTime);
        const end24 = convertTo24Hour(endTime);

        if (!start24 || !end24) {
            return NextResponse.json({
                error: "Invalid time format. Use 24-hour format (HH:MM) or 12-hour format (hh:mm AM/PM)."
            }, { status: 400 });
        }

        // ✅ Ensure time range 06:00–22:00 only
        const startHour = parseInt(start24.split(':')[0]);
        const endHour = parseInt(end24.split(':')[0]);
        const endMinutes = parseInt(end24.split(':')[1]);

        // Start time must be >= 06:00
        if (start24 < "06:00") {
            return NextResponse.json({
                error: "Start time must be at or after 6:00 AM."
            }, { status: 400 });
        }

        // End time must be <= 22:00 (allow exactly 22:00)
        if (end24 > "22:00") {
            return NextResponse.json({
                error: "End time must be at or before 10:00 PM."
            }, { status: 400 });
        }

        // ✅ Ensure start < end
        if (start24 >= end24) {
            return NextResponse.json({
                error: "End time must be later than start time."
            }, { status: 400 });
        }

        // ✅ Students count validation (use 0 as default if not provided)
        const studentCount = typeof students === "number" ? students : 0;
        if (studentCount < 0) {
            return NextResponse.json({
                error: "Students count cannot be negative."
            }, { status: 400 });
        }

        const newClass = new Class({
            teacherId,
            course,
            dayOfWeek,
            startTime: start24,
            endTime: end24,
            students: studentCount,
            color,
            studentList: studentList || [],
        });

        await newClass.save();

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